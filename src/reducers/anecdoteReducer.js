import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push({
        content: action.payload.content,
        id: action.payload.id,
        votes: 0,
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const anecdoteToChange = state.find((n) => n.id === action.payload)
      anecdoteToChange.votes += 1
      state.map((anecdote) =>
        anecdote.id !== action.payload ? anecdote : anecdoteToChange
      )
    },
  },
})

export const { createAnecdote, appendAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions
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
