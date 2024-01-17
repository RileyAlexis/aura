import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const skillsetSlice = createSlice({
    name: 'skillsets',
    initialState: initialState,
    reducers: {
        setAllSkillsets: (state, action) => {
            return action.payload;
        }
    }
});

export const { setAllSkillsets} = skillsetSlice.actions;

export default skillsetSlice.reducer;