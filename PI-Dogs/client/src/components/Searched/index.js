import React from "react";
import { useSelector } from "react-redux";
import "./searched.css";

function Searched() {
  const filtdogs = useSelector((state) => state.filterLoaded);

  return (
    <div className="Search">
      {filtdogs?.map((dog) => {
        return (
          <div key={dog.id} className="DogCard">
            <p className="NameCard">{dog.name}</p>
            {/* {dog.image.url && dog.image.url ? (
              <img src={dog.image.url} alt="Not found" /> 
            ) : (
              <img className="Img" src={url} alt="Not found" />
            )
            } */}
            <p>{dog.height.metric}</p>
            <p>{dog.weight.metric}</p>
            <p>{dog.life_span}</p>
            <p>{dog.temperament}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Searched;
