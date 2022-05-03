import React from "react";
import s from '../styled/Pagination.module.css'

export default function Pagination({
  allCountries,
  pagination,
  countriesPerPage,
}) {
  const pageNumbers = [];


  for (let i = 1; i < Math.ceil(allCountries / countriesPerPage ); i++) {  
    pageNumbers.push(i);
  }

    
// num es cada una de las paginas que necesito para renderizar todos mis personajes
  
  return (
    <div className={s.paginationContainer}>
     <ul className={s.pagination}>
     {pageNumbers?.map(num => (
        <li key={num} className={s.num}>
            <a onClick={() => pagination(num)}>{num}</a>
        </li>
     ))}
     </ul>
    </div>
  );
}
