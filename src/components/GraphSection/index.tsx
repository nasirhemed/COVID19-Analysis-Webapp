import React from 'react'
import styled from 'styled-components'
import { Select, MenuItem } from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchCountryData, fetchProvinceData, fetchSeriesData } from '../../store/actions/actions'
const GraphContainer = styled.div`
    display: flex;
    // justify-content: space-around;
    width: 100%;
    margin-top: 12px;
`


const FilterContainer = styled.div`
    padding: 2px;
    background: grey;
    width: 50%;
`


const ChartContainer = styled.div``


const GraphSection: React.FC = (props: any) => {

    const { dispatch } = props
    const countries = ['Canada', 'United States', 'France', 'Italy']
    // const provinceState = {
    //     'Canada': [
    //         'Alberta',
    //         'Ontario',
    //     ],
    //     'United States': [
    //         'California',
    //         'New York'
    //     ],
    //     'Italy': []
    // }

    React.useEffect(() => {
        // debugger
        dispatch(fetchCountryData())
        dispatch(fetchProvinceData())
        dispatch(fetchSeriesData())
        // dispatch(changeLevel('United States'))
        // dispatch(filterProvinces(['Ohio', 'New York']))
        // dispatch(filterCountries(['United States']))
    }, [dispatch])
    return <GraphContainer> 

        

        <FilterContainer>
            
            <Select value={0}>
                {countries.map((country, index) => <MenuItem key={index} value={index}>{country}</MenuItem>)}
            </Select>
        </FilterContainer>

        <ChartContainer>
            Chart Section
        </ChartContainer>
    </GraphContainer>
}

export default connect()(GraphSection)