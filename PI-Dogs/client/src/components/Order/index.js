import React, { useEffect, useState } from "react";
import {
  filter,
  getHeavy,
  getLight,
  getTemp,
  orderByZA,
  getSource,
  orderByAZ,
  getDogs,
} from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./order.css"

export function Order() {
  const [selectedTemp, setSelectedTemp] = useState("");
  const [tempToFilterBy, setTempToFilterBy] = useState([]);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
  }, []);
  
  const temp = useSelector((state) => state.temps);
  
  const dogs = useSelector((state) => state.dogsLoaded);
  
  

  function orderDes(e) {
    e.preventDefault();
    dispatch(orderByZA());
  }

  function orderAsc(e) {
    e.preventDefault();
    dispatch(orderByAZ());
  }

  function orderLight(e) {
    e.preventDefault();
    dispatch(getLight());
  }

  function orderHeavy(e) {
    e.preventDefault();
    dispatch(getHeavy());
  }

  useEffect(() => {
    dispatch(getTemp());
  }, []);
 

  function handleSubmit(e) {
    e.preventDefault();
    setTempToFilterBy([...tempToFilterBy, selectedTemp]);
    handleClick();
  }


  function handleChange(e) {
    setSelectedTemp(e.target.value);
  }

  function handleClick() {
    let filtered = [];

    dogs?.forEach((b) => {
      if (b.id.length) {
        b.temperaments.map((t) => (
          t.name === selectedTemp ? filtered.push(b) : null
          ));
        } else {
          if (b.temperament?.includes(selectedTemp)) {
            filtered.push(b);
          } else {
            console.log("nada");
          }
          
        }
      });
      
      dispatch(filter(filtered));
      console.log(filtered);
    }
    
      function handleSelect(e) {
      if (e.target.value === "null") {
        return alert("Please insert a valid value");
      } else {
        dispatch(getSource(e.target.value));
      }
    }
    

  return (
    <div className="Order">
      <div>
        <label className="OBN">Order by: name</label>
        <br />

        <button className="Button" onClick={(e) => orderAsc(e)}>A-Z</button>
        <button className="Button" onClick={(e) => orderDes(e)}>Z-A</button>
      </div>

      <div>
        <label className="OBN">Order by: weight</label>
        <br />

        <button className="Button" onClick={(e) => orderLight(e)}>Weight - to +</button>
        <button className="Button" onClick={(e) => orderHeavy(e)}>Weight + to -</button>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label className="OBN">Filter by temps </label>
          <select
            onChange={handleChange}
            name="temperaments"
            value={selectedTemp}
          >
            {temp?.map((t) => {
              return <option value={t.name}>{t.name}</option>;
            })}
          </select>

          <button type="submit" className="Button"> Filter</button>
        </form>
      </div>
      <div>
        <form>
          <label className="OBN">Source</label>
          <br />
          <select onChange={handleSelect}>
            <option value="null">Select</option>
            <option value="DB">DB</option>
            <option value="API">API</option>
            <option value="ALL">ALL</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default Order;

