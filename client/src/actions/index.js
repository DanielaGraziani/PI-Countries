import { GET_ALL_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRY_BY_SEARCH } from "./types";



// Aca ocurre la conexion entre el back y el front
//1. Traigo la data de los paises que tengo en el back


export const getAllCountries = () => (dispatch) => {
    return fetch('http://localhost:3001/countries')
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_ALL_COUNTRIES, payload: json });
      });
    };


export const getCountriesByID = (id)=> (dispatch)=>{
  return fetch('http://localhost:3001/countries/' + id)
  .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_COUNTRIES_BY_ID, payload: json });
      });
}

export const getCountryBySearch = (search) => (dispatch) => {
  return fetch('http://localhost:3001/countries?name=' + search)
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: GET_COUNTRY_BY_SEARCH, payload: json });
    });
  };
