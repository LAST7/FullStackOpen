import axios from "axios";

// WARN: switch baseUrl when deploying
// const baseUrl = "https://www.imlast.top/bloglist/api/blogs";
const baseUrl = "http://localhost:3003/api/blogs";

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

const getComments = async (blogId) => {
    const response = await axios.get(`${baseUrl}/${blogId}/comments`);

    return response.data;
};

const createComment = async (blogId, newComment) => {
    const response = await axios.post(
        `${baseUrl}/${blogId}/comments`,
        newComment,
    );

    return response.data;
};

export default {
    setToken,
    getAll,
    create,
    update,
    clear,
    getComments,
    createComment,
};
