import React from 'react';



const SearchBar = ({ action, liveTyping }) => {
    async function handleSubmit(event) {
        event.preventDefault();
        action();
    }
    return (
        <>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    id="tech"
                    type="tech"
                    placeholer="type desired tech"
                    onChange={event => liveTyping(event.target.value)}
                />
                <button type="submit">Find</button>
            </form>
        </>
    );
}

export default SearchBar;