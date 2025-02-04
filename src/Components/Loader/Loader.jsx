import React from 'react';
import styles from './Loader.module.css';

// Loader component displays a loading spinner while data is being fetched or processed.
const Loader = () => (
  <div className={styles.loaderContainer}>
    {/* The loader div contains the spinning animation */}
    <div className={styles.loader}></div>
  </div>
);

export default Loader;
