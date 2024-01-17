import { createSlice } from "@reduxjs/toolkit";

const initialState = [];


export const onlineUsers = createSlice({
    name: 'onlineUsers',
    initialState: initialState,
    reducers: {
        setAllOnlineUsers: (state, action) => {
            return action.payload;
        }
    }
});
export const { setAllOnlineUsers } = onlineUsers.actions;

export default onlineUsers.reducer;