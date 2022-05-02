import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByID } from "../actions";
// import {Link} from 'react-router-dom'
import s from "../styled/CardsDetails.module.css";

export default function CardsDetails(props) {
  console.log(props);
  const dispatch = useDispatch();

  const countryDetails = useSelector((state) => state.country);
  console.log(countryDetails);

  // let {id} = useParams()

  useEffect(() => {
    dispatch(getCountriesByID(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className={s.detailsContainer}>
      <img
        className={`${s.col} ${s.cardImage}`}
        src={countryDetails.flag}
        alt="Flag"
      />

      <div className={`${s.col} ${s.cardDetails}`}>
        <h2>{countryDetails.name}</h2>
        <h3>Code: {countryDetails.id}</h3>
        <h3>Capital: {countryDetails.capital}</h3>
        <h3>Region: {countryDetails.region}</h3>
        <h3>Subregion: {countryDetails.subregion}</h3>
        <h3> Population: {countryDetails.population} habitants</h3>
        <h3>Area: {countryDetails.area} km2</h3>
        {/* <button className="">
            <Link className='' to="/countries" >Back to countries</Link>
            </button> */}
      </div>
    </div>
  );
}
