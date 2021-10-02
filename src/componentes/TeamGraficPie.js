import React, { useContext, useEffect, useState } from 'react'
import HomeContext from '../context/Home/HomeContext';
import GraficPie from './GraficPie';

const TeamGraficPie = () => {
    const { sendDataGrafic } = useContext(HomeContext);

    const [maxStat, setMaxStat] = useState(null);
    const [maxStatName, setMaxStatName] = useState(null);

    useEffect(() => {
        if (sendDataGrafic) {
            const maxStat = Math.max(...sendDataGrafic[2].map(dato => dato.value))
            const maxStatName = sendDataGrafic[2].filter(dato => dato.value === maxStat).map(dato => dato.name);
            setMaxStat(maxStat)
            setMaxStatName(maxStatName)
        }
    }, [sendDataGrafic])
    return (
        <section className="container--stats">
            <h3 className="stats--title">All Stats</h3>
            <div className="container--stats-team">
                <div>
                    <p className="stats--description">
                        Strongest stat of the team: <span>{sendDataGrafic ? maxStatName : null} ({sendDataGrafic ? maxStat : null})</span> <br />
                        Average weight: <span>{sendDataGrafic ? sendDataGrafic[0].reduce((sum, value) => (sum + parseInt(value) / sendDataGrafic[0].length), 0) : null}  Kg </span> <br />
                        Average height: <span>{sendDataGrafic ? sendDataGrafic[1].reduce((sum, value) => (sum + parseInt(value) / sendDataGrafic[1].length) / 100, 0).toFixed(2) : null} Mts </span>
                    </p>
                </div>
                <div className="container--pie">
                    <GraficPie stats={sendDataGrafic ? sendDataGrafic[2] : null} />
                </div>
            </div>
        </section>
    )
}

export default TeamGraficPie;
