import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'; // Редуктор для користувачів

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
