import FilterComponent from './Components/FilterComponent/FilterComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import { Mainlist } from './Components/MainList/Mainlist';
import Loader from './Components/Loader/Loader';
import { useLogic } from './hooks/useLogic';
import Navbar from './Components/NavBarComponents/NavBar';
import AddNewHotel from './Components/NavBarComponents/AddNewHotel';
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
    searchSubmit,
    addHotel
  } = useLogic();

  return (
    <Router>
      <div>
        <header>
          <Navbar 
            hotels={filteredHotels} 
            setHotels={setHotels}  
            searchSubmit={searchSubmit}
          />
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
            <Route path="/add-new" element={<AddNewHotel addHotel={addHotel} />} />
            
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
