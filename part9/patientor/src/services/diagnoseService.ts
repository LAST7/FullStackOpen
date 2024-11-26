import diagnoseData from "@data/diagnoses";

import { Diagnose } from "@/type";

const getEntries = (): Array<Diagnose> => {
    return diagnoseData;
};

const addDiary = () => {
    return null;
};

export default {
    getEntries,
    addDiary,
};
