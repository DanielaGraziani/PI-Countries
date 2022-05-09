import React from "react";
import Cards from "./Cards";
import s from "../styled/Home.module.css";
import {
  getAllCountries,
  filterContinents,
  filterActivities,
  getActivities,
  order,
  orderPop, 
} from "../actions";

import { ASC, DESC, DESCPOP, ASCPOP } from "../const/const";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";




export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);


  //^   PAGINADOOOO

  // Pagina actual, empezara en 1
  const [currentPage, setCurrentPage] = useState(1);
  // Cantidad de paises por pagina (me piden 10 por pag)
  const [countriesPerPage, setCountriesPerPage] = useState(9);
  // Sobre la pagina actual multiplico la cantidad de paises por pagina || si estoy en la pagina 3 indexOfLastItem sera 30
  const indexOfLastItem = currentPage * countriesPerPage;
  // necesito en cada pagina saber el index del primer item. Resto el ultimo index menos la cantidad de items que tengo por pag
  const indexOfFirstItem = indexOfLastItem - countriesPerPage;
  // en esta constante guardo cuales paises hay que renderizar dependiendo de la pagina
  const currentCountries = allCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const [, setOrden] = useState("");

  // seteo la pagina actual
  //toma un numero de la pagina como argumento y establece la pagina act a ese numero de pagina
  //pageNumber, el numero de pagina al que se quiere ir

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber === 1) setCountriesPerPage(9);
    else if (pageNumber !== 1) setCountriesPerPage(10);
  };

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
  }, [dispatch]);

  //^ Filtrado por continentes
  const handleFilterContinents = (e) => {
    dispatch(filterContinents(e.target.value));
    setCurrentPage(1);
  };

  //^ Filtrado por actividad

  const handleFilterActivities = (e) => {
    dispatch(filterActivities(e.target.value));
    setCurrentPage(1);
  };

  //^ Ordenar asc/desc

  const handleOrder = (e) => {
    dispatch(order(e.target.value));
    setCurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  };

  const handleOrderPOP = (e) => {
    dispatch(orderPop(e.target.value));
    setCurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  };

  return (
    <div className={s.home}>
      <div className={s.container}>
      <SearchBar/>
        <div className={s.filterContainer}>
          <h3>Filters</h3>
          <select className={s.sFilter} onChange={(e) => handleFilterContinents(e)}>
            <option className={s.cont}value="All">Continents</option>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
          </select>

          <select className={s.sFilter} onChange={(e) => handleFilterActivities(e)}>
            <option value="All"> Activities </option>
            {activities.map((el, i) => (
              <option key={i} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </div>

        <div className={s.orderContainer}>
          <h3>Order</h3>
          <select className={s.sOrder} onChange={(e) => handleOrder(e)}>
            <option>Alphabet</option>
            <option value={ASC}> A-Z</option>
            <option value={DESC}>Z-A</option>
          </select>

          <select className={s.sOrder} onChange={(e) => handleOrderPOP(e)}>
            <option>Population</option>
            <option value={ASCPOP}> Higher </option>
            <option value={DESCPOP}> Smalller </option>
          </select>
        </div>
      </div>

      <Cards currentCountries={currentCountries} />
      <Pagination
        pagination={pagination}
        allCountries={allCountries.length}
        // countriesPerPage={countriesPerPage}
      />
    </div>
      
         
  );
}


// {loading ? (
//   <Loader/>
// ):(
//   <><Cards currentCountries={currentCountries} />
//   <Pagination
//   pagination={pagination}
//   allCountries={allCountries.length} /></>
//   )
// }

// </div>