import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getAllCountries } from "../actions/index";
import Card from "./Card";
import s from "../styled/Cards.module.css";
import { Link } from "react-router-dom";

export default function Cards({currentCountries}) {
  // const dispatch = useDispatch();
  // const allCountries = useSelector((state) => state.countries); //traigo todo lo que esta en el initialState de countries

  // // useEffect se encarga de despachar la accion de traer la info de los paises

  // useEffect(() => {
  //   dispatch(getAllCountries());
  // }, [dispatch]);

  //   toda la info que traje la mapeo y le paso lo que necesito al componente card
  return (
  <>
    <div className={s.cardsContainer}>
      {
      currentCountries?.map((c) => {
        return (
        //  <div>
            <Link key={c.id} to={`/countries/${c.id}`} className={s.link}>
              <Card name={c.name} region={c.region} flag={c.flag} />
            </Link>
          // </div>
        );
      })
      }
    </div>
    </>
  );
}
