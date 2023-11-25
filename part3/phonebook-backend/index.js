require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/mongoose");

const app = express();
app.use(express.json());
app.use(cors());

morgan.token("content", (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :content"));

// ROUTES //

/**
 * Express route handler for GET /api/persons
 * Return general info about persons stored in the server
 *
 * @param {http.IncomingMessage} request - The request object
 * @param {http.ServerResponse} response - The response object
 */
app.get("/info", async (request, response) => {
    const length = await Person.estimatedDocumentCount();
    const num = `<p>Phonebook has info for ${length} people</p>`;
    response.send(`<p>${num}</p> <p>${Date()}</p>`);
});

/**
 * Express route handler for GET /api/persons
 * Return all persons
 *
 * @param {http.IncomingMessage} request - The request object
 * @param {http.ServerResponse} response - The response object
 */
app.get("/api/persons", (request, response) => {
    Person.find({}).then((result) => {
        response.json(result);
    });
});

/**
 * Express route handler for GET /api/persons/:id
 * Return a person by id
 *
 * @param {http.IncomingMessage} request - The request object
 * @param {http.ServerResponse} response - The response object
 */
app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person);
            } else {
                // not found, return status 404
                response.status(404).end();
            }
        })
        .catch((err) => {
            next(err);
        });
});

/**
 * Express route handler for DELETE /api/persons/:id
 * Deletes a person by id
 *
 * @param {http.IncomingMessage} request - The request object
 * @param {http.ServerResponse} response - The response object
 */
app.delete("/api/persons/:id", async (request, response, next) => {
    // const id = Number(request.params.id);
    Person.findByIdAndDelete(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((err) => next(err));
});

/**
 * Express route handler for POST /api/persons
 * Creates a new person based on the request body
 *
 * @param {http.IncomingMessage} request - The request object
 * @param {http.ServerResponse} response - The response object
 */
app.post("/api/persons", (request, response, next) => {
    // Get the request body containing the person data
    const body = request.body;

    Person.findOne({ name: body.name }, (err, doc) => {
        if (err) {
            // log out error
            console.error(`Error when finding by name: ${err}`);
        } else if (doc) {
            // Send 400 error if name already exists
            console.error("Bad request due to duplicate name");
            return response.status(400).json({
                error: "name must be unique",
            });
        } else {
            // Insert the new person
            const newPerson = new Person({
                name: body.name,
                number: body.number,
            });
            newPerson
                .save()
                .then((newPerson) => {
                    response.json(newPerson);
                    console.log(`person saved: ${body.name}`);
                })
                .catch((err) => next(err));
        }
    });
});

/**
 * Express route handler for PUT /api/persons
 * Update the corresponding person based on the request body
 *
 * @param {http.IncomingMessage} request - The request object
 * @param {http.ServerResponse} response - The response object
 */
app.put("/api/persons/:id", (request, response, next) => {
    // Get the request body containing the person data
    const body = request.body;

    // Validate input
    if (!body.name) {
        // Send 400 error if name is missing in the request body
        return response.status(400).json({
            error: "name missing",
        });
    }

    // create the new person
    const newNumber = {
        name: body.name,
        number: body.number,
    };
    // Update the requested person and send the response
    Person.findByIdAndUpdate(request.params.id, newNumber, {
        new: true,
        runValidators: true,
        context: "query",
    })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((err) => next(err));
});

//
// ROUTES //

/**
 * Express route handler for unknown endpoint
 *
 * @param {http.IncomingMessage} request - The request object
 * @param {http.ServerResponse} response - The response object
 */
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
});
