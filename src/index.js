import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from "./componentes/app.js"
import Login from './componentes/login';
import "./index.css"
const Index = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} ></Route>
        <Route path="/" component={App}></Route>
      </Switch>
    </BrowserRouter>
  )
}
ReactDOM.render(<Index />, document.getElementById("root"));
