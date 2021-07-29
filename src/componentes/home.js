import { Link } from 'react-router-dom';
import { PieChart, Pie, Tooltip } from 'recharts';
const Home = () => {
    let reparseHeroId;
    let dataHero;
    if (localStorage.getItem("heroesId") !== null && localStorage.getItem("heroesId").length !== 2) {
        const getHeroId = localStorage.getItem("heroesId");
        const parseHeroId = JSON.parse(getHeroId);
        reparseHeroId = parseHeroId.map(dato => JSON.parse(dato))
        let intelligenceHero = 0;
        let strengthHero = 0;
        let speedHero = 0;
        let durabilityHero = 0;
        let powerHero = 0;
        let combatHero = 0;
        for (let i of reparseHeroId) {
            intelligenceHero = (intelligenceHero + parseInt(i.map(dato => dato.powerstats.intelligence)));
            strengthHero = (strengthHero + parseInt(i.map(dato => dato.powerstats.strength)));
            speedHero = (speedHero + parseInt(i.map(dato => dato.powerstats.speed)));
            durabilityHero = (durabilityHero + parseInt(i.map(dato => dato.powerstats.durability)));
            powerHero = (powerHero + parseInt(i.map(dato => dato.powerstats.power)));
            combatHero = (combatHero + parseInt(i.map(dato => dato.powerstats.combat)));
        }
        dataHero = [
            { name: "intelligence", value: intelligenceHero },
            { name: "strength", value: strengthHero },
            { name: "speed", value: speedHero },
            { name: "durability", value: durabilityHero },
            { name: "power", value: powerHero },
            { name: "combat", value: combatHero }
        ]
    } else {
        localStorage.removeItem("heroesId")
    }
    let reparseVillainId;
    let dataVillain;
    if (localStorage.getItem("villainId") !== null && localStorage.getItem("villainId").length !== 2) {
        const getVillainId = localStorage.getItem("villainId")
        const parseVillainId = JSON.parse(getVillainId);
        reparseVillainId = parseVillainId.map(dato => JSON.parse(dato))
        let intelligenceVillain = 0;
        let strengthVillain = 0;
        let speedVillain = 0;
        let durabilityVillain = 0;
        let powerVillain = 0;
        let combatVillain = 0;
        for (let i of reparseVillainId) {
            intelligenceVillain = (intelligenceVillain + parseInt(i.map(dato => dato.powerstats.intelligence)));
            strengthVillain = (strengthVillain + parseInt(i.map(dato => dato.powerstats.strength)));
            speedVillain = (speedVillain + parseInt(i.map(dato => dato.powerstats.speed)));
            durabilityVillain = (durabilityVillain + parseInt(i.map(dato => dato.powerstats.durability)));
            powerVillain = (powerVillain + parseInt(i.map(dato => dato.powerstats.power)));
            combatVillain = (combatVillain + parseInt(i.map(dato => dato.powerstats.combat)));
        }
        dataVillain = [
            { name: "intelligence", value: intelligenceVillain },
            { name: "strength", value: strengthVillain },
            { name: "speed", value: speedVillain },
            { name: "durability", value: durabilityVillain },
            { name: "power", value: powerVillain },
            { name: "combat", value: combatVillain }
        ]
    } else {
        localStorage.removeItem("villainId")
    }
    let alldata = [];
    let alldataPie;
    if (localStorage.getItem("heroesId") !== null && localStorage.getItem("villainId") !== null) {
        alldata.push(dataHero)
        alldata.push(dataVillain)
        let intelligenceTeam = 0;
        let strengthTeam = 0;
        let speedTeam = 0;
        let durabilityTeam = 0;
        let powerTeam = 0;
        let combatTeam = 0;
        for (let i of alldata) {
            intelligenceTeam = intelligenceTeam + parseInt(i.filter(dato => dato.name === "intelligence").map(dato => dato.value))
            strengthTeam = strengthTeam + parseInt(i.filter(dato => dato.name === "strength").map(dato => dato.value))
            speedTeam = speedTeam + parseInt(i.filter(dato => dato.name === "speed").map(dato => dato.value))
            durabilityTeam = durabilityTeam + parseInt(i.filter(dato => dato.name === "durability").map(dato => dato.value))
            powerTeam = powerTeam + parseInt(i.filter(dato => dato.name === "power").map(dato => dato.value))
            combatTeam = combatTeam + parseInt(i.filter(dato => dato.name === "combat").map(dato => dato.value))
        }
        alldataPie = [
            { name: "intelligence", value: intelligenceTeam },
            { name: "strength", value: strengthTeam },
            { name: "speed", value: speedTeam },
            { name: "durability", value: durabilityTeam },
            { name: "power", value: powerTeam },
            { name: "combat", value: combatTeam }
        ]
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

    return (
        <main className="main">


            {localStorage.getItem("heroesId") !== null ?
                <section className="container--all-cards-graphic">
                    <h1 className="main--title">Hero team</h1>
                    <div className="container--card--graphic">
                        <div className="container--cards">
                            {reparseHeroId.map((datos, i) =>
                                <div key={i}  >
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
                            <h2 className="title-pie">Stats heroes</h2>
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
                </section>
                : <h1 className="main--title">No hay equipo en heroes</h1>}


            {localStorage.getItem("villainId") !== null ?
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
                            <h2 className="title-pie">Stats Villains</h2>
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
                </section>
                : <h1 className="main--title">No hay equipo de villanos</h1>}
            {localStorage.getItem("heroesId") !== null && localStorage.getItem("villainId") !== null ?
                <>
                    <section className="container--total">
                        <h2 className="title-pie">Team All Stats</h2>
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
                    </section>
                </>
                : <h1 className="main--title">No hay total porqeu faltan equipos</h1>}
        </main>
    )
}
export default Home;