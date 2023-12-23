const jwt = require("jsonwebtoken");
const { info, error } = require("./logger");
const User = require("../models/users");

const requestLogger = (request, response, next) => {
    info("Method: ", request.method);
    info("Path:   ", request.path);
    info("Body:   ", request.body);
    info("---");
    next();
};

const tokenExtractor = (request, response, next) => {
    const auth = request.get("authorization");
    if (auth && auth.startsWith("Bearer ")) {
        request.token = auth.replace("Bearer ", "");
    }

    next();
};

const userExtractor = async (request, response, next) => {
    const extractedToken = request.token;
    if (extractedToken) {
        try {
            const id = jwt.verify(extractedToken, process.env.SECRET).id;
            const user = await User.findById(id);
            request.user = user;
        } catch (exception) {
            // Mostly token expired
            next(exception);
        }
    }

    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, request, response, next) => {
    error(err.message);

    if (err.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (err.name === "ValidationError") {
        return response.status(400).json({ error: err.message });
    } else if (err.name === "JsonWebTokenError") {
        return response.status(401).json({ error: err.message });
    } else if (err.name === "TokenExpiredError") {
        return response.status(401).json({ error: "token expired" });
    }

    next(err);
};

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler,
};
