import {useState} from "react";

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticsLine = ({text, value}) => <>
    <tr>
        <td>{text}:</td>
        <td>{value}</td>
    </tr>
</>

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    const average = (good * 1 + neutral * 0.5) / all;
    const positive = good / all * 100 + "%";
    if (good + neutral + bad === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <table>
            <tbody>
            <StatisticsLine text={"good"} value={good}/>
            <StatisticsLine text={"neutral"} value={neutral}/>
            <StatisticsLine text={"bad"} value={bad}/>
            <StatisticsLine text={"all"} value={all}/>
            <StatisticsLine text={"average"} value={average}/>
            <StatisticsLine text={"positive"} value={positive}/>
            </tbody>
        </table>
    )
}

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const incrementGood = () => {
        const increment = () => {
            setGood(good + 1);
        }
        return increment
    }
    const incrementNeutral = () => {
        const increment = () => {
            setNeutral(neutral + 1);
        }
        return increment
    }
    const incrementBad = () => {
        const increment = () => {
            setBad(bad + 1);
        }
        return increment
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <Button text={"GOOD"} onClick={incrementGood()}/>
            <Button text={"NEUTRAL"} onClick={incrementNeutral()}/>
            <Button text={"BAD"} onClick={incrementBad()}/>
            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    );
}

export default App;
