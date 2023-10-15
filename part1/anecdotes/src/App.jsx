import { useState } from "react";

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ vote_num }) => <p>has {vote_num} votes</p>;

const BestOne = ({ anecdote }) => (
    <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdote}</p>
    </div>
);

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVote] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
    });
    const [best, setBest] = useState(0);

    const changeAnecdote = () => {
        setSelected(Math.floor(Math.random() * 10) % 8);
    };

    const vote = (index) => () => {
        setVote({ ...votes, [index]: votes[index] + 1 });
        console.log(votes[index], votes[best]);
        if (votes[index] + 1 > votes[best]) {
            setBest(index);
        }
    };

    return (
        <div>
            <div>{anecdotes[selected]}</div>
            <Statistic vote_num={votes[selected]} />
            <Button handleClick={vote(selected)} text="vote" />
            <Button handleClick={changeAnecdote} text="next anecdote" />
            <BestOne anecdote={anecdotes[best]} />
        </div>
    );
};

export default App;
