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
          <h3>{name}</h3>
        </div>
        <div className={s.region}>
          <h5>{region}</h5>
        </div>
      </div>
    </div>
  );
}
