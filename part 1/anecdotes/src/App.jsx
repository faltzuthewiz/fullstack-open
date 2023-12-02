import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const n = 8
  const [points, setPoints] = useState(Array(n).fill(0))
  
  const selectRandom = () => {
    const updatedSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(updatedSelected)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    
    setPoints(copy)

    console.log("the current points are " + copy)
  }

  const highestPoints = points.reduce((a,b) => Math.max(a,b))
  const highestPointsIndex = points.indexOf(highestPoints)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[highestPointsIndex]}
      <p>has {highestPoints} votes</p>
    </div>
  )
}

export default App