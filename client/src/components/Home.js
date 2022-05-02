import React from "react";
import Cards from "./Cards";
// import NavBar from "./NavBar";
import s from '../styled/Home.module.css'
import { getAllCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";





export default function Home() {
  
const dispatch = useDispatch()
const allCountries = useSelector((state)=> state.countries)

// Pagina actual, empezara en 1
const [currentPage, setCurrentPage] = useState(1)
// Cantidad de paises por pagina (me piden 10 por pag)
const countriesPerPage=10
// Sobre la pagina actual multiplico la cantidad de paises por pagina || si estoy en la pagina 3 indexOfLastItem sera 30
const indexOfLastItem = currentPage * countriesPerPage
// necesito en cada pagina saber el index del primer item. Resto el ultimo index menos la cantidad de items que tengo por pag
const indexOfFirstItem= indexOfLastItem - countriesPerPage
// en esta constante guardo cuales paises hay que renderizar dependiendo de la pagina
const currentCountries= allCountries.slice(indexOfFirstItem, indexOfLastItem)


// seteo la pagina actual 
const pagination=(pageNumber)=>{
  setCurrentPage(pageNumber)
}

useEffect(() => {
  dispatch(getAllCountries());
}, [dispatch]);

  return (
     <div className={s.home}>
        <Cards currentCountries={currentCountries}/>
        <Pagination pagination={pagination} allCountries={allCountries.length} countriesPerPage={countriesPerPage}/>
      </div>
 
  );
}
