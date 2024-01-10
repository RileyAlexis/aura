import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, title: 'Night Market' },
    { id: 2, title: 'Neon District'},
    { id: 3, title: 'Downtown'},
    { id: 4, title: 'Cyberdome'},
    { id: 5, title: 'West Edge'},
    { id: 6, title: 'Squid Town'},
    { id: 7, title: 'The South'},
    { id: 8, title: 'Underground'},
];

export const GameLocationsSlice = createSlice({
    name: 'locations',
    initialState: initialState,
    reducers: {
        setLocationsAllData: (state, action) => {
            return action.payload;
        }
    }
});
export const { setLocationsAllData } = GameLocationsSlice.actions;

export default GameLocationsSlice.reducer;