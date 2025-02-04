import {useEffect} from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  useEffect(() => {
    document.title = 'Loading...';
    return () => {
      document.title = 'Spark Stay'; 
    };
  }, []);

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default Loader;