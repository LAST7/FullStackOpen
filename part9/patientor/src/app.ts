import { Express } from "express";
import express from "express";
import cors = require("cors");

import diagnoseRouter from "@routers/diagnoses";
import patientRouter from "@routers/patients";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

export { app };
