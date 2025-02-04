import { useState, useEffect, useCallback } from 'react';
import { fetchData, apiUrl } from '../Functions/FetchApi';

export const useLogic = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [locationFilter, setLocationFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const [query, setQuery] = useState('');
    const [noResults, setNoResults] = useState(false); // Track whether there are no results

    const searchSubmit = useCallback((searchString) => {
        setQuery(searchString);
    }, []);

    const addHotel = useCallback((hotel) => {
        setHotels((prevHotels) => [hotel, ...prevHotels]);
    }, []);

    useEffect(() => {
        const fetchHotels = async () => {
            setIsloading(true);
            try {
                const response = await fetchData(apiUrl);
                setIsloading(false);
                setHotels(response.features);
                setFilteredHotels(response.features);

                // Extract unique locations (city, country)
                const uniqueLocations = [...new Set(response.features.map(hotel => {
                    const city = hotel.properties?.city || hotel.properties?.suburb || 'Unknown City';
                    const country = hotel.properties?.country || 'Unknown Country';
                    return `${city}, ${country}`;
                }))].sort();
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
            const hotelLocation = `${hotel.properties?.city || hotel.properties?.suburb || 'Unknown City'}, ${hotel.properties?.country || 'Unknown Country'}`;
            return (locationFilter === '' || hotelLocation === locationFilter) &&
                (categoryFilter === '' || (hotel.properties.categories || []).includes(categoryFilter));
        });
        const searchTerm = query.toLowerCase();
        const filteredByName = filtered.filter(hotel =>
            hotel.properties.name.toLowerCase().includes(searchTerm) ||
            hotel.properties.city.toLowerCase().includes(searchTerm) ||
            (hotel.properties.address_line2 && hotel.properties.address_line2.toLowerCase().includes(searchTerm)) ||
            (hotel.properties.contact?.phone && hotel.properties.contact.phone.toLowerCase().includes(searchTerm))
        );

        setFilteredHotels(filteredByName);

        // Check if there are no results
        setNoResults(filteredByName.length === 0);
    }, [hotels, locationFilter, categoryFilter, query]);

    return {
        hotels,
        setHotels,
        filteredHotels,
        setFilteredHotels,
        locationFilter,
        setLocationFilter,
        categoryFilter,
        setCategoryFilter,
        locations,
        setLocations,
        categories,
        setCategories,
        isLoading,
        setIsloading,
        searchSubmit,
        addHotel,
        noResults // Return noResults flag
    }
};
