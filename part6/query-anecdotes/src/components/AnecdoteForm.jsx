import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import { useNotificationDispatch } from "./NotificationContext";
import { addAnecdote } from "../services/anecdotes";

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const notificationDispatch = useNotificationDispatch();
    const newAnecdoteMutation = useMutation({
        mutationFn: addAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"]);
            queryClient.setQueryData(
                ["anecdotes"],
                anecdotes.concat(newAnecdote),
            );
            // notification
            notificationDispatch({
                type: "SHOW",
                payload: `--${content}-- created`,
            });
        },
        onError: (e) => {
            notificationDispatch({
                type: "SHOW",
                payload: e.response.data.error,
            });
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        newAnecdoteMutation.mutate({ content, votes: 0 });
        setTimeout(() => {
            notificationDispatch({ type: "CLEAR" });
        }, 5000);
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
