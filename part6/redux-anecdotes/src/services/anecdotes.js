import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createNew = async (content) => {
    const anecdoteObject = { content, votes: 0 };
    const response = await axios.post(baseUrl, anecdoteObject);
    return response.data;
};

const voteFor = async (id) => {
    const targetAnec = (await axios.get(`${baseUrl}/${id}`)).data;
    const changedAnec = {
        ...targetAnec,
        votes: targetAnec.votes + 1,
    };

    const response = await axios.put(`${baseUrl}/${id}`, changedAnec);
    return response.data;
};

export default { getAll, createNew, voteFor };
