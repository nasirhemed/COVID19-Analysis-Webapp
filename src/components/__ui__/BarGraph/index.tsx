import React from "react";
import Plot from "react-plotly.js";
import styled from "styled-components";

const Container = styled.div``;

interface Props {
  data: {
    x: string[];
    y: number[];
    name: string;
    type: "bar" | "scatter";
  }[];

  title: string;
}

const Graph: React.FC<Props> = props => {
  const { data, title } = props;
  return (
    <Container>
      <Plot
        data={data}
        config={{
          scrollZoom: false,
          displayModeBar: false,
          displaylogo: false
        }}
        layout={{
          title: title,
          yaxis: { fixedrange: true },
          xaxis: { fixedrange: true }
        }}
      />
    </Container>
  );
};

export default Graph;
