import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'
import Chart from '../__ui__/BarGraph'
import { State } from '../../store/reducer/reducer'
import { ProvinceStatus, CountrySeries, CountryStatus } from '../../store/types/data'
import Plot from 'react-plotly.js'
const GraphContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 12px;
`


const ChartContainer = styled.div``

interface Props {
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

    const {countries, provinces, series, filters} = props
    
    const data = [{
        x: countries.map(country => country.country),
        y: countries.map(country => country.confirmed),
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

    const hmmm = [
        {
          x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
          y: [1, 3, 6],
          type: 'scatter' as const
        }
    ];
    return <GraphContainer>

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
        countries: state.dataSet.filteredCountries,
        provinces: state.dataSet.filteredProvinces,
        series: state.dataSet.filteredSeries,
        filters: state.dataSet.filters
    }
}
export default connect(mapStateToProps)(GraphSection)