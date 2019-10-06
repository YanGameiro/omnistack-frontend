import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import api from '../../services/api';
import './style.css'

const Dashboard = () => {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://192.168.0.9:3333', {
        query: { user_id },
    }), [user_id]);

    useEffect(() => {
        
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });
    }, [requests, socket]);

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
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong>
                             wants to go to <strong>{request.spot.company}</strong>
                             on <strong>{request.date}</strong>
                        </p>
                        <button className="accept">ACCEPT</button>
                        <button className="reject">REJECT</button>
                    </li>
                ))}
            </ul>
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