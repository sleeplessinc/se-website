import React from 'react';
import './App.css';
import FaqCarousel from './components/FaqCarousel';
import Navigation from './components/Navigation';
import watch from './images/bg_pocket_watch.png';

function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <div className="container-fluid p-0">
        <FaqCarousel />
      </div>
    </div>
  );
}

export default App;
