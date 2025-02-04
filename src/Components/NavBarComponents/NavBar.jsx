import { useNavigate } from 'react-router-dom';  // Import for routing if you're using React Router
import Search from './Search'
import styles from './NavBar.module.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const navigate = useNavigate();  // Hook for navigating between pages

    const handleLogoClick = () => {
        navigate('/');  
    };

    // Navigate to the home page
    const handleHomeClick = () => {
        navigate('/');  
        window.location.reload();  // Refresh the page
    };

    // Navigate to the page for adding a new item
    const handleAddNewClick = () => {
        navigate('/add-new');  
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                {/* Logo image and its styling */}
                <img 
                    src={logo} alt="Logo" width="250" height="auto"  
                    className={styles.logo}
                />
            </div>
            
            {/* Search form */}
            <Search />
            
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
