import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { React, useState } from "react";
import Slide from 'react-reveal/Slide'
import Heroes from "./heroes.js";
import CharacterInfo from "./characterInfo.js";
import logo from "./../assets/image/logo.png"
import Home from "./home.js"
const App = () => {
    const Inicio = localStorage.getItem("login");
    const [buscador, setBuscador] = useState("");
    const [render, setRenderLogin] = useState(false);
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem("login");
        setRenderLogin(true)
    }
    return (
        <>
            {Inicio ?
                <>  
                    <Slide top>
                    <header>
                        <nav className="container--nav">
                            <ul className="nav--ul">
                                <li className="ul--li"><Link to="/"><img className="nav--logo" src={logo} alt="logo" /></Link></li>
                                <li className="ul--li ul--li-search"><input className="input--search" type="search" onKeyPress={(e) => e.code === "Enter" || e.code === "NumpadEnter" ? history.push(`/search/${buscador}`) : null} onKeyUp={(e) => setBuscador(e.target.value)} placeholder="Find your hero" ></input><Link to={`/search/${buscador}`} ><FontAwesomeIcon className="icon--search" icon={faSearch} /></Link></li>
                                <li className="ul--li-icon"><FontAwesomeIcon className="icon--logout" icon={faSignOutAlt} onClick={logout} /></li>
                            </ul>
                        </nav>
                    </header>
                    </Slide>
                    <Switch>
                        <Route exact path="/:id">
                            <CharacterInfo />
                        </Route>
                        <Route exact path="/search/:name">
                            <Heroes name={buscador} />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                    
                </> : <Redirect to="/login" />}
        </>
    )
}
export default App;
