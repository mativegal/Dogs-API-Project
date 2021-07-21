import SearchBar from '../SearchBar'
import React from 'react'
import { NavLink } from 'react-router-dom';
import Logo from "../../imagenes/dog.png"
import "./navbar.css"
import "../Landing/landing.css"


export function NavBar() {
    return (
        <div >
            <nav className="HNB">
                <div className="Logo"> 
                    <NavLink to="/"> <img className="Logo" alt="Not found" id="" src={Logo} /> </NavLink>
                </div>
                <div className="Home">
                    <NavLink to="/home">Home</NavLink>
                </div>
                <div className="CreateDog">
                    <NavLink to="/home/createdog">Create a dog</NavLink>
                </div>
                <div className="Search">
                    <SearchBar/>
                </div>
            </nav>
                <span id="span4"></span>
        </div>
    )
}

export default NavBar;
