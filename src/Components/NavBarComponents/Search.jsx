import { useState } from 'react';
import styles from './NavBar.module.css';
import {useSearch} from '../../context/SearchContext'


const Search = () => {
    const searchSubmit = useSearch();

    const [searchQuery, setSearchQuery] = useState('');  // State to store the search query

    // Handles changes in the search input field
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);   // Update search query as the user types
    };

    // Handles the submission of the search form
    const handleSearchSubmit = (event) => {
        event.preventDefault();    // Prevents the default form submit behavior
        searchSubmit(searchQuery)   // Calls the parent component's searchSubmit function with the current search query
    };

    return (          
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <input 
                type="text"
                placeholder="Search for hotels..."
                value={searchQuery}  // Bind the search query to the input value
                onChange={handleSearchChange}  // Update search query on input change
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
        </form>       
    );
};

export default Search;
