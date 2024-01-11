import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 0, 
        title: 'Street Urchin', 
        description: "Orphaned at a young age, you have learned to survive by your wits and agility, navigating the dangerous and ever-changing landscape of the city. With your patched-up clothes and hardened gaze you are a symbol of resilience and determination in a world that often overlooks those at the bottom"
    },
    {
        id: 1, 
        title: 'Exile',
        description: "You find yourself as an exile, cast out from your home for unspecified crimes. Stripped of your former life and connections, you navigate the treacherous underbelly of Aura, deperate to survive"
    },
    {
        id: 2, 
        title: 'Baby Cyborg', 
        description: "Created in a clandestine laboratory, you possess extraordinary abilities and cybernetic enhancements beyond your comprehension."
},
    {
        id: 3, 
        title: 'Undergrounder',
        description: "Born and raised in the labyrinthine tunnels and hidden chambers beneath the city, you've never known the surface world. The claustrophobic confines of your subterranean home have shaped your perspective, granting you a unique understanding of the city's hidden currents and unseen dangers. With a natural affinity for the darkness and a deep-seated aversion to the oppressive brightness above, you navigate the treacherous underworld, determined to carve out your own existence in a city that often forgets those who live in the shadows"    
    },
]

export const backgroundSlice = createSlice({
    name: 'backgrounds',
    initialState: initialState,
    reducers: {
        setAllBackgroundData: (state, action) => {
            return action.payload;
        }
    }
});

export const { SetAllBackgroundData } = backgroundSlice.actions;

export default backgroundSlice.reducer;