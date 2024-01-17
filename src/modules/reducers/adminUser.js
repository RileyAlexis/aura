import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const adminSlice = createSlice({
    name: 'adminUser',
    initialState: initialState,
    reducers: {
        setAdmin: (state, action) => {
            return action.payload;
                    },       
    }
});


export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;