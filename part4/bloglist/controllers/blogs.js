const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/users");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (blog) {
            response.json(blog);
        } else {
            response.status(404).end();
        }
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.post("/", async (request, response, next) => {
    const { title, author, url, likes, userId } = request.body;

    const user = await User.findById(userId);
    const newBlog = new Blog({
        title,
        author,
        url,
        likes: likes === undefined ? 0 : likes,
        user: userId,
    });

    try {
        const savedBlog = await newBlog.save();

        // save the user to the user collection
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).send(savedBlog);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    const body = request.body;

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            newBlog,
            { new: true },
        );
        response.json(updatedBlog);
    } catch (exception) {
        next(exception);
    }
});

module.exports = blogsRouter;
