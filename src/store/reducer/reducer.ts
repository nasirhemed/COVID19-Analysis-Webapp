import { combineReducers } from "redux";

import {
  RECEIVE_COUNTRY,
  RECEIVE_PROVINCE,
  REQUEST_COUNTRY,
  REQUEST_PROVINCE,
  REQUEST_SERIES,
  RECEIVE_SERIES,
  actionType,
  RECEIVE_COUNTRY_NAMES,
  RECEIVE_PROVINCE_NAMES,
  FILTER_COUNTRIES,
  FILTER_PROVINCE,
  CHANGE_LEVEL
} from "../actions/actions";
import { CountryStatus, ProvinceStatus, CountrySeries } from "../types/data";

export interface State {
  ui: {
    country: {
      fetching: boolean;
      success: boolean;
    };
    province: {
      fetching: boolean;
      success: boolean;
    };
    series: {
      fetching: boolean;
      success: boolean;
    };
  };
  allCountryCases: CountryStatus[];
  allProvinceCases: ProvinceStatus[];
  allSeries: CountrySeries[];
  countries: string[]
  provinces: {
      country: string
      provinces: string[]
  }[]
  filteredCountries: CountryStatus[];
  filteredProvinces: ProvinceStatus[];
  filteredSeries: CountrySeries[];
  filters: {
    level: string
    country: string[];
    province: string[];
  };
  
}

function dataSet(
  state: State = {
    allCountryCases: [],
    allProvinceCases: [],
    allSeries: [],
    countries: [],
    provinces: [],
    filteredCountries: [],
    filteredProvinces: [],
    filteredSeries: [],
    ui: {
      country: {
        fetching: false,
        success: false
      },
      province: {
        fetching: false,
        success: false
      },
      series: {
        fetching: false,
        success: false
      }
    },
    filters: {
      level: 'World',
      country: [],
      province: []
    }
  },
  action: actionType
): State {
  switch (action.type) {
    case REQUEST_COUNTRY:
      return {
        ...state,
        ui: {
          ...state.ui,
          country: {
            ...state.ui.country,
            fetching: true
          }
        }
      };
    case RECEIVE_COUNTRY:
      return {
        ...state,
        allCountryCases: action.payload,
        ui: {
          ...state.ui,
          country: {
            ...state.ui.country,
            fetching: false,
            success: true
          }
        }
      };
    case RECEIVE_COUNTRY_NAMES:
        return {
            ...state,
            countries: action.payload
        }
    case REQUEST_PROVINCE:
      return {
        ...state,
        ui: {
          ...state.ui,
          province: {
            ...state.ui.province,
            fetching: true
          }
        }
      };
    case RECEIVE_PROVINCE:
      return {
        ...state,
        allProvinceCases: action.payload,
        ui: {
          ...state.ui,
          province: {
            fetching: true,
            success: true
          }
        }
      };
    case RECEIVE_PROVINCE_NAMES:
        return {
            ...state,
            provinces: action.payload
        }

    case FILTER_COUNTRIES:
      return {
        ...state,
        filteredCountries: state.allCountryCases.filter(country => action.payload.includes(country.country)),
        filteredSeries: state.allSeries.filter(country => action.payload.includes(country.country)),
        filters: {
          ...state.filters,
          country: action.payload
        }
      }
    case FILTER_PROVINCE:
      return {
        ...state,
        filteredProvinces: state.allProvinceCases.filter(province => action.payload.includes(province.province)),
        filters: {
          ...state.filters,
          province: action.payload
        }
      }
    case REQUEST_SERIES:
      return {
        ...state,
        ui: {
          ...state.ui,
          series: {
            ...state.ui.series,
            fetching: true
          }
        }
      }
    case RECEIVE_SERIES:
      return {
        ...state,
        allSeries: action.payload
      }
    case CHANGE_LEVEL:
      return {
        ...state,
        filters: {
          ...state.filters,
          province: [],
          level: action.payload
        }
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  dataSet
});

export default rootReducer;
