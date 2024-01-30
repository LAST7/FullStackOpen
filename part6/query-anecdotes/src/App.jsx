import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./services/anecdotes";
import { useNotificationDispatch } from "./components/NotificationContext";

const App = () => {
    const queryClient = useQueryClient();
    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"]);
            queryClient.setQueryData(
                ["anecdotes"],
                anecdotes.map(
                    (anec) =>
                        (anec =
                            anec.id === updatedAnecdote.id
                                ? updatedAnecdote
                                : anec),
                ),
            );
            // notification
            notificationDispatch({
                type: "SHOW",
                payload: `anecdote '${updatedAnecdote.content}' voted`,
            });
            setTimeout(() => {
                notificationDispatch({ type: "CLEAR" });
            }, 5000);
        },
    });

    const notificationDispatch = useNotificationDispatch();
    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1,
        });
    };

    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: getAnecdotes,
        retry: 3,
    });

    if (result.isLoading) {
        return <div>Fetching data...</div>;
    } else if (result.isError) {
        return (
            <div>anecdote service not available due to problems in server</div>
        );
    }
    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
