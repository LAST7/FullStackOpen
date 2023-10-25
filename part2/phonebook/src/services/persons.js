import axios from "axios";

const BaseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(BaseUrl);
    return request.then((response) => response.data);
};

const create = (newPerson) => {
    const request = axios.post(BaseUrl, newPerson);
    return request.then((response) => response.data);
};

const update = (id, newPerson) => {
    const request = axios.put(`${BaseUrl}/${id}`, newPerson);
    return request.then((response) => response.data);
};

const clear = (id) => {
    const request = axios.delete(`${BaseUrl}/${id}`);
    return request.then((response) => response.data);
};

export default { getAll, create, update, clear };
