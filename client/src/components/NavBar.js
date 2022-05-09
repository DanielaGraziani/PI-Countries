import React from "react";
import { Link } from "react-router-dom";
import s from "../styled/NavBar.module.css";
import SearchBar from "../components/SearchBar";


export default function NavBar() {
  return (
    <div className={s.navBarContainer}>
      
      <nav className={s.navbar}>

        <div>
        <button className={s.home}>
          <Link className={s.link} to="/countries">Home</Link>
        </button>
        </div>
        {/* <SearchBar />  */}

        <div>
          <button className={s.act}>
          <Link className={s.link} to="/activity">Create Activity</Link>
          </button>
        </div>
      </nav>

    </div>
  );
}

