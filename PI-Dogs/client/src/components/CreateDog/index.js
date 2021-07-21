import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemp } from "../../actions/index";
import axios from "axios";
import "./createdog.css";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "* Name is required";
    /*}  else if (!/\d{1,2}-\d{1,2}/g.test(input.name)) {
    errors.name = 'Name is invalid'; */
  }
  if (!input.height) {
    errors.height = "* Height is required";
    /* } else if (!/\d{1,2}-\d{1,2}/g.test(input.height)){
    errors.height = 'Height is invalid'; */
  }

  if (!input.weight) {
    errors.weight = "* Weight is required";
    /* } else if (!/\d{1,2}-\d{1,2}/g.test(input.weight)){
    errors.weight = 'Weight is invalid'; */
  }
  if (!input.life_span) {
    errors.life_span = "* Life span is required";
    /* } else if (!/\d{1,2}-\d{1,2}/g.test(input.life_span)){
    errors.life_span = 'Life span is invalid'; */
  }
  if (!input.temperament) {
    errors.temperament = "Temperament is required";
    /* } else if (!/\d{1,2}-\d{1,2}/g.test(input.temperaments)){
    errors.temperaments = 'Temperament is invalid'; */
  }
  if (!input.image) {
    errors.image = "Image is required";
    /* } else if (!/\d{1,2}-\d{1,2}/g.test(input.temperaments)){
    errors.temperaments = 'Temperament is invalid'; */
  }
  return errors;
}

export default function CreateDog() {
  const selectTemps = useSelector((state) => state.temps);

  const [input, setInput] = useState({
    name: "",
    height: "",
    weigth: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.weight &&
      !errors.height &&
      !errors.life_span &&
      !errors.temperaments 
      /*  && !errors.image */
    ) {
      await axios.post("http://localhost:3001/dog", input);
      setInput({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        /* image: "", */
        temperaments: [],
      });
      alert("Your breed has been created successfully");
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemp());
  }, []);

  function handleSelect(e) {
    if (input.temperaments.includes(parseInt(e.target.value))) {
      alert("You already selected this temperament. Try again.");
    } else if (input.temperaments.length >= 3) {
      alert("You can select up to 3 temperaments.");
    } else {
      setInput((prev) => ({
        ...prev,
        temperaments: [...prev.temperaments, parseInt(e.target.value)],
      }));
    }
  }

  function deleteTemp(e, t) {
    setInput((prev) => ({
      ...prev,
      temperaments: prev.temperaments.filter((temp) => temp !== parseInt(t)),
    }));
  }

  function getNames(arr) {
    let names = [];
    selectTemps?.forEach((t) => {
      arr.forEach((id) => {
        if (id === t.id) {
          names.push(t.name);
        }
      });
    });
    return names;
  }
  
  return (
    <form onSubmit={handleSubmit} className="Form">
      <div>
        <ul className="Ul">
          <div>
            <label className="Label">Name:</label>
            <input
              className="Input"
              key="name"
              type="text"
              name="name"
              onChange={handleInputChange}
              value={input.name}
            />
            {errors.name && <p className="danger">{errors.name}</p>}
            <br />
          </div>
          <div>
            <label className="Label">Height:</label>
            <input
              className="Input"
              key="height"
              type="text"
              name="height"
              onChange={handleInputChange}
              value={input.height}
            />
            {errors.height && <p className="danger">{errors.height}</p>}
            <br />
          </div>
          <div>
            <label className="Label">Weight:</label>
            <input
              className="Input"
              key="weight"
              type="text"
              name="weight"
              onChange={handleInputChange}
              value={input.weight}
            />
            {errors.weight && <p className="danger">{errors.weight}</p>}
            <br />
          </div>
          <div>
            <label className="Label">Life Span:</label>
            <input
              className="Input"
              key="life_span"
              type="text"
              name="life_span"
              onChange={handleInputChange}
              value={input.life_span}
            />
            {errors.life_span && <p className="danger">{errors.life_span}</p>}
            <br />
          </div>
          <div>
            <label className="Label">Temperament:</label>
            <select
              name="temperaments"
              onChange={(e) => handleSelect(e)}
              required
              value={input.temperaments}
              className="form-control"
            >
              {errors.temperament && (
                <p className="danger">{errors.temperament}</p>
              )}
              {selectTemps?.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <div className="Select">
              {input.temperaments.map((t) => (
                <p id={t}>
                  {getNames([t])}
                  <button className="Butt" onClick={(e) => deleteTemp(e, t)}>x</button>
                </p>
              ))}
            </div>
          </div>
          <div>
            <button className="Neon" type="submit" name="submit">
              Create!
            </button>
          </div>
        </ul>
      </div>
    </form>
  );
}
