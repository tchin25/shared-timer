import React from 'react';
import './tailwind.output.css';
import TimeCard from './components/TimeCard'
import Clock from './components/Clock'

function App() {
  return (
    <div className="App">
      <Clock></Clock>
      <TimeCard></TimeCard>
    </div>
  );
}

export default App;
