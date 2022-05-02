import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryBySearch } from "../actions";
import s from '../styled/SearchBar.module.css'



export default function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (search.length === 0) return alert("Insert country name");
    dispatch(getCountryBySearch(search));
    setSearch('');
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  }

  

  return (
    <div>
      <form className={s.searchContainer} onSubmit={handleSubmit}>
        <div className={s.searchBox}>
          <input
            className={s.searchInput}
            type="text"
            value={search}
            placeholder="Search for countries..."
            onChange={onInputChange}
          />
          <button className={s.searchButton} type="submit"></button>
        </div>
      </form>
    </div>
  );
}
