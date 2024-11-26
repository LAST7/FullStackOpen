import express from "express";
import patientService from "@/services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
    res.send(patientService.getEntries());
});

patientRouter.post("/", (req, res) => {
    res.send(patientService.addPatient(req.body));
});

export default patientRouter;
