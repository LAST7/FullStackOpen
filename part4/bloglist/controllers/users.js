const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users");

usersRouter.get("/", async (request, response) => {
    // BUG: ref persists after the blog is deleted
    const users = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
    });
    response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
    const { username, name, password } = request.body;

    try {
        const saltRound = 10;
        const passwordHash = await bcrypt.hash(password, saltRound);

        const user = new User({
            username,
            name,
            passwordHash,
        });
        const savedUser = await user.save();

        response.status(201).json(savedUser);
    } catch (exception) {
        next(exception);
    }
});

usersRouter.delete("/:id", async (request, response, next) => {
    try {
        await User.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

module.exports = usersRouter;
