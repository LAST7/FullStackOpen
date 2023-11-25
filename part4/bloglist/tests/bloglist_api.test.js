const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");

const Blog = require("../models/blog");

const app = require("../app");
const api = supertest(app);

// Delete all remaining documents in the database and set up new ones before testing
beforeEach(async () => {
    await Blog.deleteMany({});
    helper.initialBlogs.forEach(async (blog) => {
        let blogObject = Blog(blog);
        await blogObject.save();
    });
}, 100000);

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

test("a valid blog can be added", async () => {
    // example blog
    const newBlog = {
        title: "This is a blog",
        author: "Some Person",
        url: "www.example.com",
        likes: 123,
    };

    // add the blog to the database,
    // expecting the return status to be 201 and the returned blog to be json
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    // expecting the amount of the stored data to be one more
    const blogsAfterInsertion = await helper.blogsInDB();
    expect(blogsAfterInsertion).toHaveLength(helper.initialBlogs.length + 1);

    // expecting the stored blogs to contain the example one
    const titles = blogsAfterInsertion.map((b) => b.title);
    expect(titles).toContain("This is a blog");
}, 100000);

test("blog without title should not be stored", async () => {
    // blog without title
    const blogWithoutTitle = {
        author: "Last",
        url: "www.example.com",
        likes: 123,
    };

    // add the invalid blog to the database
    // expecting the return status to be 400
    await api.post("/api/blogs").send(blogWithoutTitle).expect(400);

    // expecting the amount of the blogs remaining the same
    const blogsAfterInsertion = await helper.blogsInDB();
    expect(blogsAfterInsertion).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog can be viewed", async () => {
    const blogs = await helper.blogsInDB();
    const blogToView = blogs[0];

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
});

test("a note can be deleted", async () => {
    const blogs = await helper.blogsInDB();
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfterDeletion = await helper.blogsInDB();
    expect(blogsAfterDeletion).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAfterDeletion.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
});

// Close the connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});
