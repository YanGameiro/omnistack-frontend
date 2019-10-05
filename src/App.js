import React, { useState } from 'react';
import './App.css';
import api from './services/api';

import logo from './assets/Omni.svg';

function App() {
  const [email, setEmail] = useState('');
  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user',_id);
  } 

  return (
    <div className="container">
      <img src={logo} alt="Omnistack App Y"/>
      <div className="content">
        <p>
          Find spots to program around the world
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL</label>
          <input
            id="email"
            type="email"
            placeholer= "type your email here"
            onChange={event => setEmail(event.target.value)}
          />
          <button className="btn" type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
}

export default App;
