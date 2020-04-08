import {Country, Province} from './Country'

export interface CountryStatus {
    country: Country
    confirmed: number
    deaths: number
    recovered: number
}

export interface ProvinceStatus {
    province: Province
    confirmed: number
    deaths: number
    recovered: number
}

export interface CountryTimeSeries {
    country: Country
    data: {
        time: string
        confirmed: number
        deaths: number
        recovered: number
        active: number
        deltaConfirmed: number
        deltaRecovered: number
    }[]
}

export interface Provinces {
    country: Country,
    provinces: string[]
}