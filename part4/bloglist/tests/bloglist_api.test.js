const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");

const app = require("../app");
const api = supertest(app);

const initialBlogs = [
    {
        title: "Blade Runnder 2049",
        author: "Villeneuve",
        url: "www.bloglast.top",
        likes: 2049,
    },
    {
        title: "Elden Ring",
        author: "From Software",
        url: "www.imlast.top",
        likes: 298,
    },
];

// Delete all remaining documents in the database and set up new ones before testing
beforeEach(async () => {
    await Blog.deleteMany({});
    initialBlogs.forEach(async (blog) => {
        let blogObject = Blog(blog);
        await blogObject.save();
    });
}, 200000);

// Test the return type of the get method
test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
}, 200000);

// Test whether all of the blogs all returned
test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
}, 200000);

test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((b) => b.title);
    expect(titles).toContain("Elden Ring");
}, 200000);

// Close the connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
});
