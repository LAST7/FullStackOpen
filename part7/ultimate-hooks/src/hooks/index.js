import { useEffect, useState } from "react";
import axios from "axios";

export const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
    };
};

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl)
            .then((initialNotes) => setResources(initialNotes.data))
            .catch((err) => console.error(err));
    }, []);

    const create = (resource) => {
        axios
            .post(baseUrl, resource)
            .then((res) => setResources(resources.concat(res.data)))
            .catch((err) => console.error(err));
    };

    const service = {
        create,
    };

    return [resources, service];
};
