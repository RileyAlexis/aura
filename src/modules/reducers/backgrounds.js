import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        id: 0, 
        title: 'Street Urchin', 
        description: "Orphaned at a young age, you have learned to survive by your wits and agility, navigating the dangerous and ever-changing landscape of the city. With your patched-up clothes and hardened gaze you are a symbol of resilience and determination in a world that often overlooks those at the bottom.",
        stats: {
            Strength: 2,
            Agility: 4,
            Creativity: 4,
            Energy: 3,
            Speed: 4,
            Education: 1,
            Rejection: 1,
            Charisma: 0
        },
        skills: {
            Basic: [1],
            Thieving: [0],
            Networks: [],
            Corporate: [],
            Hardware: [],
            Cyborgs: [],
            Engineering: [],
            },
    },
        
    
    {
        id: 1, 
        title: 'Exile',
        description: "You find yourself as an exile, cast out from your home for unspecified crimes. Stripped of your former life and connections, you navigate the treacherous underbelly of Aura, deperate to survive",
        stats: {
            Strength: 3,
            Agility: 2,
            Creativity: 1,
            Energy: 3,
            Speed: 2,
            Education: 2,
            Rejection: 0,
            Charisma: 1
        },
        skills: {
            Basic: [0],
            Thieving: [],
            Networks: [],
            Corporate: [0],
            Hardware: [],
            Cyborgs: [],
            Engineering: [],
            },
    },
    {
        id: 2, 
        title: 'Clone Child', 
        description: "Created in a clandestine laboratory your past is a mystery.",
        stats: {
            Strength: 2,
            Agility: 2,
            Creativity: 3,
            Energy: 3,
            Speed: 2,
            Education: 0,
            Rejection: 2,
            Charisma: 1
        },
        skills: {
            Basic: [0, 1],
            Thieving: [],
            Networks: [],
            Corporate: [],
            Hardware: [],
            Cyborgs: [],
            Engineering: [],
            },
    
},
    {
        id: 3, 
        title: 'Undergrounder',
        description: "Born and raised in the labyrinthine tunnels and hidden chambers beneath the city, you've never known the surface world. With a natural affinity for the darkness and a deep-seated aversion to the oppressive brightness above, you navigate the treacherous underworld, determined to carve out your own existence in a city that often forgets those who live in the shadows",
        stats: {
            Strength: 3,
            Agility: 2,
            Creativity: 2,
            Energy: 2,
            Speed: 3,
            Education: 0,
            Rejection: 0,
            Charisma: 0
        },
        skills: {
            Basic: [0],
            Thieving: [4],
            Networks: [],
            Corporate: [],
            Hardware: [],
            Cyborgs: [],
            Engineering: [],
            },
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