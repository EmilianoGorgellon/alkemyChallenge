import { GET_CHARACTERS_HERO, GET_CHARACTERS_VILLAIN, GET_TEAM_GRAFIC_PIE } from "../types";

const HomeReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_CHARACTERS_HERO: 
            return {
                ...state,
                characterHero: payload !== null ? payload.map(dato => JSON.parse(dato)) : undefined
            }
        case GET_CHARACTERS_VILLAIN:
            return {
                ...state,
                characterVillain: payload !== null ? payload.map(dato => JSON.parse(dato)) : undefined
            }
        case GET_TEAM_GRAFIC_PIE:
            return {
                ...state,
                sendDataGrafic: payload
            }
        default:
            return {
                state
            } 
        }
};
export default HomeReducer;