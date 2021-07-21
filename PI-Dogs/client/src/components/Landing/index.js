import React from 'react'
import './landing.css';
import { NavLink } from 'react-router-dom';

export const index = () => {
    return (
        <div className="Landing">
            <h1 className="Title"> × Dogs do speak, but only to those who know how to listen × </h1>
            <button className="Neon">
                <span id="span1"></span>
                <span id="span2"></span>
                <span id="span3"></span>
                <span id="span4"></span>
                <NavLink exact to="/home"> Home </NavLink>
            </button>
            
        </div>
    )
}

export default index;

