import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountriesByID } from "../actions";
// import {Link} from 'react-router-dom'
import s from "../styled/CardsDetails.module.css";

export default function CardsDetails(props) {;
  const dispatch = useDispatch();
  const countryDetails = useSelector((state) => state.country);
  
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
      </div>

      <div className={s.activitiesDetails}>
        {countryDetails.activities?.map((el) => {
          return (
            <div>
              <Link to={"/activity"} className={s.linkDetails}>
                <h2>Activity</h2>
              </Link>
              <div>
                <h3>{el.name}</h3>
                <h3>Difficulty: {el.difficulty}</h3>
                <h3>Duration: {el.duration}</h3>
                <h3>Season: {el.season}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
