import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    access_token: '',
  },
  reducers: {
    token: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.access_token = state.access_token
    }
  },
})

// Action creators are generated for each case reducer function
export const { token } = loginSlice.actions

export default loginSlice.reducer