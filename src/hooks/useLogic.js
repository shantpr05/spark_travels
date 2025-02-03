import { useState, useEffect, useCallback } from 'react';
import { fetchData, apiUrl } from '../Functions/FetchApi';

export const useLogic = () => {
    const [hotels, setHotels] = useState([]);  // Stores the list of all hotels
    const [filteredHotels, setFilteredHotels] = useState([]);  // Stores filtered list of hotels based on search/filter
    const [locationFilter, setLocationFilter] = useState('');  // Location filter (city, country)
    const [categoryFilter, setCategoryFilter] = useState('');  // Category filter
    const [locations, setLocations] = useState([]);  // List of unique locations
    const [categories, setCategories] = useState([]);  // List of unique hotel categories
    const [isLoading, setIsloading] = useState(false);  // Loading state for data fetching

    const [query, setQuery] = useState('');  // Search query string

    // Updates search query on input
    const searchSubmit = useCallback((searchString) => {
        setQuery(searchString)
    }, []);

    // Adds new hotel to the list of hotels
    const addHotel = useCallback((hotel) => {
        setHotels((prevHotels) => [hotel, ...prevHotels]);
    }, []);

    // Fetch hotels and related data (locations and categories) on mount
    useEffect(() => {
        const fetchHotels = async () => {
            setIsloading(true);  // Start loading state
            try {
                const response = await fetchData(apiUrl);  // Fetch hotel data
                setIsloading(false);  // End loading state
                setHotels(response.features);  // Set all fetched hotels
                setFilteredHotels(response.features);  // Initialize filtered list with all hotels
                
                // Extract unique locations (city, country) and sort
                const uniqueLocations = [...new Set(response.features.map(hotel => {
                    const city = hotel.properties?.city || hotel.properties?.suburb || 'Unknown City';
                    const country = hotel.properties?.country || 'Unknown Country';
                    return `${city}, ${country}`;
                }))].sort();
                setLocations(uniqueLocations);  // Set unique locations
                
                // Extract unique categories and sort
                const allCategories = response.features.flatMap(hotel => hotel.properties.categories || []);
                const uniqueCategories = [...new Set(allCategories)].sort();
                setCategories(uniqueCategories);  // Set unique categories
            } catch (error) {
                console.error('Error fetching hotels:', error);  // Handle any errors during fetching
            }
        };
        fetchHotels();  // Call fetchHotels on component mount
    }, []);  // Empty dependency array ensures this runs only once

    // Filter hotels based on location, category, and search query
    useEffect(() => {
        const filtered = hotels.filter(hotel => {
            const hotelLocation = `${hotel.properties?.city || hotel.properties?.suburb || 'Unknown City'}, ${hotel.properties?.country || 'Unknown Country'}`;
            return (locationFilter === '' || hotelLocation === locationFilter) &&
                   (categoryFilter === '' || (hotel.properties.categories || []).includes(categoryFilter));
        });
        
        // Filter hotels based on search query across relevant fields
        const searchTerm = query.toLowerCase();
        const filteredByName = filtered.filter(hotel =>
            hotel.properties.name.toLowerCase().includes(searchTerm) ||
            hotel.properties.city.toLowerCase().includes(searchTerm) ||
            (hotel.properties.address_line2 && hotel.properties.address_line2.toLowerCase().includes(searchTerm)) ||
            (hotel.properties.contact?.phone && hotel.properties.contact.phone.toLowerCase().includes(searchTerm))
        );
        setFilteredHotels(filteredByName);  // Set the final filtered list
    }, [hotels, locationFilter, categoryFilter, query]);  // Re-run whenever any of these dependencies change

    // Return all necessary state and functions to be used by components
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
        addHotel
    }
}
