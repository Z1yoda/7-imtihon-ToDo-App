import { configureStore } from '@reduxjs/toolkit'
import toDoReducer from './toDoSlice.js'

export default configureStore({
    reducer: {
        todo: toDoReducer
    }
})