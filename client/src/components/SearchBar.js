import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryBySearch } from "../actions";
import s from "../styled/SearchBar.module.css";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("Insert country name");
    }else{
      dispatch(getCountryBySearch(name));
      setName('');
    }
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const regexLetters = /[^a-zA-Z\s]/g;
  //   setSearch(search.trim());
  //   if (search.length >= 3) {
  //     if (!regexLetters.test(search)) {
  //       return dispatch(getCountryBySearch(search));
  //     } else {
  //       return alert("Insert country name");
  //     }
  //   } else {
  //     return alert("more 3 letters");
  //   }
  // }

  function onInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  return (
    <div>
      <form className={s.searchContainer}onSubmit={(e) => handleSubmit(e)}>
        <div className={s.searchBox}>
          <input
            className={s.searchInput}
            type="text"
            value={name}
            placeholder="Search for countries..."
            onChange={onInputChange}
          />
          <button className={s.searchButton} type="submit"></button>
        </div>
      </form>
    </div>
  );
}
