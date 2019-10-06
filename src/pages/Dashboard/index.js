import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import api from '../../services/api';
import './style.css'

const Dashboard = () => {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        const user_id = localStorage.getItem('user');
        const socket = socketio('http://192.168.0.9:3333', {
            query: { user_id },
        });
        socket.on('booking_request', data => {
            console.log(data);
        });
    }, []);

    useEffect(()=>{
        const loadSpots = async () => {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
        }
        loadSpots();
    },[]);
    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})`}} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `$ ${spot.price}` : 'FREE'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn"> Add new spot </button>
            </Link>
        </>
    )
}

export default Dashboard;