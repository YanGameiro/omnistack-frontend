import React from 'react';

const SpotList = ({ spots }) => {
    return (
        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `$ ${spot.price}` : 'FREE'}</span>
                </li>
            ))}
        </ul>
    );
}
export default SpotList;