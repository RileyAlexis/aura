import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const backgroundSlice = createSlice({
    name: 'backgrounds',
    initialState: initialState,
    reducers: {
        setAllBackgroundData: (state, action) => {
            return action.payload;
        }
    }
});

export const { SetAllBackgroundData } = backgroundSlice.actions;

export default backgroundSlice.reducer;