import { useState, useEffect } from 'react';
import { fetchData, apiUrl } from '../Functions/FetchApi';

export const useLogic = () => {
      const [hotels, setHotels] = useState([]);
      const [filteredHotels, setFilteredHotels] = useState([]);
      const [locationFilter, setLocationFilter] = useState('');
      const [categoryFilter, setCategoryFilter] = useState('');
      const [locations, setLocations] = useState([]);
      const [categories, setCategories] = useState([]);
      const [isloading, setIsloading] = useState(false);
    
      useEffect(() => {
          const fetchHotels = async () => {
              setIsloading(true)   
              try {
                  const response = await fetchData(apiUrl);
                  setIsloading(false);
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
        isloading, 
        setIsloading,
      }
}