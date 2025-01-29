import React, { useState, useEffect } from 'react';
import { fetchData, apiUrl } from '../../Functions/FetchApi';
import styles from './FilterComponent.module.css';

const FilterComponent = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [cityFilter, setCityFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetchData(apiUrl);
                setHotels(response.features);
                setFilteredHotels(response.features);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };
        fetchHotels();
    }, []);

    useEffect(() => {
        const filtered = hotels.filter(hotel => 
            hotel.properties.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
            (hotel.properties.categories || []).some(category => 
                category.toLowerCase().includes(categoryFilter.toLowerCase())
            )
        );
        setFilteredHotels(filtered);
    }, [hotels, cityFilter, categoryFilter]);

    return (
        <div className={styles.filterContainer}>
            <input
                type="text"
                placeholder="Filter by city"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className={styles.filterInput}
            />
            <input
                type="text"
                placeholder="Filter by category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={styles.filterInput}
            />
            <ul className={styles.hotelList}>
                {filteredHotels.map((hotel) => (
                    <li key={hotel.properties.place_id} className={styles.hotelItem}>
                        <h3>{hotel.properties.name}</h3>
                        <p>{hotel.properties.address_line2}</p>
                        <p>{hotel.properties.city}</p>
                        <p>{hotel.properties.contact?.phone}</p>
                        {hotel.properties.website && (
                            <img 
                                src={`https://image.thum.io/get/width/300/${hotel.properties.website}`} 
                                alt="Screenshot" 
                                className={styles.hotelImage}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterComponent;
