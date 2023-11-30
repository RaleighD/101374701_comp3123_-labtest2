import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== '') {
            onSearch(searchTerm.trim());
            setSearchTerm('');
        }
    };

    return (
        <form onSubmit={handleSearchSubmit} className="search-bar">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInput}
                placeholder="Longitude, Latitude"
                aria-label="Search for weather data by GPS coordinates"
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;
