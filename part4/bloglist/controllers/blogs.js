const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

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
    // operation not allowed without token
    if (!request.token) {
        return response.status(401).json({ error: "token missing" });
    }

    // user object extracted from the database by middleware function
    const user = request.user;
    if (!user) {
        return response.status(401).json({ error: "token invalid" });
    }

    const { title, author, url, likes } = request.body;
    // create the new Blog object and save it to the database
    const newBlog = new Blog({
        title,
        author: author || user.username,
        url,
        likes: likes || 0,
        user: user.id,
    });

    try {
        const savingBlog = await newBlog.save();

        // save the user to the user collection
        user.blogs = user.blogs.concat(savingBlog._id);
        await user.save();

        // send back the saved blog
        response.status(201).send(savingBlog);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    // operation not allowed without token
    if (!request.token) {
        return response.status(401).json({ error: "token missing" });
    }

    // user object extracted from the database by middleware function
    const user = request.user;
    if (!user) {
        return response.status(401).json({ error: "token invalid" });
    }

    try {
        // see if the DELETE request is sent by the author of the blog
        const deletingBlog = await Blog.findById(request.params.id);
        if (deletingBlog.user.toString() !== user.id) {
            return response.status(401).json({ error: "unauthorized action" });
        }

        // delete the blog
        await Blog.findByIdAndDelete(request.params.id);

        // delete the ref from the user object and save it back
        user.blogs = user.blogs.filter((ref) => ref !== deletingBlog._id);
        await user.save();
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    const body = request.body;

    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    };

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
