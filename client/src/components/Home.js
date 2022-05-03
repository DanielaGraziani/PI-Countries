import React from "react";
import Cards from "./Cards";
// import NavBar from "./NavBar";
import s from "../styled/Home.module.css";
import { getAllCountries, filterContinents } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

//^   PAGINADOOOO

  // Pagina actual, empezara en 1
  const [currentPage, setCurrentPage] = useState(1);
  // Cantidad de paises por pagina (me piden 10 por pag)
  const countriesPerPage = 10;
  // Sobre la pagina actual multiplico la cantidad de paises por pagina || si estoy en la pagina 3 indexOfLastItem sera 30
  const indexOfLastItem = currentPage * countriesPerPage;
  // necesito en cada pagina saber el index del primer item. Resto el ultimo index menos la cantidad de items que tengo por pag
  const indexOfFirstItem = indexOfLastItem - countriesPerPage;
  // en esta constante guardo cuales paises hay que renderizar dependiendo de la pagina
  const currentCountries = allCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // seteo la pagina actual
  //toma un numero de la pagina como argumento y establece la pagina act a ese numero de pagina
  //pageNumber, el numero de pagina al que se quiere ir

  const pagination = (pageNumber) => {
    // if(currentPage ===1){
    //   countriesPerPage= 9
    // }
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);



  //^ Filtrado por continentes
  const handleFilterContinents = (e) => {
    dispatch(filterContinents(e.target.value));
  };


//^ Filtrado por actividad
  /* Ordenar asc/desc ||| ordenar por cantidad de poblacion */

  return (
    <div className={s.home}>
      <div>
        <select onChange={(e) => handleFilterContinents(e)}>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <Cards currentCountries={currentCountries} />
      <Pagination
        pagination={pagination}
        allCountries={allCountries.length}
        countriesPerPage={countriesPerPage}
      />
    </div>
  );
}
