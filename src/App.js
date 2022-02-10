import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const vote = (id) => {
    console.log('vote', id)
    dispatch({ type: 'LIKE', data: { id } })
  }

  const addAnecdote = (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: anecdote,
        id: getId(),
        votes: 0,
      },
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
