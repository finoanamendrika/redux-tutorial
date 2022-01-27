import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: []
    },
    reducers: {
        setTodos(state, action) {
            state.todos = action.payload;
        },
        addTodo(state, action) {
            state.todos = [action.payload, ...state.todos];
        },
        removeTodo(state, action) {
            let todoIndex = state.todos.findIndex(todo => {
                return todo.id === action.payload;
            });
            if(todoIndex > -1) {
                state.todos = [...state.todos.slice(0, todoIndex), ...state.todos.slice(todoIndex + 1)];
            }
        },
        toggleCompletedTodo(state, action) {
            let todoIndex = state.todos.findIndex(todo => {
                return todo.id === action.payload.id;
            });
            if(todoIndex > -1) {
                state.todos[todoIndex] = {
                    ...state.todos[todoIndex],
                    completed: action.payload.completed
                }
            }
        }
    }
});

export const { setTodos, addTodo, removeTodo, toggleCompletedTodo } = todoSlice.actions;
export default todoSlice.reducer;
