import express from "express";
const app = express();
app.use(express.json());

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { Evaluation } from "./exerciseCalculator";
import { containsNaN } from "./utils";

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res
            .status(400)
            .json({
                error: "malformatted parameters",
            })
            .end();
    }

    return res.status(200).json({
        weight,
        height,
        bmi: calculateBmi(height, weight),
    });
});

app.post("/exercises", (req, res) => {
    // const { daily_exercises, target } = req.body;
    // eslint-disable-next-line
    const daily_exercises = req.body.daily_exercises;
    // eslint-disable-next-line
    const target: number = Number(req.body.target);

    if (!daily_exercises || !target) {
        return res
            .status(400)
            .json({
                error: "parameters missing",
            })
            .end();
    }
    // eslint-disable-next-line
    if (containsNaN(daily_exercises) || isNaN(target)) {
        return res
            .status(400)
            .json({
                error: "malformatted parameters",
            })
            .end();
    }

    // eslint-disable-next-line
    const evaluation: Evaluation = calculateExercises(daily_exercises, target);

    return res.status(200).json(evaluation);
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
