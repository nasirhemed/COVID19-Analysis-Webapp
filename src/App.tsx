import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Navbar from './components/Navbar'
import Tabs from './components/Tabs'

function App() {
  const values = ['Graphs', 'Map']
  const [index, setIndex] = React.useState(0)

  return (
    <div className="App">
      <Navbar/>
      <Tabs tabs={values} value={index} handleClick={(value) => setIndex(value)}/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        {index === 0 ? <p>
          This is the Graphs Section
        </p> : <p>This is the Map Section</p>}
        
      </header>
    </div>
  );
}

export default App;
