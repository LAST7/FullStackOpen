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
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        request.token = authorization.replace("Bearer ", "");
    }

    next();
};

const userExtractor = async (request, response, next) => {
    const extractedToken = request.token;
    if (extractedToken) {
        const id = jwt.verify(extractedToken, process.env.SECRET).id;
        const user = await User.findById(id);
        request.user = user;
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
