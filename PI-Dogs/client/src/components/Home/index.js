import "./home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions/index";
import { NavLink } from "react-router-dom";
import { Order } from "../Order/index"

export default function Home() {
  const dogs = useSelector((state) => state.dogsLoaded);
  const url =
    "https://us.123rf.com/450wm/antarts/antarts1604/antarts160400123/55570371-barbuda-cara-linda-del-perro-dom%C3%A9stico-en-el-fondo-violeta-.jpg?ver=6";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
  }, []);

  dogs?.map((e) => {
    if (e.id.length > 4) {
      e.image = { url };
      e.temperament = "";
      for (let i = 0; i < e.temperaments.length; i++) {
        e.temperament += e.temperaments[i].name.toString() + ", ";
      }
    }
  });



  // ------------------------------------------- Pagination ----------------------------------------------------

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(dogs?.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dogs.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextButton = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementButton = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementButton = <li onclick={handleNextButton}>&hellip;</li>;
  }

  let pageDecrementButton = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementButton = <li onclick={handlePrevButton}>&hellip;</li>;
  }

  // ----------------------------------------------- Cards -----------------------------
  function render(data) {
    return (
      <div>
        {data?.map((dog) => {
          return (
            <NavLink to={`/home/dogdetail/${dog.name}`}>
              <div key={dog.id} className="DogCard">
                <p className="NameCard">{dog.name}</p>
                {dog.image.url ? (
                  <img className="Img" src={dog.image.url} alt="Not found" />
                ) : (
                  <img src={dog.image} alt="Not found" />
                )}
                <p className="Temps">{dog.temperament}</p>
              </div>
            </NavLink>
          );
        })}
      </div>
    );
  }

  const filter = useSelector((state) => state.filterLoaded);

  return (
    <div className="HomeCss">
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevButton}
            disabled={currentPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageIncrementButton}
        {renderPageNumbers}
        {pageDecrementButton}
        <li>
          <button
            onClick={handleNextButton}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      {filter?.length > 0 ? render(filter) : render(currentItems)}
      <div>
        <Order/>
      </div> 
    </div>
  );
}
