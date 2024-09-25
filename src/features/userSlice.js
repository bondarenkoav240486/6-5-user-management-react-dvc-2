import { createSlice } from '@reduxjs/toolkit';
import initialUsers from './initialUsers'; 

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: initialUsers,
        selectedUser: null,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        selectUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action) => {

            state.users = state.users.filter(user => user.id !== action.payload);
        },
    },
});

export const { setUsers, selectUser, updateUser, addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
