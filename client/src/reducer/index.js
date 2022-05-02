// Importo las actions types que necesito
import { GET_ALL_COUNTRIES, GET_COUNTRIES_BY_ID, GET_COUNTRY_BY_SEARCH } from "../actions/types";

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
    default:
      return state;
  }
};

export default rootReducer;
