export interface CountryStatus {
    country: string
    confirmed: number
    deaths: number
    recovered: number
}

export interface ProvinceStatus {
    province: string
    confirmed: number
    deaths: number
    recovered: number
}

export interface CountrySeries {
    country: string,
    dates: string[]
    confirmed : number[]
    recovered: number[]
    deltaConfirmed: number[]
    deltaRecovered: number[] 
    deaths: number[]
}

export interface Provinces {
    country: string,
    provinces: string[]
}

export const types = [
    'World',
    'US',
    'Canada',
    'United Kingdom',
    'China',
    'Netherlands',
    'Australia',
    'Denmark',
    'France'
]