import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from "./componentes/app.js"
import Login from './componentes/login';
import HomeState from './context/Home/HomeState.js'
import "./index.css"
const Index = () => {
  return (
    <HomeState>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} ></Route>
          <Route path="/" component={App}></Route>
        </Switch>
      </BrowserRouter>
    </HomeState>
  )
}
ReactDOM.render(<Index />, document.getElementById("root"));
