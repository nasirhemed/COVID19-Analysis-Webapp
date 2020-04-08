import { combineReducers } from "redux";

import {
  RECEIVE_COUNTRY,
//   RECEIVE_SERIES,
//   RECEIVE_STATES,
  REQUEST_COUNTRY,
//   REQUEST_SERIES,
//   REQUEST_STATES
} from "../actions/actions";


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

function dataSet (
    state = {
        casesCountry: {
            isFetching: false, 
            success: false,
            data: [
                {
                    country: '',
                    confirmed: '',
                    deaths: '',
                    recovered: ''
                }
            ]
        }
    },
    action: any
) {

    switch (action.type) {
        case REQUEST_COUNTRY:
            return {
                ...state,
                casesCountry: {
                    isFetching: true
                }
            }
        case RECEIVE_COUNTRY:
            return {
                ...state,
                casesCountry: {
                    isFetching: false,
                    data: action.data
                }
            }
    
        default:
            return state
    }
}

const rootReducer = combineReducers({
    dataSet
})

export default rootReducer