import './App.css';
import { Route } from "react-router-dom";
import React from 'react';
import home from "./components/Home";
import landing from './components/Landing';
import NavBar from "./components/NavBar"
import CreateDog from "./components/CreateDog"
import DogDetail from './components/DogDetail';
import Searched from './components/Searched';





function App() {
  return (
    <React.Fragment>
      <Route exact path="/"  component={landing} />
      <Route path = "/home" component={NavBar} /> 
      <Route exact path="/home" component={home} /> 
      <Route exact path="/home/dogdetail/:name" component={DogDetail} />
      <Route exact path="/home/searched" component={Searched} />
      <Route exact path="/home/createdog" component={CreateDog} />
    </React.Fragment>
  );
}

export default App;
