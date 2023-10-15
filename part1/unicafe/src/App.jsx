import { useState } from "react";

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
    <div>
        {text} {value}
    </div>
);

const Statistics = ({ feedbacks }) => {
    const all = feedbacks.good + feedbacks.neutral + feedbacks.bad;
    const avg = (feedbacks.good - feedbacks.bad) / all;
    const positive_rate = (feedbacks.good / all) * 100 + "%";

    if (all === 0) {
        return <div>No feedback given</div>;
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td> good </td>
                    <td>{feedbacks.good}</td>
                </tr>
                <tr>
                    <td>neutral</td>
                    <td>{feedbacks.neutral}</td>
                </tr>
                <tr>
                    <td>bad</td>
                    <td>{feedbacks.bad}</td>
                </tr>
                <tr>
                    <td>all</td>
                    <td>{all}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{avg}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{positive_rate}</td>
                </tr>
            </tbody>
        </table>
    );
};

const App = () => {
    let [feedbacks, setFeedbacks] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    const giveFeedback = (rate) => () => {
        setFeedbacks({ ...feedbacks, [rate]: feedbacks[rate] + 1 });
    };

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={giveFeedback("good")} text="good" />
            <Button handleClick={giveFeedback("neutral")} text="neutral" />
            <Button handleClick={giveFeedback("bad")} text="bad" />
            <h1>statistics</h1>
            <Statistics feedbacks={feedbacks} />
        </div>
    );
};

export default App;
