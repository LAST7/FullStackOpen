import { containsNaN } from "./utils";

export interface Evaluation {
    periodLength: number;
    trainingDays: number;
    average: number;
    success: boolean;
    rating: 1 | 2 | 3;
    target: number;
    ratingDescription: string;
}

interface ExerciseRecord {
    target: number;
    dailyHours: Array<number>;
}

const parseArguments = (args: Array<string>): ExerciseRecord => {
    if (args.length <= 3) {
        throw new Error("No enough argument provided!");
    }

    if (containsNaN(args.slice(2))) {
        throw new Error("Provided data contains NaN value!");
    }

    const target: number = Number(args[2]);
    const dailyHoursInString: Array<string> = args.slice(3);

    return {
        target,
        dailyHours: dailyHoursInString.map((e) => Number(e)),
    };
};

const calAvg = (arr: Array<number>): number => {
    return arr.reduce((sum, n) => (sum += n), 0) / arr.length;
};

export const calculateExercises = (
    target: number,
    dailyHours: Array<number>,
): Evaluation => {
    const average: number = calAvg(dailyHours);
    const success = average >= target ? true : false;

    const trainingDays = dailyHours.reduce(
        (sum, t) => (t > 0 ? sum + 1 : sum),
        0,
    );

    let rating: 1 | 2 | 3;
    if (average < 1.5) {
        rating = 1;
    } else if (average < 3) {
        rating = 2;
    } else {
        rating = 3;
    }

    let ratingDescription: string;
    switch (rating) {
        case 1:
            ratingDescription = "bad, try harder";
            break;
        case 2:
            ratingDescription = "not too bad but could be better";
            break;
        case 3:
            ratingDescription = "good, keep it going";
            break;
    }

    const evaluation: Evaluation = {
        periodLength: dailyHours.length,
        trainingDays,
        average,
        target,
        success,
        rating,
        ratingDescription,
    };

    return evaluation;
};

try {
    const exerciseData: ExerciseRecord = parseArguments(process.argv);
    const { target, dailyHours } = exerciseData;

    console.log(calculateExercises(target, dailyHours));
} catch (err: unknown) {
    if (err instanceof Error) {
        console.log("Error: " + err.message);
    }
}
