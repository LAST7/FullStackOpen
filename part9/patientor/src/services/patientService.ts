import patientData from "@data/patients";

import { Patient, PatientWithoutSsn } from "@/type";
import { toNewPatient } from "@/utils/utils";

const getPatientInfo = (): Array<PatientWithoutSsn> => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (requestBody: unknown) => {
    const patient: Patient = toNewPatient(requestBody);

    patientData.push(patient);
    return patient;
};

export default {
    getEntries: getPatientInfo,
    addPatient,
};
