const Anecdote = ({ anec }) => (
    <div>
        <h2>{anec.content}</h2>
        <p>has {anec.votes} votes</p>
        <p>
            for more see <a href={anec.info}>{anec.info}</a>
        </p>
    </div>
);
export default Anecdote;
