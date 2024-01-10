import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: '',
};

export const characterSlice = createSlice({
    name: 'character',
    initialState: initialState,
    reducers: {
        setAllCharacterData: (state, action) => {
            return action.payload;
                    },  
        setLocation: (state, action) => {
            // console.log('Reducer**************', action.payload);
            state.location = action.payload;
        },
    }
});


export const { setAllCharacterData, setLocation } = characterSlice.actions;

export default characterSlice.reducer;