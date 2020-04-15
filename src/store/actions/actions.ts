import * as d3 from "d3";
import { CountryStatus, ProvinceStatus, CountrySeries } from "../types/data";
import { COUNTRY_CASES_URL, PROVINCE_CASES_URL, TIME_SERIES_URL } from "./urls";

export const REQUEST_COUNTRY = "REQUEST_COUNTRY";
export const REQUEST_PROVINCE = "REQUEST_PROVINCE";
export const REQUEST_SERIES = "REQUEST_SERIES";
export const RECEIVE_COUNTRY = "RECEIVE_COUNTRY";
export const RECEIVE_SERIES = "RECEIVE_SERIES";
export const RECEIVE_PROVINCE = "RECEIVE_PROVINCE";
export const RECEIVE_PROVINCE_NAMES = "RECEIVE_PROVINCE_NAMES";
export const RECEIVE_COUNTRY_NAMES = "RECEIVE_COUNTRY_NAMES";
export const FILTER_COUNTRIES = "FILTER_COUNTRIES";
export const FILTER_PROVINCE = "FILTER_PROVINCES";
export const CHANGE_LEVEL = "CHANGE_LEVEL";

type filterCountriesAction = {
  type: typeof FILTER_COUNTRIES;
  payload: string[];
};

type filterProvinceAction = {
  type: typeof FILTER_PROVINCE;
  payload: string[];
};

type changeLevelAction = {
  type: typeof CHANGE_LEVEL;
  payload: string;
};

type ReceiveProvinceNamesAction = {
  type: typeof RECEIVE_PROVINCE_NAMES;
  payload: {
    country: string;
    provinces: string[];
  }[];
};

type ReceiveCountryNamesAction = {
  type: typeof RECEIVE_COUNTRY_NAMES;
  payload: string[];
};

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

type RequestSeriesAction = {
  type: typeof REQUEST_SERIES;
};

type ReceiveSeriesAction = {
  type: typeof RECEIVE_SERIES;
  payload: CountrySeries[];
};

export function filterCountries(countries: string[]): filterCountriesAction {
  return {
    type: FILTER_COUNTRIES,
    payload: countries
  };
}

export function filterProvinces(provinces: string[]): filterProvinceAction {
  return {
    type: FILTER_PROVINCE,
    payload: provinces
  };
}

export function changeLevel(level: string): changeLevelAction {
  return {
    type: CHANGE_LEVEL,
    payload: level
  };
}

function requestCountry(): RequestCountryAction {
  return {
    type: REQUEST_COUNTRY
  };
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
  };
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

export function requestSeries(): RequestSeriesAction {
  return {
    type: REQUEST_SERIES
  };
}

export function receiveSeries(
  countrySeries: CountrySeries[]
): ReceiveSeriesAction {
  return {
    type: RECEIVE_SERIES,
    payload: countrySeries
  };
}

export function receiveProvinceNames(
  provinces: { country: string; provinces: string[] }[]
): ReceiveProvinceNamesAction {
  return {
    type: RECEIVE_PROVINCE_NAMES,
    payload: provinces
  };
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
      const allCountries = d.map(entry => entry.country);
      dispatch(receiveCountry(d));
      dispatch(receiveCountryNames(allCountries));
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
        .key(entry => entry.country)
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
      dispatch(receiveProvinceNames(allStates));
    });
  };
}

export function fetchSeriesData() {
  return (dispatch: any) => {
    dispatch(requestSeries());
    const data = d3.csv(TIME_SERIES_URL, d => ({
      country: d.Country_Region as string,
      date: d.Last_Update as string,
      province: d.Province_State,
      confirmed: Number(d.Confirmed),
      recovered: Number(d.Recovered),
      deaths: Number(d.Deaths),
      deltaConfirmed: Number(d.Delta_Confirmed),
      deltaRecovered: Number(d.Delta_Recovered)
    }));

    return data.then(series => {
      const countriesOnly = series.filter(value => !value.province)
      const formattedData = d3
        .nest<typeof series[0], CountrySeries>()
        .key(d => d.country)
        .rollup(v => ({
          country: v[0].country,
          dates: v.map(d => d.date),
          confirmed: v.map(d => d.confirmed),
          recovered: v.map(d => d.recovered),
          deaths: v.map(d => d.deaths),
          deltaConfirmed: v.map(d => d.deltaConfirmed),
          deltaRecovered: v.map(d => d.deltaRecovered)
        }))
        .entries(countriesOnly)
        .reduce<CountrySeries[]>((result, el) => {
          el.value && result.push(el.value);
          return result;
        }, []);

      dispatch(receiveSeries(formattedData));
      dispatch(
        filterCountries([
          "US",
          "Canada",
          "Italy",
          "Spain",
          "United Kingdom"
        ])
      );
    });
  };
}

export type actionType =
  | RequestCountryAction
  | ReceiveCountryAction
  | RequestProvinceAction
  | RequestSeriesAction
  | ReceiveProvinceAction
  | ReceiveCountryNamesAction
  | ReceiveProvinceNamesAction
  | ReceiveSeriesAction
  | filterCountriesAction
  | filterProvinceAction
  | changeLevelAction;
