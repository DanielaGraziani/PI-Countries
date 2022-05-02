import React from "react";
import s from "../styled/Card.module.css";



export default function Card({ name, region, flag }) {
  return (
    <div className={s.card}>
      <div className={s.cardContainer}>
        <div>
          <img src={flag} className={s.cardImg} alt="not found" />
        </div>
        <div className={s.name}>
          <h2>{name}</h2>
        </div>
        <div className={s.region}>
          <h3>{region}</h3>
        </div>
      </div>
    </div>
  );
}
