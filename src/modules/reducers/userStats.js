import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    userName: '',
};

export const userStatsSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserData: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return initialState;
        },
        setUserSocketId: (state, action) => {
            state.socketId = action.payload;
        }
    }
});
export const { setUserData, removeUser, setUserSocketId } = userStatsSlice.actions;

export default userStatsSlice.reducer;