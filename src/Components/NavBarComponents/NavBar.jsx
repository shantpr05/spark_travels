import { useNavigate } from 'react-router-dom';  
import Search from './Search'
import styles from './NavBar.module.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const navigate = useNavigate();  

    const handleLogoClick = () => {
        navigate('/');  
    };

    const handleHomeClick = () => {
        navigate('/');  
        window.location.reload(); 
    };

    const handleAddNewClick = () => {
        navigate('/add-new');  
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer} onClick={handleLogoClick} >
                <img 
                    src={logo} alt="Logo" width="250" height="auto"  
                    className={styles.logo}
                />
            </div>
            
            <Search />
            
            <div className={styles.navButtons}>
                <button className={styles.homeButton} onClick={handleHomeClick} aria-label="Go to Home Page">Home</button>
                <button className={styles.addNewButton} onClick={handleAddNewClick}>Add New</button>
            </div>
        </nav>
    );
};

export default Navbar;
