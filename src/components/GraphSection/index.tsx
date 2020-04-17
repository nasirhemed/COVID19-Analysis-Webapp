import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import moment from "moment";
import Chart from "../__ui__/BarGraph";
import Sidebar from "../__ui__/Sidebar";
import { State } from "../../store/reducer/reducer";
import {
  ProvinceStatus,
  CountrySeries,
  CountryStatus,
  types
} from "../../store/types/data";
import Plot from "react-plotly.js";
import { sortCountries } from "../../app/utils";
import { changeLevel, filterCountries, filterProvinces } from "../../store/actions/actions";
const GraphContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 12px;
`;

const ChartContainer = styled.div``;

interface Props {
  allCountryNames: string[];
  allProvinceNames: {
    country: string;
    provinces: string[];
  }[];
  countries: CountryStatus[];
  provinces: ProvinceStatus[];
  series: CountrySeries[];
  filters: {
    level: string;
    country: string[];
    province: string[];
  };
  dispatch: React.Dispatch<any>;
}

const GraphSection: React.FC<Props> = props => {
  const {
    countries,
    provinces,
    allCountryNames,
    dispatch,
    allProvinceNames,
    series,
    filters
  } = props;

  const toDisplay = filters.level === 'World' ? countries : provinces

  const sortedData: any = sortCountries(toDisplay);

  const xKey = filters.level === 'World' ?'country' : 'province'
  const isEmpty = filters.level === 'World' ? countries.length === 0 : provinces.length === 0
  const data = [
    {
      x: sortedData.map((data: any) => data[xKey]),
      y: sortedData.map((data: any) => data.confirmed),
      type: "bar" as const,
      name: "Confirmed Cases per Country"
    }
  ];

  const seriesData = series.map(country => ({
    type: "scatter" as const,
    x: country.dates.map(date => moment(date).toDate()),
    y: country.confirmed,
    name: country.country,
    mode: "lines" as const
  }));

  const handleChangeType = (value: string) => {
    dispatch(changeLevel(value));
  };

  const handleFilterChange = (filterList: string[]) => {

    if (filters.level === 'World') {
        dispatch(filterCountries(filterList));
    } else {
        dispatch(filterProvinces(filterList))
    }
  };

  const provinceNames = allProvinceNames.find(
    province => province.country === filters.level
  );
  const provinceCheckbox = !!provinceNames ? provinceNames.provinces : [];
  const selectedFilters =
    filters.level === "World" ? filters.country : filters.province;

  return (
    <GraphContainer>
      <Sidebar
        handleFilter={handleFilterChange}
        types={types}
        selectedType={filters.level}
        selectedFilters={selectedFilters}
        countries={allCountryNames}
        provinces={provinceCheckbox}
        handleChangeType={handleChangeType}
      />

      <ChartContainer>
        {!isEmpty && <Chart data={data} title={"lol"} />}
        <Plot data={seriesData} layout={{ title: "Trend" }} />
      </ChartContainer>
    </GraphContainer>
  );
};

const mapStateToProps = (state: { dataSet: State }) => {
  return {
    allCountryNames: state.dataSet.countries,
    allProvinceNames: state.dataSet.provinces,
    countries: state.dataSet.filteredCountries,
    provinces: state.dataSet.filteredProvinces,
    series: state.dataSet.filteredSeries,
    filters: state.dataSet.filters
  };
};
export default connect(mapStateToProps)(GraphSection);
