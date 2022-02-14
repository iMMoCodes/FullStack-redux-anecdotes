import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseURL, { content, votes: 0 })
  return response.data
}

const likedAnecdote = async (id, content) => {
  const newAnecdote = { ...content, votes: content.votes + 1 }
  const response = await axios.patch(`${baseURL}/${id}`, newAnecdote)
  return response.data
}

export default { getAll, createNew, likedAnecdote }
