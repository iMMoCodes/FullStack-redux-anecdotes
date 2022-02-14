import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const anecdoteToChange = state.find((n) => n.id === action.payload.id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: (anecdoteToChange.votes += 1),
      }
      state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : changedAnecdote
      )
    },
  },
})

export const { appendAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const likeAnecdote = (id, content) => {
  return async (dispatch) => {
    await anecdoteService.likedAnecdote(id, content)
    dispatch(voteAnecdote(content))
  }
}

export default anecdoteSlice.reducer

// export const createAnecdote = (anecdote) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       content: anecdote,
//       id: getId(),
//       votes: 0,
//     },
//   }
// }

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id },
//   }
// }

// const initialState = []

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'VOTE':
//       const anecdoteToChange = state.find((n) => n.id === action.data.id)
//       anecdoteToChange.votes += 1
//       return state.map((anecdote) =>
//         anecdote.id !== action.data.id ? anecdote : anecdoteToChange
//       )
//     case 'NEW_ANECDOTE':
//       return state.concat(action.data)
//     default:
//       return state
//   }
// }

// export default reducer
