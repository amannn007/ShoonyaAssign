
import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [search, setSearch] = useState('');

    const handleFilterChange = () => {
        onFilterChange({ type, date, search });
    };

    return (
        <div className="filter">
            <div className="filter-item">
                <label>Filter by Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} onBlur={handleFilterChange} />
            </div>
            <div className="filter-item">
                <label>Filter by Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)} onBlur={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Meditation">Meditation</option>
                    <option value="Detox">Detox</option>
                </select>
            </div>
            <div className="filter-item">
                <label>Search retreats by title:</label>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onBlur={handleFilterChange} placeholder="Enter title..." />
            </div>
        </div>
    );
};

export default Filter;
