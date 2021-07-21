import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail } from "../../actions/index";

function DogDetail({ match }) {
  const term = match.params.name;
  console.log("term:", term)
  const perris = useSelector((state) => state.dogDetail);
  console.log("perris:", perris)

  const url =
    "https://us.123rf.com/450wm/antarts/antarts1604/antarts160400123/55570371-barbuda-cara-linda-del-perro-dom%C3%A9stico-en-el-fondo-violeta-.jpg?ver=6";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogDetail(term));
  }, []);

  return (
    <div className="HomeCss">
      {perris?.map((dog) => {
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

export default DogDetail;
