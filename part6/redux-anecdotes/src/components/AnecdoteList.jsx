import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch();

    const anecdotes = useSelector((state) => {
        if (state.filter === "") {
            return state.anecdotes;
        }
        return state.anecdotes.filter((anec) =>
            anec.content.includes(state.filter),
        );
    });
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

    const vote = async (anec, id) => {
        dispatch(voteFor(id));
        dispatch(setNotification(`you voted '${anec}'`, 5));
    };

    return (
        <div>
            {sortedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}{" "}
                        <button
                            onClick={() => vote(anecdote.content, anecdote.id)}
                        >
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
