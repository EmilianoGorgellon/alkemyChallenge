import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import GraficPie from "./GraficPie";
import Fade from 'react-reveal/Fade'
const Heroes = () => {
    const params = useParams();
    const [datosJson, setDatosJson] = useState([]);
    const [showMsjAddCharacter, setShowMsjAddCharacter] = useState(false);
    const [msjAddCharacter, setMsjAddCharacter] = useState(false);
    const token = localStorage.getItem("login");
    const [stats, setStats] = useState();

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`https://www.superheroapi.com/api.php/${token}/search/${params.name}`)
            let datos = await response.data;
            return setDatosJson(datos)
        }
        getData()
    }, [params.name, token])

    const mouseEnter = (e) => {
        const card = e.target.closest(".container--characters");
        const dataId = Number(card.querySelector(".container--card").attributes.dataid.textContent);
        for (let i of datosJson.results) {
            if (Number(i.id) === dataId) {
                let dataStats = [
                    { name: "intelligence", value: parseInt(i.powerstats.intelligence) },
                    { name: "strength", value: parseInt(i.powerstats.strength) },
                    { name: "speed", value: parseInt(i.powerstats.speed) },
                    { name: "durability", value: parseInt(i.powerstats.durability) },
                    { name: "power", value: parseInt(i.powerstats.power) },
                    { name: "combat", value: parseInt(i.powerstats.combat) }
                ];
                setStats(dataStats)
            }
        }
        card.querySelector(".character--img").classList.add('no-show');
        card.querySelector(".container--only-pie").classList.add('show')
        card.querySelector(".container--only-pie").classList.remove('no-show')
    }

    const mouseLeave = (e) => {
        const card = e.target.closest(".container--characters")
        card.querySelector(".character--img").classList.remove('no-show');
        card.querySelector(".container--only-pie").classList.replace('show', 'no-show')
    }

    const setData = (e) => {
        const dataId = e.target.attributes.data;
        const contentDataId = dataId.textContent;
        const contentAlignment = e.target.attributes.dataalignment.textContent;
        const arrayCharacters = [];
        let repeatId = false;
        const addCharacter = (alignment) => {
            if (localStorage.getItem(`${alignment}`) !== null) {
                const getCharacters = localStorage.getItem(`${alignment}`)
                const parseCharacters = JSON.parse(getCharacters);
                const arrayAllHeroes = parseCharacters.map(dato => JSON.parse(dato))
                for (let data of arrayAllHeroes) {
                    const id = data.map(dato => dato.id.includes(contentDataId))
                    if (id[0] === true) {
                        repeatId = true;
                        break
                    }
                }
                parseCharacters.map(dato => arrayCharacters.push(dato))
                if (repeatId === false && arrayCharacters.length < 3) {
                    const datosHeroe = datosJson.results.filter(dato => dato.id === contentDataId).map(dato => dato);
                    const stringHero = JSON.stringify(datosHeroe);
                    arrayCharacters.push(stringHero)
                    const sendHero = JSON.stringify(arrayCharacters);
                    localStorage.setItem(`${alignment}`, sendHero);
                    setTimeout(() => {
                        setShowMsjAddCharacter(false)
                    }, 1500);
                    setShowMsjAddCharacter(true)
                    setMsjAddCharacter(true)
                } else {
                    setTimeout(() => {
                        setShowMsjAddCharacter(false)
                    }, 1500)
                    setShowMsjAddCharacter(true)
                    setMsjAddCharacter(false)
                }
            } else {
                const datosHeroe = datosJson.results.filter(dato => dato.id === contentDataId).map(dato => dato)
                let stringHero = JSON.stringify(datosHeroe)
                arrayCharacters.push(stringHero)
                const mandarLocal = JSON.stringify(arrayCharacters)
                localStorage.setItem(`${alignment}`, mandarLocal)
            }
        }
        if (contentAlignment === "good") {
            addCharacter("heroesId")
        } else {
            addCharacter("villainId")
        }

    }
    return (
        <div className="container--search">
            <div className={showMsjAddCharacter ? "show--msj" : "not--show-msj"}>
                <p className={msjAddCharacter ? "add-character" : "not--add-character"}><FontAwesomeIcon icon={msjAddCharacter ? faCheckCircle : faExclamationCircle} /> {msjAddCharacter ? "Add new Character" : "Error: Max limit same alingment character of 3"} </p>
            </div>
            <Fade right>
                {datosJson.response === "success" ? datosJson.results.map((dato, i) =>
                    <section key={i} className="container--characters">
                        <div className="container--card" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} dataid={dato.id} >
                            <div>
                                <h2 className="character--title" >{dato.name}</h2>
                                <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                            </div>
                            <div className="container--character-button" >
                                <Link className="character--link" to={`/${dato.id}`}>More <br /> details</Link>
                                <button className="character--button" onClick={setData} data={dato.id} dataalignment={dato.biography.alignment}>Add to team</button>
                            </div>
                            <div className="container--only-pie no-show">
                                <GraficPie stats={stats} />
                            </div>
                        </div>
                    </section>
                ) : <h1 className="main--title">No hero or villain found</h1>}
            </Fade>

        </div>
    )
}
export default Heroes;