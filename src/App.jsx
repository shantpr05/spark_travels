import React, { useState, useEffect } from 'react';
import { fetchData, apiUrl } from './Functions/FetchApi';
import FilterComponent from './Components/FilterComponent/FilterComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import { Mainlist } from './Components/MainList/Mainlist';
import Loader from './Components/Loader/Loader';
import { useLogic } from './hooks/useLogic';
import Navbar from './Components/NavBarComponents/NavBar';
import AddNewHotel from './Components/NavBarComponents/AddNewHotel';
import Search from './Components/NavBarComponents/Search';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
  
  const addHotel = (hotel) => {
    setHotels((prevHotels) => [...prevHotels, hotel]);
};

  

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
