import React, { useState, useEffect } from 'react';
import { fetchData, apiUrl } from './Functions/FetchApi';
import FilterComponent from './Components/FilterComponent/FilterComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import { Mainlist } from './Components/MainList/Mainlist';
import Loader from './Components/Loader/Loader';
import { useLogic } from './hooks/useLogic';
import Navbar from './Components/NavBarComponents/NavBar';
import AddNewHotel from './Components/NavBarComponents/AddNewHotel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


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

const App = () => {
  const {
    setHotels,
    filteredHotels, 
    locationFilter, 
    setLocationFilter,
    categoryFilter, 
    setCategoryFilter,
    locations, 
    categories, 
    isLoading, 
  } = useLogic();

  return (
    <Router>
      <div>
        <header>
          <Navbar hotels={filteredHotels} setFilteredHotels={setHotels} allHotels={filteredHotels} />
        </header>
        <main>
          {/* Add FilterComponent above Mainlist so filtering applies correctly */}
          <FilterComponent 
            locations={locations} 
            locationFilter={locationFilter} 
            setLocationFilter={setLocationFilter} 
            categories={categories} 
            categoryFilter={categoryFilter} 
            setCategoryFilter={setCategoryFilter} 
          />

          <Routes>
            <Route 
              path="/" 
              element={isLoading ? <Loader /> : <Mainlist hotels={filteredHotels} setHotels={setHotels} />} 
            />
            <Route path="/add-new" element={<AddNewHotel />} />
          </Routes>
          
        </main>
        <footer>
          <FooterComponent />
        </footer>
      </div>
    </Router>
  );
};

export default App;
