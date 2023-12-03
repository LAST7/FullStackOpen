import axios from "axios";

const baseUrl = "https://imlast.top/bloglist/api/blogs";
// const baseUrl = "http://localhost:3003/api/login";

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const request = axios.get(baseUrl);

    const response = await request;
    return response.data;
};

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const update = async (id, newBlog) => {
    const request = axios.put(`${baseUrl}/${id}`, newBlog);
    const response = await request;
    return response.data;
};

const clear = async (id) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
};

export default { setToken, getAll, create, update, clear };
