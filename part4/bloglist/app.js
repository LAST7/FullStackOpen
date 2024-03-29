const config = require("./utils/config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const loginRouter = require("./controllers/login");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const middleware = require("./utils/middleware");
const { info, error } = require("./utils/logger.js");

const app = express();

mongoose.set("strictQuery", false);

info("connecting to", config.MONGODB_URI);
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        info("connected to MongoDB");
    })
    .catch((err) => {
        error("error connecting to MongoDB: " + err.message);
    });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", middleware.checkSignUpParam, usersRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);

if (process.env.NODE_ENV === "test") {
    const testingRouter = require("./controllers/testing");
    app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
