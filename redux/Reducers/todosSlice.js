import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.done = !todo.done;
            }
        },
        deleteTodo: (state, action) => {

            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
    },
});

export const {
    addTodo,
    toggleTodo,
    deleteTodo ,
} = todosSlice.actions;
export default todosSlice.reducer;
