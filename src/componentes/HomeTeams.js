import React, { useState, useEffect, useContext } from 'react'
import GraficPie from './GraficPie';
import { Link } from 'react-router-dom';
import HomeContext from '../context/Home/HomeContext';

function HomeTeams(props) {
    const { getCharactersHero, getCharactersVillain, getTeamGrafic, characterHero, characterVillain } = useContext(HomeContext);
    const bothCharacters = props.bothCharacters;
    const titleGrafic = props.titleGrafic;
    const typeCharacters = props.typeCharacters;
    const getCharacter = typeCharacters === "heroesId" ? characterHero : characterVillain   
    const [stats, setStats] = useState()
    const [statsTeamCharacters, setStatsTeamCharacters] = useState(0);
    const [maxStatNameCharacters, setMaxStatNameCharacters] = useState("");
    const [maxStatCharacters, setMaxStatCharacters] = useState(0);
    const [averageWeigthCharacters, setAverageWeigthCharacters] = useState(0);
    const [averageHeigthCharacters, setAverageHeigthCharacters] = useState(0);

    useEffect(() => {
        const intelligence = getCharacter.reduce((sum, value) => sum + parseInt(value.map(dato => dato.powerstats.intelligence)), 0)
        const strength = getCharacter.reduce((sum, value) => sum + parseInt(value.map(dato => dato.powerstats.strength)), 0)
        const speed = getCharacter.reduce((sum, value) => sum + parseInt(value.map(dato => dato.powerstats.speed)), 0)
        const durability = getCharacter.reduce((sum, value) => sum + parseInt(value.map(dato => dato.powerstats.durability)), 0)
        const power = getCharacter.reduce((sum, value) => sum + parseInt(value.map(dato => dato.powerstats.power)), 0)
        const combat = getCharacter.reduce((sum, value) => sum + parseInt(value.map(dato => dato.powerstats.combat)), 0)
        const height = getCharacter.reduce((sum, value) => (sum + parseInt(value.map(dato => dato.appearance.height[1])) / getCharacter.length), 0)
        const weight = getCharacter.reduce((sum, value) => (sum + parseInt(value.map(dato => dato.appearance.weight[1])) / getCharacter.length), 0)
        const statsTeam = [
            { name: "intelligence", value: intelligence },
            { name: "strength", value: strength },
            { name: "speed", value: speed },
            { name: "durability", value: durability },
            { name: "power", value: power },
            { name: "combat", value: combat }
        ];
        const maxStat = Math.max(...statsTeam.map(dato => dato.value))
        const maxStatName = statsTeam.filter(dato => dato.value === maxStat).map(dato => dato.name);
        setStatsTeamCharacters(statsTeam);
        setMaxStatNameCharacters(maxStatName);
        setMaxStatCharacters(maxStat);
        setAverageWeigthCharacters(weight);
        setAverageHeigthCharacters(height);
    }, [getCharacter])

    useEffect(() => {
      
        getTeamGrafic(getCharacter, bothCharacters)   // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [bothCharacters, getCharacter])
    
    const showPieOnMouse = (getCharacter, dataId) => {
        for (let dataCharacter of getCharacter) {
            for (let data of dataCharacter) {
                if (Number(data.id) === Number(dataId)) {
                    const dataStats = [
                        { name: "intelligence", value: parseInt(data.powerstats.intelligence) },
                        { name: "strength", value: parseInt(data.powerstats.strength) },
                        { name: "speed", value: parseInt(data.powerstats.speed) },
                        { name: "durability", value: parseInt(data.powerstats.durability) },
                        { name: "power", value: parseInt(data.powerstats.power) },
                        { name: "combat", value: parseInt(data.powerstats.combat) }
                    ];
                    setStats(dataStats);
                    break;
                }
            }
        }
    }
    const mouseEnter = (e) => {
        const card = e.target.closest(".container--characters");
        const dataId = Number(card.querySelector(".card--home").attributes.dataid.textContent);
        showPieOnMouse(getCharacter, dataId)
        card.querySelector(".character--img").classList.add('no-show');
        card.querySelector(".container--only-pie").classList.add('show');
        card.querySelector(".container--only-pie").classList.remove('no-show');
    }

    const mouseLeave = (e) => {
        const card = e.target.closest(".container--characters");
        card.querySelector(".character--img").classList.remove('no-show');
        card.querySelector(".container--only-pie").classList.replace('show', 'no-show');
    }

    const removeCharacter = (e) => {
        const getId = Number(e.target.attributes.dataId.textContent);
        const $getStorageCharacters = localStorage.getItem(typeCharacters);
        const getStorageCharacters = JSON.parse($getStorageCharacters);
        if (getStorageCharacters.length > 1) {
            const reparseGetStorageCharacter = getStorageCharacters.map(dato => JSON.parse(dato));
            const $arrayCharactersLocal = [];
            const setArrayCharacters = [];
            for (let data of reparseGetStorageCharacter) {
                const sendCharacters = data.filter(dato => Number(dato.id) !== getId).map(dato => dato);
                if (sendCharacters.length !== 0) {
                    setArrayCharacters.push(sendCharacters)
                    $arrayCharactersLocal.push(JSON.stringify(sendCharacters));
                }
            }
            const arrayCharactersLocal = JSON.stringify($arrayCharactersLocal);
            localStorage.setItem(typeCharacters, arrayCharactersLocal);
            getCharactersHero()
            getCharactersVillain()
        } else {
            localStorage.removeItem(typeCharacters);
            typeCharacters === "heroesId" ? getCharactersHero() : getCharactersVillain()
        }
    }
    return (
        <>
            {getCharacter.map(($dato, i) =>
                <section key={i} className="container--characters" >
                    <div className="container--card"  >
                        {$dato.map((dato, i) =>
                            <section className="card--home" key={i} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} dataid={dato.id}>
                                <div>
                                    <h2 className="character--title" >{dato.name}</h2>
                                    <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                                </div>
                                <div className="container--character-button" >
                                    <Link className="character--link" to={`/${dato.id}`}>More <br /> details</Link>
                                    <button className="character--button" onClick={removeCharacter} dataid={dato.id} >Remove <br /> character</button>
                                </div>
                                <div className="container--only-pie no-show">
                                    <GraficPie stats={stats} />
                                </div>
                            </section>
                        )}
                    </div>
                </section>
            )}
            {bothCharacters ? null :
                <section className="container--stats">
                    <h3 className="stats--title">{titleGrafic} </h3>
                    <div className="container--stats-team">
                        <div>
                            <p className="stats--description">
                                Strongest stat of the team: <span>{maxStatNameCharacters} ({maxStatCharacters})</span> <br />
                                Average weight: <span>{(averageWeigthCharacters).toFixed(2)} Kg </span> <br />
                                Average height: <span>{(averageHeigthCharacters / 100).toFixed(2)} Mts </span>
                            </p>
                        </div>
                        <div className="container--pie">
                            <GraficPie stats={statsTeamCharacters} />
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default HomeTeams
