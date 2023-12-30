import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    title: ''
};

export const locationsSlice = createSlice({
    name: 'locations',
    initialState: initialState,
    reducers: {
        setLocations: (state, action) => {
            return action.payload;
        }
    }
});
export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;