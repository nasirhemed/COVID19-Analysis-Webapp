import { combineReducers } from "redux";

import {
  RECEIVE_COUNTRY,
  //   RECEIVE_SERIES,
  RECEIVE_PROVINCE,
  REQUEST_COUNTRY,
  //   REQUEST_SERIES,
  REQUEST_PROVINCE,
  actionType,
  RECEIVE_COUNTRY_NAMES,
  RECEIVE_PROVINCE_NAMES
} from "../actions/actions";
import { CountryStatus, ProvinceStatus } from "../types/data";

interface State {
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
  countries: string[]
  provinces: {
      country: string
      provinces: string[]
  }[]
  filteredCountries: CountryStatus[];
  filteredStates: ProvinceStatus[];
  filters: {
    country: string[];
    province: {
      country: string;
      province: string[];
    }[];
  };
}
/**
 * 
 *  {
    casesCountry: {
        isFetching: true,
        success: true,
        data: CountryStatus[]
    },

    casesState: {
        isFetching: treu,
        success: true,
        data: ProvinceStatus[]
    },
    TimeSeries: {
        isFetching: true,
        success: true,
        data: TimeSeries[]
    }
}
 */

function dataSet(
  state: State = {
    allCountryCases: [],
    allProvinceCases: [],
    countries: [],
    provinces: [],
    filteredCountries: [],
    filteredStates: [],
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

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  dataSet
});

export default rootReducer;
