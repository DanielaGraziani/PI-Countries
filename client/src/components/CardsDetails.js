import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesByID, resetDetail } from "../actions";
import s from "../styled/CardsDetails.module.css";
import Activity from '../components/Activity'



export default function CardsDetails(props) {
  const dispatch = useDispatch();
  const countryDetails = useSelector((state) => state.country);

  useEffect(() => {
    // dispatch(resetDetail())
    dispatch(getCountriesByID(props.match.params.id));
    return ()=>{
      dispatch(resetDetail())
    }
  }, [dispatch, props.match.params.id]);


  return (
    <div className={s.content}>
    <div className={s.detailsContainer}>
      <img
        className={`${s.col} ${s.cardImage}`}
        src={countryDetails.flag}
        alt="Flag"
      />
      <div className={`${s.col} ${s.cardDetails}`}>
        <p className={s.name}>{countryDetails.name}</p>
        <p className={s.description}>Capital: {countryDetails.capital}</p>
        <p className={s.description}>Region: {countryDetails.continent}</p>
        <p className={s.description}>Subregion: {countryDetails.subregion}</p>
        <p className={s.description}> Population: {countryDetails.population} habitants</p>
        <p className={s.description}>Area: {countryDetails.area} km2</p>
        <p className={s.description}>Code: {countryDetails.id}</p>
      </div>

      <div>
        {countryDetails.activities?.length > 0 ? (
          countryDetails.activities?.map((activity, index) => (
            <Activity
              key={index}
              name={activity.name}
              difficulty={activity.difficulty}
              duration={activity.duration}
              season={activity.season}
            />
          ))
        ) : (
          <div className={s.titleActDiv}>
          <p className={s.titleAct}>Activities not found</p></div>
        )}
      </div>
    </div>
    </div>
  );
}
