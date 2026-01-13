import { configureStore } from '@reduxjs/toolkit'
import { CartSlice } from './Cartslice'

export default configureStore({
  reducer: {
    cart : CartSlice.reducer,
  },
})