import React from 'react';
import './App.css';

import logo from './assets/Omni.svg';
import Routes from './routes';

function App() {
  
  return (
    <div className="container">
      <img src={logo} alt="Omnistack App Y"/>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
