import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
  },
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer

// export const notificationChange = (notification) => {
//   return {
//     type: 'SET_NOTIFICATION',
//     notification,
//   }
// }

// const notificationReducer = (state = null, action) => {
//   switch (action.type) {
//     case 'SET_NOTIFICATION':
//       return action.notification
//     default:
//       return state
//   }
// }

// export default notificationReducer
