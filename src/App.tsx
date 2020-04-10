import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { Provider } from 'react-redux'
import configureStore from './store/store'
import Navbar from './components/__ui__/Navbar'
import Tabs from './components/__ui__/Tabs'
import GraphSection from './components/GraphSection';

const store = configureStore({})
function App() {
  const values = ['Graph', 'Map']
  const [index, setIndex] = React.useState(0)

  return (

    <Provider store={store}>
      <div className="App">
        <Navbar/>
        <Tabs tabs={values} value={index} handleClick={(value) => setIndex(value)}/>
        <header>
          {index === 0 ? 
          <GraphSection />
          : <p>This is the Map Section</p>}
          
        </header>
      </div>
    </Provider>
  );
}

export default App;
