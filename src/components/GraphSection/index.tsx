import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'
import Chart from '../__ui__/BarGraph'
import Sidebar from '../__ui__/Sidebar'
import { State } from '../../store/reducer/reducer'
import { ProvinceStatus, CountrySeries, CountryStatus } from '../../store/types/data'
import Plot from 'react-plotly.js'
import { sortCountries } from '../../app/utils'
const GraphContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 12px;
`


const ChartContainer = styled.div``

interface Props {
    allCountryNames: string[]
    allProvinceNames: {
        country: string;
        provinces: string[];
    }[]
    countries: CountryStatus[]
    provinces: ProvinceStatus[]
    series: CountrySeries[],
    filters: {
        level: string;
        country: string[];
        province: string[];
    }
}

const GraphSection: React.FC<Props> = (props) => {

    const {countries, provinces, allCountryNames, allProvinceNames, series, filters} = props
    
    const sortedCountries = sortCountries(countries)
    console.log(sortedCountries)
    const data = [{
        x: sortedCountries.map(country => country.country),
        y: sortedCountries.map(country => country.confirmed),
        type: 'bar' as const,
        name: 'Confirmed Cases per Country'
    }]

    const seriesData = series.map(country => ({
        type: 'scatter' as const,
        x: country.dates.map(date => moment(date).toDate()),
        y: country.confirmed,
        name: country.country,
        mode: 'lines' as const
    }))

    const handleChangeType = (value: string) => {
        alert('Wow you clicked me')
    }

    const types = ['World', 'US', 'Canada', 'China', 'United Kingdom']
    
    return <GraphContainer>
        <Sidebar types={types} selectedType='World' countries={allCountryNames} provinces={['lol']} handleChangeType={handleChangeType}/>

        <ChartContainer>
            <Chart data={data} title={'lol'}/>
            <Plot data={seriesData} layout={{title: 'Trend'}}/>
            
        </ChartContainer>
    </GraphContainer> 
}

const mapStateToProps = (state: {
    dataSet: State
}) => {
    return {
        allCountryNames: state.dataSet.countries,
        allProvinceNames: state.dataSet.provinces,
        countries: state.dataSet.filteredCountries,
        provinces: state.dataSet.filteredProvinces,
        series: state.dataSet.filteredSeries,
        filters: state.dataSet.filters
    }
}
export default connect(mapStateToProps)(GraphSection)