import * as d3 from 'd3'

export const REQUEST_COUNTRY = 'REQUEST_COUNTRY'
export const REQUEST_STATES = 'REQUEST_STATES'
export const REQUEST_SERIES = 'REQUEST_SERIES'
export const RECEIVE_COUNTRY = 'RECEIVE_COUNTRY'
export const RECEIVE_STATES = 'RECEIVE_STATES'
export const RECEIVE_SERIES = 'RECEIVE_SERIES'


export function requestCountry() {
    return {
        type: REQUEST_COUNTRY
    }
}

export function requestStates() {
    return {
        type: REQUEST_STATES
    }
}

export function requestSeries() { 
    return {
        type: REQUEST_SERIES
    }
}

export function receiveCountry(data: any) {
    return {
        type: RECEIVE_COUNTRY,
        data: data
    }
}

export function receiveStates(data: any) {
    return {
        type: RECEIVE_STATES,
        data: data
    }
}

export function receiveSeries(data: any) {
    return {
        type: RECEIVE_SERIES,
        data: data
    }
}

export function fetchData() {
    return (dispatch: any) => {
        dispatch(requestCountry())
        const data = d3.csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv')
        return data.then(d => dispatch(receiveCountry(d)))
    }
}