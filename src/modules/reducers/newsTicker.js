import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const newsTickerSlice = createSlice({
    name: 'locations',
    initialState: initialState,
    reducers: {
        setAllTickerData: (state, action) => {
            return action.payload;
        }
    }
});
export const { setAllTickerData } = newsTickerSlice.actions;

export default newsTickerSlice.reducer;