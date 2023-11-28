const config = require("../utils/config");

const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const helper = require("./test_helper");

const Blog = require("../models/blog");
const User = require("../models/users");

const app = require("../app");
const api = supertest(app);

// Delete all remaining documents/users in the database and set up new ones before testing
beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("test", 10);
    const testUser = new User({
        username: "Test User",
        name: "test",
        passwordHash,
    });
    await testUser.save();

    await Blog.deleteMany({});
    helper.initialBlogs.forEach(async (blog) => {
        blog.user = testUser.id;
        let blogObject = Blog(blog);
        await blogObject.save();
    });
}, 100000);

describe("GET api", () => {
    // Test the return type of the get method
    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    }, 100000);

    // Test whether all of the blogs all returned
    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body).toHaveLength(helper.initialBlogs.length);
    }, 100000);

    test("a specific blog is within the returned blogs", async () => {
        const response = await api.get("/api/blogs");

        const titles = response.body.map((b) => b.title);
        expect(titles).toContain("Elden Ring");
    }, 100000);

    test("a specific blog can be viewed", async () => {
        const blogs = await helper.blogsInDB();
        const blogToView = blogs[0];
        blogToView.user = blogToView.user.toString();

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(resultBlog.body).toEqual(blogToView);
    });
});

describe("adding blog", () => {
    test("a valid blog can be added with token", async () => {
        // get the test user's token
        const login = await api
            .post("/api/login")
            .send({
                username: "Test User",
                password: "test",
            })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        const token = login.body.token;

        // example blog
        const newBlog = {
            title: "This is a blog",
            author: "Some Person",
            url: "www.example.com",
            likes: 123,
            userId: jwt.verify(token, config.SECRET).id,
        };

        // add the new blog to the database,
        // expecting the return status to be 201 and the returned blog to be json
        await api
            .post("/api/blogs")
            .set({ authorization: `Bearer ${token}` })
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        // expecting the amount of the stored data to be one more
        const blogsAfterInsertion = await helper.blogsInDB();
        expect(blogsAfterInsertion).toHaveLength(
            helper.initialBlogs.length + 1,
        );

        // expecting the stored blogs to contain the example one
        const titles = blogsAfterInsertion.map((b) => b.title);
        expect(titles).toContain("This is a blog");
    }, 100000);

    test("a valid blog can not be added without token", async () => {
        // example blog
        const newBlog = {
            title: "This is a blog",
            author: "Some Person",
            url: "www.example.com",
            likes: 123,
        };

        // add the new blog to the database,
        // expecting the return status to be 201 and the returned blog to be json
        await api.post("/api/blogs").send(newBlog).expect(401);
    }, 100000);

    test("blog without title should not be stored", async () => {
        // get the test user's token
        const login = await api
            .post("/api/login")
            .send({
                username: "Test User",
                password: "test",
            })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        const token = login.body.token;

        // blog without title
        const blogWithoutTitle = {
            author: "Last",
            url: "www.example.com",
            likes: 123,
            userId: jwt.verify(token, config.SECRET).id,
        };

        // add the invalid blog to the database
        // expecting the return status to be 400
        await api
            .post("/api/blogs")
            .set({ authorization: `Bearer ${token}` })
            .send(blogWithoutTitle)
            .expect(400);

        // expecting the amount of the blogs remaining the same
        const blogsAfterInsertion = await helper.blogsInDB();
        expect(blogsAfterInsertion).toHaveLength(helper.initialBlogs.length);
    }, 100000);
});

describe("deleting blog", () => {
    test("a note can be deleted", async () => {
        const blogs = await helper.blogsInDB();
        const blogToDelete = blogs[0];

        // get the test user's token
        const login = await api
            .post("/api/login")
            .send({
                username: "Test User",
                password: "test",
            })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        const token = login.body.token;

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ authorization: `Bearer ${token}` })
            .expect(204);

        const blogsAfterDeletion = await helper.blogsInDB();
        expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1);

        const titles = blogsAfterDeletion.map((b) => b.title);
        expect(titles).not.toContain(blogToDelete.title);
    });

    test("a note can not be deleted without token", async () => {
        const blogs = await helper.blogsInDB();
        const blogToDelete = blogs[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);
    });
});

// Close the connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
}, 100000);
