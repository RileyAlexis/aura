import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    userName: '',
    alias: '',
    hp: 5,
    exp: 0,
    inventory: {},
    money: 0
};

export const userStatsSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserData: (state, action) => {
            return action.payload;
        }
    }
});
export const { setUserData } = userStatsSlice.actions;

export default userStatsSlice.reducer;