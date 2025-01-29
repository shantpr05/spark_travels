import React, { useState, useEffect } from 'react';
import { fetchData, apiUrl } from '../../Functions/FetchApi';
import styles from './FilterComponent.module.css';

const FilterComponent = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [locationFilter, setLocationFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetchData(apiUrl);
                console.log('API Response:', response);
                setHotels(response.features);
                setFilteredHotels(response.features);
                
                // Extract unique locations (city, country)
                const uniqueLocations = [...new Set(response.features.map(hotel => {
                    const city = hotel.properties.city || hotel.properties.suburb || 'Unknown City';
                    const country = hotel.properties.country || 'Unknown Country';
                    return `${city}, ${country}`;
                }))].sort();
                console.log('Unique Locations:', uniqueLocations);
                setLocations(uniqueLocations);

                // Extract unique categories
                const allCategories = response.features.flatMap(hotel => hotel.properties.categories || []);
                const uniqueCategories = [...new Set(allCategories)].sort();
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };
        fetchHotels();
    }, []);

    useEffect(() => {
        const filtered = hotels.filter(hotel => {
            const hotelLocation = `${hotel.properties.city || hotel.properties.suburb || 'Unknown City'}, ${hotel.properties.country || 'Unknown Country'}`;
            return (locationFilter === '' || hotelLocation === locationFilter) &&
                   (categoryFilter === '' || (hotel.properties.categories || []).includes(categoryFilter));
        });
        setFilteredHotels(filtered);
    }, [hotels, locationFilter, categoryFilter]);

    return (
        <div className={styles.filterContainer}>
            <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className={styles.filterInput}
            >
                <option value="">All Locations</option>
                {locations.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                ))}
            </select>
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={styles.filterInput}
            >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <ul className={styles.hotelList}>
                {filteredHotels.map((hotel) => (
                    <li key={hotel.properties.place_id} className={styles.hotelItem}>
                        <h3>{hotel.properties.name}</h3>
                        <p>{hotel.properties.address_line2}</p>
                        <p>{hotel.properties.city || hotel.properties.suburb}, {hotel.properties.country}</p>
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
