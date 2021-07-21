import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getName } from "../../actions/index";
import './searchbar.css';


function SearchBar() {
  
  const [state, setState] = useState();
 
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getName(state));
    setState("");
  }

  const handleChange = (e)=>{
    setState(e.target.value)
    dispatch(getName(e.target.value));    
  }

  
  return (
    <div className="Search">
      <input className="Input"
        type="text"
        placeholder="Search a dog!"
        value = {state}
        onChange={(e) => handleChange(e)}
      
      />
      <button className="SearchNeon" onClick={handleClick} type="submit" >
      <NavLink to="/home/searched">Search</NavLink>
      </button>
    </div>
  )}

export default SearchBar;