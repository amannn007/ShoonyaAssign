
import React from 'react';
import './Retreat.css';

const Retreat = ({ retreat }) => {
    return (
        <div className="retreat-card">
            <img src={retreat.image} alt={retreat.title} />
            <div className="retreat-content">
                <h3>{retreat.title}</h3>
                <p>{retreat.description}</p>
                <p><strong>Date:</strong> {retreat.date}</p>
                <p><strong>Location:</strong> {retreat.location}</p>
                <p><strong>Price:</strong> ${retreat.price}</p>
            </div>
        </div>
    );
};

export default Retreat;
