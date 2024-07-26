
import React, { useEffect, useState } from 'react';
import Retreat from './Retreat';
import Filter from './Filter';
import './MainPage.css';

const MainPage = () => {
    const [retreats, setRetreats] = useState([]);
    const [filteredRetreats, setFilteredRetreats] = useState([]);
    const [filter, setFilter] = useState({ type: '', date: '', search: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const retreatsPerPage = 3;

    useEffect(() => {
        fetchRetreats();
    }, []);

    const fetchRetreats = async () => {
        try {
            const response = await fetch('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched data:', data); 
            setRetreats(data);
            setFilteredRetreats(data);
        } catch (error) {
            console.error('Fetch error:', error); 
        }
    };

    useEffect(() => {
        applyFilter();
    }, [filter, retreats]);

    const applyFilter = () => {
        let filtered = retreats;

        if (filter.type) {
            filtered = filtered.filter(retreat => retreat.type === filter.type);
        }

        if (filter.date) {
            filtered = filtered.filter(retreat => new Date(retreat.date) >= new Date(filter.date));
        }

        if (filter.search) {
            const searchTerm = filter.search.toLowerCase();
            filtered = filtered.filter(retreat =>
                retreat.title.toLowerCase().includes(searchTerm) ||
                retreat.description.toLowerCase().includes(searchTerm) ||
                retreat.location.toLowerCase().includes(searchTerm)
            );
        }

        setFilteredRetreats(filtered);
        setCurrentPage(1); 
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    // Get current retreats
    const indexOfLastRetreat = currentPage * retreatsPerPage;
    const indexOfFirstRetreat = indexOfLastRetreat - retreatsPerPage;
    const currentRetreats = filteredRetreats.slice(indexOfFirstRetreat, indexOfLastRetreat);

    const totalPages = Math.ceil(filteredRetreats.length / retreatsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <main className="main-content">
            <Filter onFilterChange={handleFilterChange} />
            {filteredRetreats.length === 0 ? (
                <p>No retreats found.</p>
            ) : (
                <div className="retreats-list">
                    {currentRetreats.map(retreat => (
                        <Retreat key={retreat.id} retreat={retreat} />
                    ))}
                </div>
            )}
            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </main>
    );
};

export default MainPage;
