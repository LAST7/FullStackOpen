import { v1 as uuid } from "uuid";

import { Gender, Patient } from "@/type";

export const toNewPatient = (object: unknown) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data.");
    }

    if (
        "name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object
    ) {
        const newPatient: Patient = {
            id: uuid(),
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
        };

        return newPatient;
    }

    console.log(object);
    throw new Error("Incorrect data: some fields are missing.");
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string) => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string) => {
    return Object.values(Gender)
        .map((g) => g.toString())
        .includes(gender);
};

const parseString = (stringVar: unknown): string => {
    if (!isString(stringVar)) {
        throw new Error("Incorrect field.");
    }

    return stringVar;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect date: " + date);
    }

    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect gender");
    }

    return gender as Gender;
};
