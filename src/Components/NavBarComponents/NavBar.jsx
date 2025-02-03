import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import for routing if you're using React Router
import styles from './NavBar.module.css';
import logo from '../../assets/logo.png';

const Navbar = ({searchSubmit}) => {
    const [searchQuery, setSearchQuery] = useState('');  // State to store the search query

    // Handles changes in the search input field
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);   // Update search query as the user types
    };

    // Handles the submission of the search form
    const handleSearchSubmit = (e) => {
        e.preventDefault();    // Prevents the default form submit behavior
        searchSubmit(searchQuery)   // Calls the parent component's searchSubmit function with the current search query
    };

    const navigate = useNavigate();  // Hook for navigating between pages

    // Navigate to the home page
    const handleHomeClick = () => {
        navigate('/');  // Navigate to the home page
    };

    // Navigate to the page for adding a new item
    const handleAddNewClick = () => {
        navigate('/add-new');  // Navigate to the page for adding new items
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                {/* Logo image and its styling */}
                <img 
                    src={logo} alt="Logo" width="250" height="auto"  
                    className={styles.logo}
                />
            </div>
            
            {/* Search form */}
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
            
            {/* Navigation buttons */}
            <div className={styles.navButtons}>
                {/* Home button to navigate to the home page */}
                <button className={styles.homeButton} onClick={handleHomeClick} aria-label="Go to Home Page">Home</button>
                {/* Add new item button to navigate to the page for adding new items */}
                <button className={styles.addNewButton} onClick={handleAddNewClick}>Add New</button>
            </div>
        </nav>
    );
};

export default Navbar;
