interface MultiplyValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length !== 4) {
        throw new Error("Incorrect number of arguments");
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

type bmiStatus = "Unerweight" | "Normal (healthy weight)" | "Overweight" | "Obesity";

export const calculateBmi = (height: number, weight: number): bmiStatus => {
    const heightInMeter: number = height / 100;

    const bmi: number = weight / heightInMeter ** 2;
    let status: bmiStatus;

    if (bmi < 18.5) {
        status = "Unerweight";
    } else if (bmi < 25) {
        status = "Normal (healthy weight)";
    } else if (bmi < 30) {
        status = "Overweight";
    } else {
        status = "Obesity";
    }

    return status;
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (err: unknown) {
    if (err instanceof Error) {
        console.log("Error: " + err.message);
    }
}
