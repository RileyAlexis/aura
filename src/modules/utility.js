import { storeInstance as store } from './store'
import axios from 'axios';

import { setAllCharacterData } from './reducers/character';

export function saveCharacter() {
    const state = store.getState();
    const character = state.character;
    const stats = character.stats;
    console.log(stats);
    console.log(stats.Strength, stats.Agility);

    const dataObj = {
        userId: state.user.userId,
        name: character.name,
        strength: stats.Strength,
        agility: stats.Agility,
        creativity: stats.Creativity,
        energy: stats.Energy,
        speed: stats.Speed,
        education: stats.Education,
        rejection: stats.Rejection,
        charisma: stats.Charisma,
        skills: character.skills,
    }
    console.log(dataObj);

    axios.post('/saves/character', dataObj)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        })
} //End Save Character

export function loadCharacter() {
    const state = store.getState();
    const user = state.user;

    if (user.userId) {
        axios.get('/loading/character')
            .then((response) => {
                console.log(response);
                store.dispatch(setAllCharacterData(response.data));
            }).catch((error) => {
                console.log(error);
            });
    }

}