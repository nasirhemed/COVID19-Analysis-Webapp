import { CountrySeries, CountryStatus } from "../../store/types/data"


export const getGroupedData = (data: CountrySeries[], days = 7) => {

    const total: CountrySeries[] = []
    
    let deltaConfirmed: number = 0
    let deltaRecovered: number = 0


    for (let country of data) {
        
        const countrySeries: CountrySeries = {
            country: country.country,
            confirmed: [],
            recovered: [],
            deaths: [],
            deltaConfirmed: [],
            deltaRecovered: [],
            dates: []
        }

        let weekNum = 1
        for (let j = 0; j < country.dates.length; j++) {

            // confirmed += country.confirmed[j]
            // recovered += country.recovered[j]
            // deaths += country.deaths[j]
            deltaConfirmed += country.deltaConfirmed[j]
            deltaRecovered += country.deltaRecovered[j]
            
            if ((j + 1) % days === 0) {
                countrySeries.confirmed.push(country.confirmed[j])
                countrySeries.recovered.push(country.recovered[j])
                countrySeries.deaths.push(country.deaths[j])
                countrySeries.deltaConfirmed.push(deltaConfirmed)
                countrySeries.deltaRecovered.push(deltaRecovered)
                countrySeries.dates.push(`Week ${weekNum++}`)
                deltaConfirmed = 0
                deltaRecovered = 0
            }

        }
        total.push(countrySeries)
    }
    return total
}


export const sortCountries = (countries : CountryStatus[]) => {
    return [...countries].sort((a, b) => sortHandler(a, b, 'confirmed'))
}

const sortHandler = (a: any, b: any , key: string , order: 'asc' | 'desc' = 'desc') : number => {
    return order === 'asc' ? a[key] - b[key] : b[key] - a[key]
}