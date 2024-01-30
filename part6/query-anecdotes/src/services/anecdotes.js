import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const addAnecdote = async (newAnecdote) => {
    const res = await axios.post(BASE_URL, newAnecdote);
    return res.data;
};

export const updateAnecdote = async (updatedAnecdote) => {
    const res = await axios.put(
        `${BASE_URL}/${updatedAnecdote.id}`,
        updatedAnecdote,
    );
    return res.data;
};
