import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import for routing if you're using React Router
import styles from './NavBar.module.css'; // You'll create a CSS file for styling the Navbar

const Navbar = ({searchSubmit}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchSubmit(searchQuery)
    };

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');  // Navigate to the home page
    };

    const handleAddNewClick = () => {
        navigate('/add-new');  // Navigate to the page for adding new items
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img 
                    src="/assets/logo.png" alt="Logo" width="150" height="auto"  // Add your logo URL here
                    className={styles.logo}
                />
            </div>
            
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
            
            <div className={styles.navButtons}>
                <button className={styles.homeButton} onClick={handleHomeClick}>Home</button>
                <button className={styles.addNewButton} onClick={handleAddNewClick}>Add New</button>
            </div>
        </nav>
    );
};

export default Navbar;
