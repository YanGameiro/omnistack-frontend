import React, { useState } from 'react';
import api from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        localStorage.setItem('user',_id);
    } 
    return (
        <>
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
        </>
    )
}

export default Login;