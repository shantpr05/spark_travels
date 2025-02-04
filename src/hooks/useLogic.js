import { useState, useEffect, useCallback } from 'react';
import { fetchData, apiUrl } from '../Functions/FetchApi';

const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds


export const useLogic = () => {
    const [hotels, setHotels] = useState([]);  // Stores the list of all hotels
    const [filteredHotels, setFilteredHotels] = useState([]);  // Stores filtered list of hotels based on search/filter
    const [locationFilter, setLocationFilter] = useState('');  // Location filter (city, country)
    const [categoryFilter, setCategoryFilter] = useState('');  // Category filter
    const [locations, setLocations] = useState([]);  // List of unique locations
    const [categories, setCategories] = useState([]);  // List of unique hotel categories
    const [isLoading, setIsLoading] = useState(false);  // Loading state for data fetching

    const [query, setQuery] = useState('');
    const [noResults, setNoResults] = useState(false); // Track whether there are no results

    const searchSubmit = useCallback((searchString) => {
        setQuery(searchString);
    }, []);

    const addHotel = useCallback((hotel) => {
        setHotels((prevHotels) => [hotel, ...prevHotels]);
    }, []);

    const processHotelsData = (hotelsData) => {
        setHotels(hotelsData);
        setFilteredHotels(hotelsData);
        
        const uniqueLocations = [...new Set(hotelsData.map(hotel => {
            const city = hotel.properties?.city || hotel.properties?.suburb || 'Unknown City';
            const country = hotel.properties?.country || 'Unknown Country';
            return `${city}, ${country}`;
        }))].sort();
        setLocations(uniqueLocations);
        
        const allCategories = hotelsData.flatMap(hotel => hotel.properties.categories || []);
        const uniqueCategories = [...new Set(allCategories)].sort();
        setCategories(uniqueCategories);
    };

    const fetchAndStoreHotels = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetchData(apiUrl);
            processHotelsData(response.features);
            localStorage.setItem("hotels", JSON.stringify(response.features));
            localStorage.setItem("hotels-last-update", JSON.stringify(Date.now()));
        } catch (error) {
            console.error('Error fetching hotels:', error);
        } finally {
            setIsLoading(false);
        }
    },[]);

    useEffect(() => {
        const storedHotels = localStorage.getItem("hotels");
        const lastUpdate = localStorage.getItem("hotels-last-update");

        if (storedHotels && lastUpdate) {
            const parsedLastUpdate = JSON.parse(lastUpdate);
            if (Date.now() - parsedLastUpdate < ONE_DAY_MS) {
                // Use stored data if it's less than 24 hours old
                processHotelsData(JSON.parse(storedHotels));
                return;
            }
        }

        // Fetch new data if stored data is old or doesn't exist
        fetchAndStoreHotels();
    }, [fetchAndStoreHotels]);

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
        searchSubmit,
        addHotel,
        noResults // Return noResults flag
    }
};
