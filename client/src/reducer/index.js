// Importo las actions types que necesito
import { GET_ALL_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRY_BY_SEARCH, FILTER_CONTINENTS } from "../actions/types";

const initialState = {
  countries: [],
  country: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_COUNTRIES_BY_ID:
      return{
        ...state,
        country: action.payload,
      }

      case GET_COUNTRY_BY_SEARCH:
      return {
        ...state,
        countries: action.payload,
      };

      case FILTER_CONTINENTS:
      const allCountries= state.countries 
      const filter= action.payload === 'All' ? allCountries : allCountries.filter(el=> el.continent === action.payload)
      return{
          ...state,
          countries:filter
        }
    default:
      return state;
  }
};

export default rootReducer;
