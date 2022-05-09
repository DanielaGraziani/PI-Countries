// Importo las actions types que necesito
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
} from "../actions/types";

import { ASC, DESC, ASCPOP } from "../const/const.js";

const initialState = {
  countries: [],
  allCountries: [],
  country: [],
  activities: [],
  loading: false,
  
  
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case GET_COUNTRIES_BY_ID:
      return {
        ...state,
        country: action.payload,
      };

    case GET_COUNTRY_BY_SEARCH:
      return {
        ...state,
        countries: action.payload,
      };

    case GET_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };

    case FILTER_CONTINENTS:
      const allCountries = state.allCountries;
      const filter =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((el) => el.continent === action.payload);
      return {
        ...state,
        countries: filter,
      };

    case FILTER_ACTIVITIES:
      // const allActivities = state.allCountries;
      // const activitiesFilter = allActivities.filter((el) => {
      //   return el.activities.find((el) => {
      //     return el.name === action.payload;
      //   });
      // });

      // if (action.payload === "All") {
      //   return { ...state, allActivities };
      // } else {
      //   return {
      //     ...state,
      //     countries: activitiesFilter,
      //   };
      // }

      const allActivities = state.allCountries;

      const activityFilter =
        action.payload === "All"
          ? allActivities.filter((c) => c.activities.length > 0)
          : allActivities.filter((c) =>
              c.activities?.map((act) => act.name).includes(action.payload)
            );

      return {
        ...state,
        countries: activityFilter,
      };



    case ORDER_BY_ASCDESC:
      let order =
        action.payload === ASC
          ? state.countries.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        countries: order,
      };

    case ORDER_BY_POP:
      let orderP =
        action.payload === ASCPOP
          ? state.countries.sort((a, b) => {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            });

      return {
        ...state,
        countries: orderP,
      }
      
    case POST_ACTIVITY:
      return {
        ...state,
      };

      case RESET:
      return {
        ...state,
        country:[]
      };
      
      case LOADING:
        return{
          ...state,
        //  loading: payload
        // data: {...action.data}
        }

    default:
      return state;
  }
};

export default rootReducer;
