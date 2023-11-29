import { useState } from 'react'

const Headline = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    </tbody>
    ) 
  }
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if (props.valueAll === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
  <>
    <table>
    <StatisticLine text="good" value={props.value1} />
    <StatisticLine text="neutral" value={props.value2} />
    <StatisticLine text="bad" value={props.value3} />
    <StatisticLine text="all" value={props.valueAll} />
    <StatisticLine text="average" value={props.value5} />
    <StatisticLine text="positive" value={props.value6} />
    </table>
  </>
  )
  }


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [average, setAverage] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [positivePrecent, setPositivePrecent] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks.concat(1))
    
    const updatedTotal = total + 1
    const updatedGood = good + 1
    setGood(updatedGood)
    console.log({allClicks})
    setTotal(updatedTotal)
    setAverage(updatedTotal / (allClicks.length + 1))

    setPositivePrecent(updatedGood / (allClicks.length + 1) * 100)
    console.log({updatedTotal, allClicks})
    console.log(updatedGood / (allClicks.length + 1) * 100)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat(0))
    const updatedTotal = total + 0
    setTotal(updatedTotal)
    setNeutral(neutral + 1)

    setAverage(updatedTotal / (allClicks.length + 1))
    setPositivePrecent(good / (allClicks.length + 1) * 100)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat(-1))
    const updatedTotal = total - 1
    setTotal(updatedTotal)
    setBad(bad + 1)

    setAverage(updatedTotal / (allClicks.length + 1))
    setPositivePrecent(good / (allClicks.length + 1) * 100)
  }

  return (
    <div>
      <Headline text="Give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Headline text="Statistics" />
      <Statistics value1={good} value2={neutral} value3={bad} valueAll={allClicks.length} value5={average} value6={positivePrecent} />

    </div>
  )
}

export default App