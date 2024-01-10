import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: [
    { id: 0, title: 'Square'},
    { id: 1, title: 'Night Market' },
    { id: 2, title: 'Neon District'},
    { id: 3, title: 'Downtown'},
    { id: 4, title: 'Cyberdome'},
    { id: 5, title: 'West Edge'},
    { id: 6, title: 'Squid Town'},
    { id: 7, title: 'The South'},
    { id: 8, title: 'Underground'}
    ],
    game: [
        {id: 100, title: 'New Character'},
        {id: 101, title: 'Settings'},
        {id: 102, title: 'View Stats'},
    ],

}


export const gameLocationsSlice = createSlice({
    name: 'locations',
    initialState: initialState,
    reducers: {
        setLocationsAllData: (state, action) => {
            return action.payload;
        }
    }
});
export const { setLocationsAllData } = gameLocationsSlice.actions;

export default gameLocationsSlice.reducer;