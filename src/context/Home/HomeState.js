import React, { useReducer } from 'react';
import HomeReducer from './HomeReducer.js'
import HomeContext from './HomeContext.js'

const HomeState = (props) => {
    const initialState = {
            characterHero: undefined,
            characterVillain: undefined,
            sendDataGrafic: undefined
    }
    const arrayStats= [];
    const sendData = [];
    const [state, dispatch] = useReducer(HomeReducer, initialState)
    const getCharactersHero = () => {
        const $getCharactersHero = localStorage.getItem("heroesId");
        const parseCharactersHero = JSON.parse($getCharactersHero);
        dispatch({
            type: 'GET_CHARACTERS_HERO',
            payload: parseCharactersHero
        })
    }
    const getCharactersVillain = () => {
        const $getCharactersVillain = localStorage.getItem("villainId");
        const parseCharactersVillain = JSON.parse($getCharactersVillain);
        dispatch({
            type: 'GET_CHARACTERS_VILLAIN',
            payload: parseCharactersVillain
        })
    }
    const getTeamGrafic = (getCharacter, bothCharacters) => {
        if (bothCharacters === true) {
            arrayStats.push(getCharacter)
            if (arrayStats.length === 2) {
               
                const $averageHeightCharacters = arrayStats.map($dato => $dato.map(dato => dato.reduce((sum, value) => Math.round(sum + parseInt(value.appearance.height[1])/ $dato.length) ,0)))
                const averageHeightCharacters = $averageHeightCharacters.map(dato => dato.reduce((sum, value) => sum + parseInt(value), 0))

                const $averageWeightCharacters = arrayStats.map($dato => $dato.map(dato => dato.reduce((sum, value) => Math.round(sum + parseInt(value.appearance.weight[1])/ $dato.length) ,0)))
                const averageWeightCharacters = $averageWeightCharacters.map(dato => dato.reduce((sum, value) => sum + parseInt(value), 0))

                const $intelligence = arrayStats.map($dato => $dato.map(dato => dato.reduce((sum, value) => sum + parseInt(value.powerstats.intelligence) ,0)))
                const intelligence = $intelligence.map(dato => dato.reduce((sum, value) => sum + parseInt(value)))

                const $strength = arrayStats.map($dato => $dato.map(dato => dato.reduce((sum, value) => sum + parseInt(value.powerstats.strength) ,0)))
                const strength = $strength.map(dato => dato.reduce((sum, value) => sum + parseInt(value)))

                const $speed = arrayStats.map($dato => $dato.map(dato => dato.reduce((sum, value) => sum + parseInt(value.powerstats.speed) ,0)))
                const speed = $speed.map(dato => dato.reduce((sum, value) => sum + parseInt(value)))
    
                const $durability = arrayStats.map($dato => $dato.map(dato => dato.reduce((sum, value) => sum + parseInt(value.powerstats.durability) ,0)))
                const durability = $durability.map(dato => dato.reduce((sum, value) => sum + parseInt(value)))

                const $power = arrayStats.map($dato => $dato.map(dato => dato.reduce((sum, value) => sum + parseInt(value.powerstats.power) ,0)))
                const power = $power.map(dato => dato.reduce((sum, value) => sum + parseInt(value)))

                const $combat = arrayStats.map($dato => $dato.map(dato => dato.reduce((sum, value) => sum + parseInt(value.powerstats.combat) ,0)))
                const combat = $combat.map(dato => dato.reduce((sum, value) => sum + parseInt(value)))
                const statTeam = [
                    { name: "intelligence", value: intelligence.reduce((sum , value) => sum + parseInt(value), 0) },
                    { name: "strength", value: strength.reduce((sum , value) => sum + parseInt(value), 0) },
                    { name: "speed", value: speed.reduce((sum , value) => sum + parseInt(value), 0) },
                    { name: "durability", value: durability.reduce((sum , value) => sum + parseInt(value), 0) },
                    { name: "power", value: power.reduce((sum , value) => sum + parseInt(value), 0) },
                    { name: "combat", value: combat.reduce((sum , value) => sum + parseInt(value), 0) }
                ];
                sendData.push(averageWeightCharacters, averageHeightCharacters, statTeam)
                dispatch({
                    type: 'GET_TEAM_GRAFIC_PIE',
                    payload: sendData
                })
            }
        }
     
    }
    return (
        <HomeContext.Provider value={{
            characterHero: state.characterHero,
            characterVillain: state.characterVillain,
            sendDataGrafic: state.sendDataGrafic,
            getCharactersHero,
            getCharactersVillain,
            getTeamGrafic
        }}>
            {props.children}
        </HomeContext.Provider>
    )
}

export default HomeState


