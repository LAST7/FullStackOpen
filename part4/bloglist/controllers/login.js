const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginRouter = require("express").Router();

const User = require("../models/users");

loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body;

    // validate the username
    if (username.length < 3) {
        return response.status(400).json({
            error: "user name must be at least 3 characters long",
        });
    }

    // find the user in the database and validate the password
    const user = await User.findOne({ username });
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    // return 401 if validation failed
    if (!(user && passwordCorrect)) {
        response.status(401).json({
            error: "Invalid username or password",
        });
    } else {
        // return the generated token to the user
        const userForToken = {
            username: user.username,
            id: user._id,
        };
        const token = jwt.sign(userForToken, process.env.SECRET, {
            expiresIn: 60 * 60,
        });

        response
            .status(200)
            .send({ token, username: user.username, name: user.name });
    }
});

module.exports = loginRouter;
