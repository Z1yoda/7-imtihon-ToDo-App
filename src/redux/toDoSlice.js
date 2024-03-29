import { createSlice } from '@reduxjs/toolkit'

export const toDoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: []
    },
    reducers: {
        addTodo: (state, action) => {
            state.todo.push(action.payload)


        },
        removeToDo: (state, action) => {
            state.todo = state.todo.filter(el => {
                return el.id != action.payload
            }
            )
        },
        checkToDo: (state, action) => {
            state.todo = state.todo.map(el => {
                if (el.id == action.payload.id) {
                    el.status = action.payload.status
                }
                return el
            })
        },

    }
})


export const { addTodo, removeToDo, checkToDo } = toDoSlice.actions

export default toDoSlice.reducer