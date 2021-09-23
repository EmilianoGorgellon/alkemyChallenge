import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import GraficPie from './GraficPie.js';
const Home = () => {
    const [getHero, setGetHero] = useState();
    const [statsHeroes, setStatsHeroes] = useState(0);
    const [maxStatNameHeroes, setMaxStatNameHero] = useState("");
    const [maxStatHeroes, setMaxStatHero] = useState();
    const [averageWeigthHero, setAverageWeigthHero] = useState();
    const [averageHeigthHero, setAverageHeigthHero] = useState();

    const [getVillain, setGetVillain] = useState();
    const [statsVillains, setStatsVillains] = useState(0);
    const [maxStatNameVillain, setMaxStatNameVillain] = useState();
    const [maxStatVillain, setMaxStatVillain] = useState();
    const [averageWeigthVillain, setAverageWeigthVillain] = useState();
    const [averageHeigthVillain, setAverageHeigthVillain] = useState();

    const [stats, setStats] = useState()
    const [render, setRender] = useState(false)

    const [weightAll, setWeigthAll] = useState();
    const [heightAll, setHeightAll] = useState();
    const [pieAll, setPieAll] = useState();

    const [maxStatAll, setMaxStatAll] = useState()
    const [maxStatNameAll, setMaxStatNameAll] = useState()
    const pieTeam = [];
    const weigthTeam = [];
    const heightTeam = [];
    const getPie = (pieCharacter, typeCharacter) => {
        let intelligence = 0;
        let strength = 0;
        let speed = 0;
        let durability = 0;
        let power = 0;
        let combat = 0;
        let height = 0;
        let weight = 0;
        for (let i of pieCharacter) {
            i.map(dato => {
                intelligence = intelligence + parseInt(dato.powerstats.intelligence)
                strength = strength + parseInt(dato.powerstats.strength)
                speed = speed + parseInt(dato.powerstats.speed)
                durability = durability + parseInt(dato.powerstats.durability)
                power = power + parseInt(dato.powerstats.power)
                combat = combat + parseInt(dato.powerstats.combat)
            })
            height = height + parseInt(i.map(dato => dato.appearance.height[1]))
            weight = weight + parseInt(i.map(dato => dato.appearance.weight[1]))
        }
        const statsCharacter = [
            { name: "intelligence", value: intelligence },
            { name: "strength", value: strength },
            { name: "speed", value: speed },
            { name: "durability", value: durability },
            { name: "power", value: power },
            { name: "combat", value: combat }
        ]
        const maxStat = Math.max(...statsCharacter.map(dato => dato.value))
        const maxStatName = statsCharacter.filter(dato => dato.value === maxStat).map(dato => dato.name);
        if (typeCharacter === "heroesId") {
            setStatsHeroes(statsCharacter);
            setMaxStatNameHero(maxStatName);
            setMaxStatHero(maxStat);
            setAverageHeigthHero(height);
            setAverageWeigthHero(weight);

        } else if (typeCharacter === "villainId") {
            setStatsVillains(statsCharacter);
            setMaxStatNameVillain(maxStatName);
            setMaxStatVillain(maxStat);
            setAverageHeigthVillain(height);
            setAverageWeigthVillain(weight);

        }

        weigthTeam.push(weight);
        heightTeam.push(height);
        pieTeam.push(statsCharacter);
        setHeightAll(heightTeam);
        setWeigthAll(weigthTeam);

        if (pieTeam.length === 2) {
            let intelligenceTeam = 0;
            let strengthTeam = 0;
            let speedTeam = 0;
            let durabilityTeam = 0;
            let powerTeam = 0;
            let combatTeam = 0;
            for (let i of pieTeam) {
                intelligenceTeam = intelligenceTeam + parseInt(i.filter(dato => dato.name === "intelligence").map(dato => dato.value))
                strengthTeam = strengthTeam + parseInt(i.filter(dato => dato.name === "strength").map(dato => dato.value))
                speedTeam = speedTeam + parseInt(i.filter(dato => dato.name === "speed").map(dato => dato.value))
                durabilityTeam = durabilityTeam + parseInt(i.filter(dato => dato.name === "durability").map(dato => dato.value))
                powerTeam = powerTeam + parseInt(i.filter(dato => dato.name === "power").map(dato => dato.value))
                combatTeam = combatTeam + parseInt(i.filter(dato => dato.name === "combat").map(dato => dato.value))
            }
            const statsPie = [
                { name: "intelligence", value: intelligenceTeam },
                { name: "strength", value: strengthTeam },
                { name: "speed", value: speedTeam },
                { name: "durability", value: durabilityTeam },
                { name: "power", value: powerTeam },
                { name: "combat", value: combatTeam }
            ]
            const $maxStatAll = Math.max(...statsPie.map(dato => dato.value))
            const $maxStatNameAll = statsPie.filter(dato => dato.value === $maxStatAll).map(dato => dato.name)
            setMaxStatAll($maxStatAll);
            setMaxStatNameAll($maxStatNameAll);
            setPieAll(statsPie);
        }
    }
    useEffect(() => {
        const $getHero = localStorage.getItem("heroesId");
        const $getVillain = localStorage.getItem("villainId")
        const parseHero = JSON.parse($getHero)
        const parseVillain = JSON.parse($getVillain)
        if ($getHero !== null) {
            const reparseHero = parseHero.map(dato => JSON.parse(dato))
            setGetHero(reparseHero)
            getPie(reparseHero, "heroesId")
        } else {
            setGetHero(undefined)
        }
        if ($getVillain !== null) {
            const reparseVillain = parseVillain.map(dato => JSON.parse(dato))
            setGetVillain(reparseVillain)
            getPie(reparseVillain, "villainId")
        } else {
            setGetVillain(undefined)
        }
    }, [render])

    const mouseEnter = (e) => {
        const showPieOnMouse = (getTypeCharacter, dataId) => {
            for (let parseHero of getTypeCharacter) {
                for (let dato of parseHero) {
                    if (Number(dato.id) === dataId) {
                        const dataStats = [
                            { name: "intelligence", value: parseInt(dato.powerstats.intelligence) },
                            { name: "strength", value: parseInt(dato.powerstats.strength) },
                            { name: "speed", value: parseInt(dato.powerstats.speed) },
                            { name: "durability", value: parseInt(dato.powerstats.durability) },
                            { name: "power", value: parseInt(dato.powerstats.power) },
                            { name: "combat", value: parseInt(dato.powerstats.combat) }
                        ];
                        setStats(dataStats)
                        break;
                    }
                }
            }
        }
        const card = e.target.closest(".container--characters");
        const typeCharacter = card.querySelector(".card--home").attributes.typecharacter.textContent;
        const dataId = Number(card.querySelector(".card--home").attributes.dataid.textContent);
        typeCharacter === "hero" ? showPieOnMouse(getHero, dataId) : showPieOnMouse(getVillain, dataId)
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
        render ? setRender(false) : setRender(true)
        const typeCharacter = e.target.attributes.datacharacter.textContent;
        const getId = Number(e.target.attributes.dataid.textContent);
        const getAllStorageCharacters = localStorage.getItem(typeCharacter);
        const parseCharacter = JSON.parse(getAllStorageCharacters);
        if (parseCharacter.length > 1) {
            const reparseCharacters = parseCharacter.map(dato => JSON.parse(dato));
            const arrayCharactersLocal = [];
            for (let i of reparseCharacters) {
                const sendCharacter = i.filter(dato => Number(dato.id) !== getId).map(dato => dato);
                if (sendCharacter.length !== 0) {
                    const stringSendCharacter = JSON.stringify(sendCharacter);
                    arrayCharactersLocal.push(stringSendCharacter);
                }
            }
            if (arrayCharactersLocal.length === 0) {
                localStorage.removeItem(typeCharacter);
            } else {
                const sendCharacterLocal = JSON.stringify(arrayCharactersLocal);
                localStorage.setItem(typeCharacter, sendCharacterLocal);
                // const parseArrayCharactersLocal = arrayCharactersLocal.map(dato => JSON.parse(dato))
                // typeCharacter === "heroesId" ? setGetHero(parseArrayCharactersLocal) : setGetVillain(parseArrayCharactersLocal)
            }
        } else {
            localStorage.removeItem(typeCharacter);
        }
    }

    return (
        <>
            <Fade bottom>
                <main className="main--home">

                    {getHero === undefined ?
                        <h1 className="container--team-title">There aren´t heroes in the team</h1>
                        :
                        <div className="container--team">
                            <h1 className="container--team-title ">Hero team</h1>
                            <div className="container--team-cards">
                                {getHero.map(($dato, i) =>
                                    <section key={i} className="container--characters" >
                                        <div className="container--card"  >
                                            {$dato.map((dato, i) =>
                                                <section className="card--home" key={i} typecharacter="hero" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} dataid={dato.id}>
                                                    <div>
                                                        <h2 className="character--title" >{dato.name}</h2>
                                                        <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                                                    </div>
                                                    <div className="container--character-button" >
                                                        <button className="character--button"><Link className="character--link" to={`/${dato.id}`}>More details</Link></button>
                                                        <button className="character--button" onClick={removeCharacter} datacharacter="heroesId" dataid={dato.id} >Remove Character</button>
                                                    </div>
                                                    <div className="container--only-pie no-show">
                                                        <GraficPie stats={stats} />
                                                    </div>
                                                </section>
                                            )}
                                        </div>
                                    </section>
                                )}
                                <h3 className="stats--title">Stats Heroes</h3>
                                <div className="container--stats">
                                    <div>
                                        <p className="stats--description">
                                            Strongest stat of the team: <span>{maxStatNameHeroes} ({maxStatHeroes})</span> <br />
                                            Average weight: <span>{averageWeigthHero} Kg </span> <br />
                                            Average height: <span>{averageHeigthHero / 100} Mts </span>
                                        </p>
                                    </div>
                                    <div className="container--pie">
                                        <GraficPie stats={statsHeroes} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {getVillain === undefined ?
                        <h1 className="container--team-title">There aren´t villains in the team</h1>
                        :
                        <div className="container--team">
                            <h1 className="container--team-title ">Villain team</h1>
                            <div className="container--team-cards">
                                {getVillain.map(($dato, i) =>
                                    <section key={i} className="container--characters" >
                                        <div className="container--card"  >
                                            {$dato.map((dato, i) =>
                                                <section className="card--home" key={i} onMouseEnter={mouseEnter} typecharacter="villain" onMouseLeave={mouseLeave} dataid={dato.id}>
                                                    <div>
                                                        <h2 className="character--title" >{dato.name}</h2>
                                                        <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                                                    </div>
                                                    <div className="container--character-button" >
                                                        <button className="character--button"><Link className="character--link" to={`/${dato.id}`}>More details</Link></button>
                                                        <button className="character--button" onClick={removeCharacter} datacharacter="villainId" dataid={dato.id} >Remove Character</button>
                                                    </div>
                                                    <div className="container--only-pie no-show">
                                                        <GraficPie stats={stats} />
                                                    </div>
                                                </section>
                                            )}
                                        </div>
                                    </section>
                                )}
                                <h3 className="stats--title">Stats Villain</h3>
                                <div className="container--stats">
                                    <div>
                                        <p className="stats--description">
                                            Strongest stat of the team: <span>{maxStatNameVillain} ({maxStatVillain})</span> <br />
                                            Average weight: <span>{averageWeigthVillain} Kg </span> <br />
                                            Average height: <span>{averageHeigthVillain / 100} Mts </span>
                                        </p>
                                    </div>
                                    <div className="container--pie">
                                        <GraficPie stats={statsVillains} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {getHero === undefined || getVillain === undefined ? null :
                        <div className="container--team">
                            <h1 className="container--team-title ">All team</h1>
                            <div className="container--team-cards">
                                {getHero.map(($dato, i) =>
                                    <section key={i} className="container--characters" >
                                        <div className="container--card"  >
                                            {$dato.map((dato, i) =>
                                                <section className="card--home" key={i} typecharacter="hero" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} dataid={dato.id}>
                                                    <div>
                                                        <h2 className="character--title" >{dato.name}</h2>
                                                        <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                                                    </div>
                                                    <div className="container--character-button" >
                                                        <button className="character--button"><Link className="character--link" to={`/${dato.id}`}>More details</Link></button>
                                                        <button className="character--button" onClick={removeCharacter} datacharacter="heroesId" dataid={dato.id} >Remove Character</button>
                                                    </div>
                                                    <div className="container--only-pie no-show">
                                                        <GraficPie stats={stats} />
                                                    </div>
                                                </section>
                                            )}
                                        </div>
                                    </section>
                                )}
                                {getVillain.map(($dato, i) =>
                                    <section key={i} className="container--characters" >
                                        <div className="container--card"  >
                                            {$dato.map((dato, i) =>
                                                <section className="card--home" key={i} onMouseEnter={mouseEnter} typecharacter="villain" onMouseLeave={mouseLeave} dataid={dato.id}>
                                                    <div>
                                                        <h2 className="character--title" >{dato.name}</h2>
                                                        <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                                                    </div>
                                                    <div className="container--character-button" >
                                                        <button className="character--button"><Link className="character--link" to={`/${dato.id}`}>More details</Link></button>
                                                        <button className="character--button" onClick={removeCharacter} datacharacter="villainId" dataid={dato.id} >Remove Character</button>
                                                    </div>
                                                    <div className="container--only-pie no-show">
                                                        <GraficPie stats={stats} />
                                                    </div>
                                                </section>
                                            )}
                                        </div>
                                    </section>
                                )}
                                <h3 className="stats--title">All stats</h3>
                                <div className="container--stats">
                                    <div>
                                        <p className="stats--description">
                                            Strongest stat of the team: <span>{maxStatNameAll} ({maxStatAll})</span> <br />
                                            Average weight: <span>{weightAll.reduce((a, b) => a + b, 0)} Kg </span> <br />
                                            Average height: <span>{(heightAll.reduce((a, b) => a + b, 0) / 100)} Mts </span>
                                        </p>
                                    </div>
                                    <div className="container--pie">
                                        <GraficPie stats={pieAll} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </main>
            </Fade>
        </>
    )
}
export default Home;