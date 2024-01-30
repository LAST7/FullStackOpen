import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        appendAnecdoteAction(state, action) {
            state.push(action.payload);
        },
        setAnecdotesAction(_state, action) {
            return action.payload;
        },
        voteForAction(state, action) {
            const changedAnecdote = action.payload;
            return state.map((anec) =>
                anec.id === changedAnecdote.id ? changedAnecdote : anec,
            );
        },
    },
});

const { appendAnecdoteAction, setAnecdotesAction, voteForAction } =
    anecdoteSlice.actions;

export const initAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotesAction(anecdotes));
    };
};

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(appendAnecdoteAction(newAnecdote));
    };
};

export const voteFor = (id) => {
    return async (dispatch) => {
        const votedAnecdote = await anecdoteService.voteFor(id);
        dispatch(voteForAction(votedAnecdote));
    };
};

export default anecdoteSlice.reducer;
