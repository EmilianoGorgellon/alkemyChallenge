import { React, useEffect, useContext } from 'react';
import Fade from 'react-reveal/Fade';
import HomeTeams from './HomeTeams.js';
import HomeContext from '../context/Home/HomeContext'
import TeamGraficPie from './TeamGraficPie.js'

const Home = () => {
    const { getCharactersHero, getCharactersVillain, characterHero, characterVillain } = useContext(HomeContext)
    
    useEffect(() => {
        getCharactersHero()
        getCharactersVillain()
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])
    
    return (
        <>
            <Fade bottom>
                <main className="main--home">
                    <div className="container--team">
                        <h1 className="container--team-title">Hero Team</h1>
                        <div className="container--team-cards">
                            {characterHero === undefined ?
                                <h1 className="container--team-title">There aren´t heroes in the team</h1>
                                :
                                <HomeTeams getCharacter={characterHero} typeCharacters="heroesId" bothCharacters={false} titleGrafic={"Stats heroes"} />
                            }
                        </div>
                    </div>
                    <div className="container--team">
                        <h1 className="container--team-title">Villain Team</h1>
                        <div className="container--team-cards">
                            {characterVillain === undefined ?
                                <h1 className="container--team-title">There aren´t villains in the team</h1>
                                :
                                <HomeTeams getCharacter={characterVillain} typeCharacters="villainId" bothCharacters={false} titleGrafic={"Stats villain"} />
                            }
                        </div>
                    </div>
                    {characterHero === undefined || characterVillain === undefined ? null :
                        <div className="container--team">
                            <h1 className="container--team-title">All Team</h1>
                            <div className="container--team-cards">
                                <HomeTeams typeCharacters="heroesId" bothCharacters={true} />
                                <HomeTeams typeCharacters="villainId" bothCharacters={true} />
                                <TeamGraficPie />
                            </div>
                        </div>
                    }
                </main>
            </Fade>
        </>
    )
}
export default Home;