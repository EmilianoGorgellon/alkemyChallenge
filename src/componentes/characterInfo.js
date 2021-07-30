import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios"
const CharacterInfo = (props) => {
    const parametros = useParams();
    const [datosJson, setDatosJson] = useState([]);
    const [image, setImage] = useState([]);
    const [appearance, setAppareance] = useState([]);
    const [weight, setWeight] = useState([]);
    const [height, setHeight] = useState([]);
    const [name, setName] = useState([]);
    const [alias, setAlias] = useState([]);
    const [workplace, setWorkPlace] = useState([]);
    const token = localStorage.getItem("login");
    useEffect(() => {
        const obtenerDatos = async () => {
            const response = await axios.get(`https://www.superheroapi.com/api.php/${token}/${parametros.id}`)
            let datos = await response.data;
            setImage(datos.image.url)
            setAppareance(datos.appearance)
            setWeight(datos.appearance.weight)
            setHeight(datos.appearance.height)
            setName(datos.biography)
            setAlias(datos.biography.aliases)
            setWorkPlace(datos.work.base)
            return setDatosJson(datos)
        }
        obtenerDatos()
    }, [])

    return (
        <div className="container--info">
            <section className="container--card-info">

                <div className="container--img-description">
                    <img className="card--info-img" src={image} alt={`pic-${datosJson.name}`} />
                    <div className="container--description">
                        <h2 className="card--info-title">{datosJson.name}</h2>
                        <p className="card-description">
                            Weight :<span className="content-description"> {weight[1]} </span> <br />
                            Height : <span className="content-description"> {height[1]} </span> <br />
                            Name :<span className="content-description"> {name["full-name"]} </span> <br />
                            Alias: <span className="content-description"> {alias.join(", ")} </span> <br />
                            Hair color:<span className="content-description"> {appearance["hair-color"]} </span><br />
                            Eye Color: <span className="content-description"> {appearance["eye-color"]} </span> <br />
                            Workplace: <span className="content-description"> {workplace} </span>
                        </p>
                    </div>

                </div>
            </section>
        </div>
    )
}
export default CharacterInfo;