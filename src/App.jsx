import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FooterComponent from "./Components/FooterComponent/FooterComponent";
import { Mainlist } from "./Components/MainList/Mainlist";
import Loader from "./Components/Loader/Loader";
import { useLogic } from "./hooks/useLogic";
import Navbar from "./Components/NavBarComponents/NavBar";
import AddNewHotel from "./Components/AddNew/AddNewHotel";
import { SearchProvider } from "./context/SearchContext";

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
    addHotel,
  } = useLogic();

  return (
    // div can be removed
    <Router>
      <header>
        <SearchProvider searchSubmit={searchSubmit}>
          <Navbar hotels={filteredHotels} setHotels={setHotels} />
        </SearchProvider>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <Loader />
              ) : (
                <Mainlist
                  hotels={filteredHotels}
                  locations={locations}
                  locationFilter={locationFilter}
                  setLocationFilter={setLocationFilter}
                  categories={categories}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  setHotels={setHotels}
                />
              )
            }
          />
          <Route
            path="/add-new"
            element={<AddNewHotel addHotel={addHotel} />}
          />
        </Routes>
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </Router>
  );
};

export default App;
