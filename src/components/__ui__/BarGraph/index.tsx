import React from 'react'
import Plot from 'react-plotly.js'
import styled from 'styled-components'


const Container = styled.div``

interface Props { 
    data: {
        x: string[],
        y: number[],
        name: string,
        type: 'bar' | 'scatter'
    }[]

    title: string
    layout?: any
}

const Graph: React.FC<Props> = props => {

    const {data, layout} = props
    return <Container>
        <Plot data={data} config={{staticPlot: true}} layout={layout}/>
    </Container>
}

export default Graph