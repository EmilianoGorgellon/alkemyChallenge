import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const Heroes = (props) => {
    const params = useParams();
    const [datosJson, setDatosJson] = useState([]);
    const [showMsjAddCharacter, setShowMsjAddCharacter] = useState(false)
    const [msjAddCharacter, setMsjAddCharacter] = useState(false)
    const token = localStorage.getItem("login");
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://www.superheroapi.com/api.php/${token}/search/${params.name}`)
            let datos = await response.json()
            return setDatosJson(datos)
        }
        getData()
    }, [params.name])

    const setData = (e) => {
        const dataId = e.target.attributes.dataid;
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
            {datosJson.response === "success" ? datosJson.results.map((dato, i) =>
                <div key={i} className={`container--character-heroesId`}>
                    <h2 className="character--title">{dato.name}</h2>
                    <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                    <div className="container--character-button">
                        <button className="character--button"><Link className="character--link" to={`/${dato.id}`}>More details</Link></button>
                        <button className="character--button" onClick={setData} dataid={dato.id} dataalignment={dato.biography.alignment}>Add to team</button>
                    </div>
                </div>
            ) : <h1 className="main--title">No hero or villain found</h1>}
        </div>
    )
}
export default Heroes;