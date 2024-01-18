import { storeInstance as store } from './store'
import axios from 'axios';

import { setAllCharacterData } from './reducers/character';
import { setAllLocationData } from './reducers/gameLocations';
import { setAllSkillsets } from './reducers/skillsets';

export function loadGame() {
    const state = store.getState();
    const gameLocations = state.gameLocations;

    axios.get('/gameData/gameLocations')
        .then((response) => {
            store.dispatch(setAllLocationData(response.data));
        }).catch((error) => {
            console.error("Error getting game location data", error);
        });

    axios.get('/gameData/skillsets')
        .then((response) => {
            store.dispatch(setAllSkillsets(response.data));
        }).catch((error) => {
            console.error("Error getting skillset data", error);
        })
};

export function loadCharacter() {
    const state = store.getState();
    const user = state.user;

    if (user.userId) {
        axios.get('/loading/character')
            .then((response) => {
                store.dispatch(setAllCharacterData(response.data));
            }).catch((error) => {
                console.log(error);
            });
    }

}


export function saveCharacter() {
    const state = store.getState();
    const character = state.character;
    const stats = character.stats;
    console.log(stats);
    console.log(stats.Strength, stats.Agility);

    const dataObj = {
        userId: state.user.userId,
        name: character.name,
        strength: stats.strength,
        agility: stats.agility,
        creativity: stats.creativity,
        energy: stats.energy,
        speed: stats.speed,
        education: stats.education,
        rejection: stats.rejection,
        charisma: stats.charisma,
        life: stats.life,
        alive: true,
        basic_skills: character.basic_skills,
        thieving_skills: character.thieving_skills,
        crime_skills: character.crime_skills,
        network_skills: character.network_skills,
        corporate_skills: character.corporate_skills,
        hardware_skills: character.hardware_skills,
        cybernetic_skills: character.cybernetic_skills,
        engineering_skills: character.engineering_skills,
        background: character.background,
        coins: 0
    }
    
    console.log(dataObj);

    axios.post('/saves/character', dataObj)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        })
} //End Save Character

