import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addNewAnecdote = async (ev) => {
        ev.preventDefault();

        const content = ev.target.anecdote.value;
        ev.target.anecdote.value = "";

        dispatch(createAnecdote(content));
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
