import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers/todo.reducer';

export default configureStore({
    reducer: {
        todo: todoReducer
    }
});