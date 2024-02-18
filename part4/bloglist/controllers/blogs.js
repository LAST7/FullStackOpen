const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comments");

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

blogsRouter.get("/:id/comments/", async (request, response, next) => {
    try {
        // check if the requesting blog exists,
        // error will be caught and handled by middleware
        const blog = await Blog.findById(request.params.id);

        // extract the comment ids
        const commentIds = blog.comments;

        const comments = await Promise.all(
            commentIds.map(async (id) => await Comment.findById(id.toString())),
        );

        response.status(200).send(comments);
    } catch (err) {
        next(err);
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
        comments: [],
    });

    try {
        const savingBlog = await newBlog.save();

        // save the updated user
        user.blogs = user.blogs.concat(savingBlog._id);
        await user.save();

        // send back the saved blog
        response.status(201).send(savingBlog);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.post("/:id/comments", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);

        // extract the content of the new comment,
        // and then save it to DB
        const { content } = request.body;
        const newComment = new Comment({
            content,
            blog: blog._id,
        });
        const savingComment = await newComment.save();

        // save the updated blog
        blog.comments.push(savingComment);
        await blog.save();

        response.status(201).send(savingComment);
    } catch (err) {
        next(err);
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
        user.blogs = user.blogs.filter(
            (ref) => ref.toString() !== deletingBlog._id.toString(),
        );
        await user.save();

        // delete the comments
        deletingBlog.comments.forEach(async (commentId) => {
            await Comment.findByIdAndDelete(commentId.toString());
        });

        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete(
    "/:id/comments/:commentId",
    async (request, response, next) => {
        const blogId = request.params.id;
        const commentId = request.params.commentId;
        try {
            await Comment.findByIdAndDelete(commentId);

            // delete the ref in blog
            const blog = await Blog.findById(blogId);
            // BUG: ref did not delete
            blog.comments = blog.comments.filter(
                (c) => c.toString() !== commentId,
            );
            await blog.save();

            response.status(204).end();
        } catch (err) {
            next(err);
        }
    },
);

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
