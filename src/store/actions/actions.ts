import * as d3 from "d3";
import { CountryStatus, ProvinceStatus } from "../types/data";
import { COUNTRY_CASES_URL, PROVINCE_CASES_URL } from "./urls";

export const REQUEST_COUNTRY = "REQUEST_COUNTRY";
export const REQUEST_PROVINCE = "REQUEST_PROVINCE";
export const REQUEST_SERIES = "REQUEST_SERIES";
export const RECEIVE_COUNTRY = "RECEIVE_COUNTRY";
export const RECEIVE_STATES = "RECEIVE_STATES";
export const RECEIVE_PROVINCE = "RECEIVE_PROVINCE";
export const RECEIVE_PROVINCE_NAMES = 'RECEIVE_PROVINCE_NAMES'
export const RECEIVE_COUNTRY_NAMES = 'RECEIVE_COUNTRY_NAMES'


type ReceiveProvinceNamesAction = {
    type: typeof RECEIVE_PROVINCE_NAMES,
    payload: {
        country: string,
        provinces: string[]
    }[]
}

type ReceiveCountryNamesAction = {
    type: typeof RECEIVE_COUNTRY_NAMES,
    payload: string[]
}

type RequestCountryAction = {
  type: typeof REQUEST_COUNTRY;
};

type ReceiveCountryAction = {
  type: typeof RECEIVE_COUNTRY;
  payload: CountryStatus[];
};

type RequestProvinceAction = {
  type: typeof REQUEST_PROVINCE;
};

type ReceiveProvinceAction = {
  type: typeof RECEIVE_PROVINCE;
  payload: ProvinceStatus[];
};

function requestCountry(): RequestCountryAction{
  return  {
    type: REQUEST_COUNTRY
  }
}

function receiveCountry(data: CountryStatus[]): ReceiveCountryAction {
  return {
    type: RECEIVE_COUNTRY,
    payload: data
  };
}

function receiveCountryNames(countries: string[]): ReceiveCountryNamesAction {
    return {
        type: RECEIVE_COUNTRY_NAMES, 
        payload: countries
    }
}

export function requestProvince(): RequestProvinceAction {
  return {
    type: REQUEST_PROVINCE
  };
}

export function receiveProvince(data: ProvinceStatus[]): ReceiveProvinceAction {
  return {
    type: RECEIVE_PROVINCE,
    payload: data
  };
}

export function receiveProvinceNames(provinces: {country: string, provinces: string[]}[]): ReceiveProvinceNamesAction {
    return {
        type: RECEIVE_PROVINCE_NAMES,
        payload: provinces
    }
}

export function fetchCountryData() {
  return (dispatch: any) => {
    dispatch(requestCountry());
    const data = d3.csv(COUNTRY_CASES_URL, d => {
      const countryStatus: CountryStatus = {
        country: d.Country_Region as string,
        confirmed: Number(d.Confirmed),
        recovered: Number(d.Recovered),
        deaths: Number(d.Deaths)
      };
      return countryStatus;
    });
    return data.then(d => {
      d.columns = ["country", "confirmed", "recovered", "deaths"];
      const allCountries = d.map(entry => entry.country)
      dispatch(receiveCountry(d));
      dispatch(receiveCountryNames(allCountries))
    });
  };
}

export function fetchProvinceData() {
  return (dispatch: any) => {
    dispatch(requestProvince());
    const data = d3.csv(PROVINCE_CASES_URL, d => {
      return {
        province: d.Province_State as string,
        country: d.Country_Region as string,
        confirmed: Number(d.Confirmed),
        recovered: Number(d.Recovered),
        deaths: Number(d.Deaths)
      };
    });
    return data.then(d => {
        const allStates = d3
          .nest<typeof d[0], string>()
          .key((entry) => entry.country)
          .entries(d)
          .map(entry => ({
            country: entry.key,
            provinces: entry.values.map(
              (nestedEntry: typeof d[0]) => nestedEntry.province
            ) as string[]
          }));

      const states: ProvinceStatus[] = d.map(entry => ({
        province: entry.province,
        confirmed: entry.confirmed,
        deaths: entry.deaths,
        recovered: entry.recovered
      }));
      dispatch(receiveProvince(states));
      dispatch(receiveProvinceNames(allStates))
    });
  };
}

export type actionType =
  | RequestCountryAction
  | ReceiveCountryAction
  | RequestProvinceAction
  | ReceiveProvinceAction
  | ReceiveCountryNamesAction
  | ReceiveProvinceNamesAction