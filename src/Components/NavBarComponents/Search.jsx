import { useState } from 'react';
import styles from './NavBar.module.css';
import {useSearch} from '../../context/SearchContext'


const Search = () => {
    const searchSubmit = useSearch();

    const [searchQuery, setSearchQuery] = useState('');  

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);   // Update search query as the user types
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();   
        searchSubmit(searchQuery)   // Calls the parent component's searchSubmit function with the current search query
    };

    return (          
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <input 
                type="text"
                placeholder="Search for hotels..."
                value={searchQuery} 
                onChange={handleSearchChange}  
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
        </form>       
    );
};

export default Search;
