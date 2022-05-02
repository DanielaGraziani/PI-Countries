import React from "react";
import { Link } from "react-router-dom";
import s from "../styled/NavBar.module.css";
import SearchBar from "../components/SearchBar";


export default function NavBar() {
  return (
    <div className={s.navBarContainer}>
      
      <nav className={s.navbar}>
          <Link to="/countries">Home</Link>
        <SearchBar /> 
        <div className={s.activity}>
          <Link to="/activity">Create Activity</Link>
        </div>
      </nav>

    </div>
  );
}

