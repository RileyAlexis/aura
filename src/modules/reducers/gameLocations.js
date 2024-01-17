import { createSlice } from "@reduxjs/toolkit";

const initialState = {}


export const gameLocationsSlice = createSlice({
    name: 'locations',
    initialState: initialState,
    reducers: {
        setAllLocationData: (state, action) => {
            return action.payload;
        }
    }
});
export const { setAllLocationData } = gameLocationsSlice.actions;

export default gameLocationsSlice.reducer;