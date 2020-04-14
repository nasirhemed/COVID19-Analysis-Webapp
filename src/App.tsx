import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { connect } from 'react-redux'
import Navbar from './components/__ui__/Navbar'
import Tabs from './components/__ui__/Tabs'
import GraphSection from './components/GraphSection';
import { fetchCountryData, fetchProvinceData, fetchSeriesData } from './store/actions/actions';

function App(props: any) {

  const {dispatch} = props
  const values = ['Graph', 'Map']
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    dispatch(fetchCountryData())
    dispatch(fetchProvinceData())
    dispatch(fetchSeriesData())
}, [dispatch])

  return (

      <div className="App">
        <Navbar/>
        <Tabs tabs={values} value={index} handleClick={(value) => setIndex(value)}/>
        
        <header>
          {index === 0 ? 
            <GraphSection/>
            : <p>This is the Map Section</p>}
          
        </header>
      </div>
  );
}

export default connect()(App);
