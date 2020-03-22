import React from 'react'
import styled from 'styled-components'
import { Select, MenuItem, InputLabel } from '@material-ui/core'

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


const GraphSection: React.FC = props => {

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


export default GraphSection