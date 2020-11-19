import React from 'react';
import './App.css';
import FaqCarousel from './components/FaqCarousel';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <div className="container-fluid">
        <FaqCarousel />
      </div>
    </div>
  );
}

export default App;
