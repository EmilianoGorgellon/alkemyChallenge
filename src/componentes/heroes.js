import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const Heroes = (props) => {
    const parametros = useParams();
    const [datosJson, setDatosJson] = useState([]);
    const token = localStorage.getItem("login");
    useEffect(() => {
        const obtenerDatos = async () => {
            const response = await fetch(`https://www.superheroapi.com/api.php/${token}/search/${parametros.name}`)
            let datos = await response.json()
            return setDatosJson(datos)
        }
        obtenerDatos()
    }, [parametros.name])

    const setData = (e) => {
        const Agregarheroe = (alignment) => {
            if (localStorage.getItem(`${alignment}`) !== null) {
                const obtengoHeroes = localStorage.getItem(`${alignment}`)
                const parseoHeroes = JSON.parse(obtengoHeroes);

                const arrayAllHeroes = parseoHeroes.map(dato => JSON.parse(dato))

                for (let data of arrayAllHeroes) {
                    const id = data.map(dato => dato.id.includes(contentDataId))
                    if (id[0] === true) {
                        repeatId = true;
                        break
                    }
                }
                parseoHeroes.map(dato => arrayHeroes.push(dato))
                if (repeatId === false && arrayHeroes.length < 3) {
                    const datosHeroe = datosJson.results.filter(dato => dato.id === contentDataId).map(dato => dato);

                    const stringHero = JSON.stringify(datosHeroe);

                    arrayHeroes.push(stringHero)

                    const sendHero = JSON.stringify(arrayHeroes);

                    localStorage.setItem(`${alignment}`, sendHero)
                }
            } else {
                const datosHeroe = datosJson.results.filter(dato => dato.id === contentDataId).map(dato => dato)
                let stringHero = JSON.stringify(datosHeroe)
                arrayHeroes.push(stringHero)
                const mandarLocal = JSON.stringify(arrayHeroes)
                localStorage.setItem(`${alignment}`, mandarLocal)
            }
        }
        const dataId = e.target.attributes.dataid;
        const contentDataId = dataId.textContent;
        const contentAlignment = e.target.attributes.dataalignment.textContent;
        const arrayHeroes = [];
        let repeatId = false;
        if (contentAlignment === "good") {
            Agregarheroe("heroesId")
        } else {
            Agregarheroe("villainId")
        }
    }
    return (
        <div className="container--search">
            {datosJson.response === "success" ? datosJson.results.map((dato, i) =>
                <div key={i} className={`container--character-heroesId`}>
                    <h2 className="character--title">{dato.name}</h2>
                    <img className="character--img" src={dato.image.url} alt={`pic-${dato.name}`} />
                    <div className="container--character-button">
                        <button className="character--button"><Link className="character--link" to={`/${dato.id}`}>More details</Link></button>
                        <button className="character--button" onClick={setData} dataid={dato.id} dataalignment={dato.biography.alignment}>Add to team</button>
                    </div>
                </div>
            ) : console.log("no exito")}
        </div>
    )
}
export default Heroes;