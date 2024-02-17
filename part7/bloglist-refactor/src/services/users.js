import axios from "axios";

// WARN: switch baseUrl when deploying
// const baseUrl = "https://www.imlast.top/bloglist/api/users";
const baseUrl = "http://localhost:3003/api/users";

const getAll = async () => {
    const request = axios.get(baseUrl);

    const response = await request;
    return response.data;
};

export default {
    getAll,
};
