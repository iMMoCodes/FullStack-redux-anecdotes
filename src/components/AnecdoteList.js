import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  filteredAnecdotes.sort(function (a, b) {
    return b.votes - a.votes
  })

  const vote = (anecdote) => {
    console.log('anecdote', anecdote)
    dispatch(likeAnecdote(anecdote.id, anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
