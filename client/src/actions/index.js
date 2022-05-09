import axios from "axios";
import {
  GET_ALL_COUNTRIES,
  GET_COUNTRIES_BY_ID,
  GET_COUNTRY_BY_SEARCH,
  FILTER_CONTINENTS,
  FILTER_ACTIVITIES,
  GET_ACTIVITY,
  ORDER_BY_ASCDESC,
  ORDER_BY_POP,
  POST_ACTIVITY,
  RESET,
  LOADING,
} from "./types";

// Aca ocurre la conexion entre el back y el front
//1. Traigo la data de los paises que tengo en el back

export const getAllCountries = () => (dispatch) => {
  return fetch("http://localhost:3001/countries")
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: GET_ALL_COUNTRIES, payload: json });
      dispatch(loading(false))
    });
};

export const getCountriesByID = (id) => (dispatch) => {
  return fetch("http://localhost:3001/countries/" + id)
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: GET_COUNTRIES_BY_ID, payload: json });
    });
};

export const getCountryBySearch = (name) => (dispatch) => {
  return fetch("http://localhost:3001/countries?name=" + name)
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: GET_COUNTRY_BY_SEARCH, payload: json });
    })
    .catch((error)=> console.log('country not found'))
};

export const getActivities = () => (dispatch) => {
  return fetch("http://localhost:3001/activity")
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: GET_ACTIVITY, payload: json });
    })

    .catch((error) => alert(error));
};

export const postActivities = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(`http://localhost:3001/activity`, payload);
      return dispatch({
        type: POST_ACTIVITY,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterContinents = (payload) => {
  return {
    type: FILTER_CONTINENTS,
    payload,
  };
};

export const filterActivities = (payload) => {
  return {
    type: FILTER_ACTIVITIES,
    payload,
  };
};

export const order = (payload) => {
  return {
    type: ORDER_BY_ASCDESC,
    payload,
  };
};

export const orderPop = (payload) => {
  return {
    type: ORDER_BY_POP,
    payload,
  };
};

export const resetDetail = () => {
  return (dispatch) => {
    dispatch({ type: RESET });
  };
};

export const loading = (payload) => {
  return {
    type: LOADING,
    payload,
  };
};
