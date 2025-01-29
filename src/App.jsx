import React, { useState, useEffect } from 'react';
import { fetchData, apiUrl } from './Functions/FetchApi';
import FilterComponent from './Components/FilterComponent/FilterComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import { Mainlist } from './Components/MainList/Mainlist';
import Loader from './Components/Loader/Loader';
import { useLogic } from './hooks/useLogic';

const App = () => {
// 
//   const [hotels, setHotels] = useState([]);
//   const [filteredHotels, setFilteredHotels] = useState([]);
//   const [locationFilter, setLocationFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [locations, setLocations] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isloading, setIsloading] = useState(false);

//   useEffect(() => {
//       const fetchHotels = async () => {
//           setIsloading(true)   
//           try {
//               const response = await fetchData(apiUrl);
//               setIsloading(false);
//               setHotels(response.features);
//               setFilteredHotels(response.features);
              
//               // Extract unique locations (city, country)
//               const uniqueLocations = [...new Set(response.features.map(hotel => {
//                   const city = hotel.properties.city || hotel.properties.suburb || 'Unknown City';
//                   const country = hotel.properties.country || 'Unknown Country';
//                   return `${city}, ${country}`;
//               }))].sort();
//               console.log('Unique Locations:', uniqueLocations);
//               setLocations(uniqueLocations);

//               // Extract unique categories
//               const allCategories = response.features.flatMap(hotel => hotel.properties.categories || []);
//               const uniqueCategories = [...new Set(allCategories)].sort();
//               setCategories(uniqueCategories);
//           } catch (error) {
//               console.error('Error fetching hotels:', error);
//           }
//       };
//       fetchHotels();
//   }, []);

//   useEffect(() => {
//       const filtered = hotels.filter(hotel => {
//           const hotelLocation = `${hotel.properties.city || hotel.properties.suburb || 'Unknown City'}, ${hotel.properties.country || 'Unknown Country'}`;
//           return (locationFilter === '' || hotelLocation === locationFilter) &&
//                  (categoryFilter === '' || (hotel.properties.categories || []).includes(categoryFilter));
//       });
//       setFilteredHotels(filtered);
//   }, [hotels, locationFilter, categoryFilter]);

   const {
    setHotels,
    filteredHotels, 
    locationFilter, 
    setLocationFilter,
    categoryFilter, 
    setCategoryFilter,
    locations, 
    categories, 
    isloading, 
  } = useLogic() 

  return (
    <div>
      <header>
        <h1>Hotel Finder</h1>
      </header>
      <main>
        <FilterComponent 
            locations={locations} 
            locationFilter={locationFilter} 
            setLocationFilter={setLocationFilter} 
            categories={categories} 
            categoryFilter={categoryFilter} 
            setCategoryFilter={setCategoryFilter} 
        />

        {/* <ul className={styles.hotelList}>
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
        </ul> */}
        {isloading 
            ? <Loader/>
            : <Mainlist 
                hotels={filteredHotels}
                setHotels={setHotels}
            />
        }
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  );
};

export default App;
