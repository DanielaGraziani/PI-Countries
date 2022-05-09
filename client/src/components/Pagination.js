import React from "react";
import s from '../styled/Pagination.module.css'

export default function Pagination({
  allCountries,
  pagination,
  // countriesPerPage,
}) {
  const pageNumbers = [];


  for (let i =0; i < Math.ceil(allCountries / 10 ); i++) {  
    pageNumbers.push(i+1);
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
