import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchBar from '../../components/SearchBar';
import api from '../../services/api';
import './style.css'

const Dashboard = () => {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    const [tech, setTech] = useState(null);

    const user_id = localStorage.getItem('user');

    const socket = useMemo(() => socketio(process.env.REACT_APP_MAIN_API_URL, {
        query: { user_id },
    }), [user_id]);

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        });
    }, [requests, socket]);

    useEffect(() => {
        loadSpots();
    }, []);

    async function searchByTech() {
        const response = await api.get('/spots', { params: { tech } });

        setSpots(response.data);
    }

    async function loadSpots(currentTab = "my-spots") {
        if (currentTab === "my-spots") {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/spots', {
                params: { ownerId: user_id }
            });
            setSpots(response.data);
            return;
        }
        if (currentTab === "spots-by-tech" && tech) { // CONFERIR
            const response = await api.get('/spots', { params: { tech } });

            setSpots(response.data);
            return;
        }
        if (currentTab === "spots-by-tech" && !tech) {
            const response = await api.get('/spots');

            setSpots(response.data);
            return;
        }
    }

    async function handleAccept(id) {
        await api.post(`/bookings/${id}`, { approved: true });
        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}`, { approved: false });
        setRequests(requests.filter(request => request._id !== id));
    }
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
                        <button className="accept" onClick={() => handleAccept(request._id)}>ACCEPT</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>REJECT</button>
                    </li>
                ))}
            </ul>
            <Tabs defaultActiveKey="my-spots" onSelect={(key) => loadSpots(key)}>
                <Tab eventKey="my-spots" title="My Spots">
                    <ul className="spot-list">
                        {spots.map(spot => (
                            <li key={spot._id}>
                                <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                                <strong>{spot.company}</strong>
                                <span>{spot.price ? `$ ${spot.price}` : 'FREE'}</span>
                            </li>
                        ))}
                    </ul>
                    <Link to="/new">
                        <button className="btn"> Add new spot </button>
                    </Link>
                </Tab>
                <Tab eventKey="spots-by-tech" title="Spots By Tech">
                    <SearchBar action={searchByTech} liveTyping={setTech} />
                    <ul className="spot-list">
                        {spots.map(spot => (
                            <li key={spot._id}>
                                <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                                <strong>{spot.company}</strong>
                                <span>{spot.price ? `$ ${spot.price}` : 'FREE'}</span>
                            </li>
                        ))}
                    </ul>
                </Tab>
            </Tabs>
        </>
    )
}

export default Dashboard;