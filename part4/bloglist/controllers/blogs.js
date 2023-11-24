const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    });
});

blogsRouter.get("/:id", (request, response, next) => {
    Blog.findById(request.params.id)
        .then((blog) => {
            if (blog) {
                response.json(blog);
            } else {
                response.status(404).end();
            }
        })
        .catch((err) => next(err));
});

blogsRouter.post("/", (request, response, next) => {
    const body = request.body;

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    newBlog
        .save()
        .then((savedBlog) => {
            response.json(savedBlog);
        })
        .catch((err) => next(err));
});

blogsRouter.delete("/:id", (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch((err) => next(err));
});

blogsRouter.put("/:id", (request, response, next) => {
    const body = request.body;

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
        .then((updatedBlog) => {
            response.json(updatedBlog);
        })
        .catch((err) => next(err));
});

module.exports = blogsRouter;
