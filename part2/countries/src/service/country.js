import axios from "axios";

const BaseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
    const request = axios.get(`${BaseUrl}/all`);
    return request.then((response) => response.data);
};

const get = (searchTerm) => {
    const request = axios.get(`${BaseUrl}/name/${searchTerm}`);
    return request.then((response) => response.data);
};

export default { getAll, get };
