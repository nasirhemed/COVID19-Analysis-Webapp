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

export interface CountryTimeSeries {
    country: string
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
    country: string,
    provinces: string[]
}