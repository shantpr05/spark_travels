import { useNavigate } from "react-router-dom";
import Search from "./Search";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  // this can be simplified to
  const handleNavigation = (path, reload = false) => {
    navigate(path);
    if (reload) window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.logoContainer}
        onClick={() => handleNavigation("/")}
      >
        <img
          src={logo}
          alt="Logo"
          width="250"
          height="auto"
          className={styles.logo}
        />
      </div>

      <Search />

      <div className={styles.navButtons}>
        <button
          className={styles.homeButton}
          // then this on click will be using this function
          onClick={() => handleNavigation("/", true)}
          aria-label="Go to Home Page"
        >
          Home
        </button>
        <button
          className={styles.addNewButton}
          // then this on click will be using this function
          onClick={() => handleNavigation("/add-new")}
        >
          Add New
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
