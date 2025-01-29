import { React } from 'react';
import FilterComponent from './Components/FilterComponent/FilterComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';

const App = () => {
  return (
    <div>
      <header>
        <h1>Hotel Finder</h1>
      </header>
      <main>
        <FilterComponent  />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  );
};

export default App;
