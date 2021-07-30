import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Tooltip } from 'recharts';
const Home = () => {
    let dataHero;
    let reparseHeroId;
    let dataVillain;
    let reparseVillainId;
    let alldata = [];
    let alldataPie;
    const heigthAll = [];
    const weightAll = [];
    const heightHero = [];
    const weightHero = [];
    const heightVillain = [];
    const weightVillain = [];
    const maxStatHero = [];
    const maxStatVillain = [];
    const maxStatAll = [];
    const getCharacter = (character) => {
        if (character === "heroesId") {
            const getHeroId = localStorage.getItem(character);
            const parseHeroId = JSON.parse(getHeroId);
            reparseHeroId = parseHeroId.map(dato => JSON.parse(dato))
            graficPie("dataHero", reparseHeroId)
        } else {
            const getVillainId = localStorage.getItem(character);
            const parseVillainId = JSON.parse(getVillainId);
            reparseVillainId = parseVillainId.map(dato => JSON.parse(dato))
            graficPie("dataVillain", reparseVillainId)
        }
    }
    const graficPie = (nameData, reparseCharacters) => {
        let intelligence = 0;
        let strength = 0;
        let speed = 0;
        let durability = 0;
        let power = 0;
        let combat = 0;
        if (nameData === "dataHero" || nameData === "dataVillain") {
            for (let i of reparseCharacters) {
                intelligence = (intelligence + parseInt(i.map(dato => dato.powerstats.intelligence)));
                strength = (strength + parseInt(i.map(dato => dato.powerstats.strength)));
                speed = (speed + parseInt(i.map(dato => dato.powerstats.speed)));
                durability = (durability + parseInt(i.map(dato => dato.powerstats.durability)));
                power = (power + parseInt(i.map(dato => dato.powerstats.power)));
                combat = (combat + parseInt(i.map(dato => dato.powerstats.combat)));
                heigthAll.push(i.map(dato => parseInt(dato.appearance.height[1])))
                weightAll.push(i.map(dato => parseInt(dato.appearance.weight[1])))
                if (nameData === "dataHero") {
                    heightHero.push(i.map(dato => parseInt(dato.appearance.height[1])))
                    weightHero.push(i.map(dato => parseInt(dato.appearance.weight[1])))
                } else {
                    heightVillain.push(i.map(dato => parseInt(dato.appearance.height[1])))
                    weightVillain.push(i.map(dato => parseInt(dato.appearance.weight[1])))
                }
            }
        } else {
            for (let i of alldata) {
                intelligence = intelligence + parseInt(i.filter(dato => dato.name === "intelligence").map(dato => dato.value))
                strength = strength + parseInt(i.filter(dato => dato.name === "strength").map(dato => dato.value))
                speed = speed + parseInt(i.filter(dato => dato.name === "speed").map(dato => dato.value))
                durability = durability + parseInt(i.filter(dato => dato.name === "durability").map(dato => dato.value))
                power = power + parseInt(i.filter(dato => dato.name === "power").map(dato => dato.value))
                combat = combat + parseInt(i.filter(dato => dato.name === "combat").map(dato => dato.value))
            }
        }

        if (nameData === "dataHero") {
            dataHero = [
                { name: "intelligence", value: intelligence },
                { name: "strength", value: strength },
                { name: "speed", value: speed },
                { name: "durability", value: durability },
                { name: "power", value: power },
                { name: "combat", value: combat }
            ]
            const maxStat = Math.max(...dataHero.map(dato => dato.value))
            maxStatHero.push(dataHero.filter(dato => dato.value === maxStat).map(dato => dato.name))
        } else if (nameData === "dataVillain") {
            dataVillain = [
                { name: "intelligence", value: intelligence },
                { name: "strength", value: strength },
                { name: "speed", value: speed },
                { name: "durability", value: durability },
                { name: "power", value: power },
                { name: "combat", value: combat }
            ]
            const maxStat = Math.max(...dataVillain.map(dato => dato.value))
            maxStatVillain.push(dataVillain.filter(dato => dato.value === maxStat).map(dato => dato.name))
        } else {
            alldataPie = [
                { name: "intelligence", value: intelligence },
                { name: "strength", value: strength },
                { name: "speed", value: speed },
                { name: "durability", value: durability },
                { name: "power", value: power },
                { name: "combat", value: combat }
            ]
            const maxStat = Math.max(...alldataPie.map(dato => dato.value))
            maxStatAll.push(alldataPie.filter(dato => dato.value === maxStat).map(dato => dato.name))
        }
    }
    const removeCharacter = (e) => {
        const getStorageKey = e.target.attributes.datastorage.textContent;
        e.target.closest(`.container--character-${getStorageKey}`).remove();
        let getId = e.target.attributes.dataid.textContent;
        const getAllStorageItems = localStorage.getItem(getStorageKey);
        const parseAllStorageItems = JSON.parse(getAllStorageItems)
        const reparseAllStorageItems = parseAllStorageItems.map(dato => JSON.parse(dato))
        const ArrayCharacters = []
        for (let i of reparseAllStorageItems) {
            const sendCharacter = i.filter(dato => dato.id !== getId).map(dato => dato)
            if (sendCharacter.length !== 0) {
                const stringSendCharacter = JSON.stringify(sendCharacter);
                ArrayCharacters.push(stringSendCharacter)
            }
        }
        const sendCharacterLocal = JSON.stringify(ArrayCharacters)
        localStorage.setItem(getStorageKey, sendCharacterLocal)
    }

    localStorage.getItem("heroesId") !== null && localStorage.getItem("heroesId").length !== 2 ? getCharacter("heroesId") : localStorage.removeItem("heroesId");
    localStorage.getItem("villainId") !== null && localStorage.getItem("villainId").length !== 2 ? getCharacter("villainId") : localStorage.removeItem("villainId");
    if (localStorage.getItem("heroesId") !== null && localStorage.getItem("villainId") !== null) {
        alldata.push(dataHero)
        alldata.push(dataVillain)
        graficPie("alldataPie", alldata)
    }
    return (
        <main className="main">
            {localStorage.getItem("heroesId") !== null && localStorage.getItem("heroesId").length !== 2 ?
                <section className="container--all-cards-graphic">
                    <h1 className="main--title">Hero team</h1>
                    <div className="container--card--graphic">
                        <div className="container--cards">
                            {reparseHeroId.map((datos, i) =>
                                <div key={i}>
                                    {datos.map((dato, i) =>
                                        <section className="container--character-heroesId" key={i} >
                                            <h2 className="character--title">{dato.name}</h2>
                                            <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                                            <div className="container--character-button">
                                                <button className="character--button"><Link className="character--link" to={`/${dato.id}`}>More details</Link></button>
                                                <button className="character--button" onClick={removeCharacter} datastorage="heroesId" dataid={dato.id}>Remove Hero</button>
                                            </div>
                                        </section>)}
                                </div>
                            )}
                        </div>
                        <div className="container--grafic-pie">
                            <h2 className="title-stats">Stats heroes</h2>
                            <div className="container--team-stats">
                                <p className="team--stats-text">
                                    Strongest stat of the team:<span> {maxStatHero} </span> <br/>
                                    Average weight: <span>{(weightHero.map(dato => parseInt(dato)).reduce((acc, weight) => acc + weight, 0) / weightHero.length).toFixed(2)} Kg </span> <br />
                                    Average height: <span>{(heightHero.map(dato => parseInt(dato)).reduce((acc, height ) => acc + height, 0) / heightHero.length).toFixed(2)} Cm </span>
                                </p>
                            
                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={dataHero}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                            </div>
                        </div>
                    </div>
                </section>
                : <h1 className="main--title">There isn´t team of Heroes</h1>}


            {localStorage.getItem("villainId") !== null && localStorage.getItem("villainId").length !== 2 ?
                <section className="container--all-cards-graphic">
                    <h1 className="main--title">Villain team</h1>
                    <div className="container--card--graphic">
                        <div className="container--cards">
                            {reparseVillainId.map((datos, i) =>
                                <div key={i}  >
                                    {datos.map((dato, i) =>
                                        <section className="container--character-villainId" key={i} >
                                            <h2 className="character--title">{dato.name}</h2>
                                            <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                                            <div className="container--character-button">
                                                <button className="character--button"><Link className="character--link" to={`/${dato.id}`}>More details</Link></button>
                                                <button className="character--button" onClick={removeCharacter} datastorage="villainId" dataid={dato.id}>Remove Villain</button>
                                            </div>
                                        </section>)}
                                </div>

                            )}
                        </div>
                        <div className="container--grafic-pie">
                            <h2 className="title-stats">Stats Villains</h2>
                            <div className="container--team-stats">
                                <p className="team--stats-text">
                                    Strongest stat of the team:<span> {maxStatVillain} </span> <br/>
                                    Average weight: <span>{(weightVillain.map(dato => parseInt(dato)).reduce((acc, weight) => acc + weight, 0) / weightVillain.length).toFixed(2)} Kg </span> <br />
                                    Average height: <span>{(heightVillain.map(dato => parseInt(dato)).reduce((acc, height ) => acc + height, 0) / heightVillain.length).toFixed(2)} Cm </span>
                                </p>
                            
                            <PieChart width={400} height={400}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={dataVillain}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                />
                                <Tooltip />
                            </PieChart>
                            </div>
                        </div>
                    </div>
                </section>
                : <h1 className="main--title">There isn´t team of villains</h1>}
            {localStorage.getItem("heroesId") !== null && localStorage.getItem("villainId") !== null ?
                <>
                    <section className="container--total">
                        <h2 className="title-stats">Team All Stats</h2>
                        <div className="container--team-stats">
                            <p className="team--stats-text">
                                Strongest stat of the team:<span> {maxStatAll} </span> <br/>
                                Average weight: <span>{(weightAll.map(dato => parseInt(dato)).reduce((acc, weight) => acc + weight, 0) / weightAll.length).toFixed(2)} Kg </span> <br />
                                Average height: <span>{(heigthAll.map(dato => parseInt(dato)).reduce((acc, height ) => acc + height, 0) / heigthAll.length).toFixed(2)} Cm </span>
                            </p>      
                       
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={alldataPie}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                        </div>
                    </section>
                </>
                : <h1 className="main--title">There aren´t team of hero or villain</h1>}
        </main>
    )
}
export default Home;