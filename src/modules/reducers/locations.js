import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, title: 'Night Market' },
    { id: 2, title: 'Neon District'},
    { id: 3, title: 'Downtown'},
    { id: 4, title: 'Cyberdome'},
    { id: 5, title: 'West Edge'},
    { id: 6, title: 'Fish Town'},
    { id: 7, title: 'The South'},
    { id: 8, title: 'Underground'},
];

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