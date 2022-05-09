import React from "react";
import Card from "./Card";
import s from "../styled/Cards.module.css";
import { Link } from "react-router-dom";

export default function Cards({currentCountries}) {


  //   toda la info que traje la mapeo y le paso lo que necesito al componente card
  return (
  <>
    <div className={s.cardsContainer}>
      {
      currentCountries?.map((c) => {
        return (
        //  <div>
            <Link key={c.id} to={`/countries/${c.id}`} className={s.link}>
              <Card name={c.name} region={c.continent} flag={c.flag} />
            </Link>
          // </div>
        );
      })
      }
    </div>
    </>
  );
}
