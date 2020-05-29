import React from 'react';
import './style.css'


const SearchBar = ({ placeholder, liveTyping }) => {

    return (
        <>
            <input
                id="tech"
                type="tech"
                placeholder={placeholder}
                onChange={event => liveTyping(event.target.value)}
            />
        </>
    );
}

export default SearchBar;