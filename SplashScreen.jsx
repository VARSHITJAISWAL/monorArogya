import React from 'react';
import styles from './SplashScreen.module.css';

const SplashScreen = () => {
  return (
    <div className={styles.splashContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.welcomeText}>
          <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span>
          <br />
          <span>t</span><span>o</span>
          <br />
          <span className={styles.arogya}>Arogya</span> <span>P</span><span>o</span><span>r</span><span>t</span><span>a</span><span>l</span>
        </h1>
        <div className={styles.loaderContainer}>
          <div className={styles.loaderDot}></div>
          <div className={styles.loaderDot}></div>
          <div className={styles.loaderDot}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;