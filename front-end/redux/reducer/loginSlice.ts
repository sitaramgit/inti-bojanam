import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userDetails: {},
  },
  reducers: {
    accessToken: (state, action: any) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.userDetails = action?.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { accessToken } = loginSlice.actions

export default loginSlice.reducer