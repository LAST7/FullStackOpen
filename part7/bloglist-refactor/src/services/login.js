import axios from "axios";

// WARN: switch baseUrl when deploying
// const baseUrl = "https://www.imlast.top/bloglist/api/login";
const baseUrl = "http://localhost:3003/api/login";

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

export default { login };
