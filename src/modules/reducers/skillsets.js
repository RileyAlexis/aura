import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Basic: ['Literacy', 'Net', 'Driving', 'Negotiating'],
    Thieving: ['Pickpocketing', 'Embezzlement', 'Gambling', 'Robbery', 'Scamming'],
    Networks: ['Coding', 'Malware', 'Hacking', 'Cyber Security', 'Phreaking'],
    Corporate: ['Business', 'Political Science', 'Law', 'Research', 'Marketing'],
    Hardware: ['Circuits', 'Weaponry', 'Explosives', 'Signals', 'Implants'],
    Cyborgs: ['Enhanced Limbs', 'Nano Enhancements', 'Embedded AI', 'Robotic Bodies', 'Non-Humanoid Bodies'],
    Engineering: ['Architechture', 'Transportation', 'Cybernetics', 'Nanotech', 'Defense'],
};

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