import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Arogya.module.css";

const Arogya = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.title}>Arogya Portal</h1>
        <p className={styles.subtitle}>
          Your gateway to comprehensive health and civic services.
        </p>
      </section>

      {/* Main Content & Navigation Cards */}
      <main className={styles.mainContent}>
        <p className={styles.infoText}>
          The Arogya Portal provides integrated access to key services. Navigate to the
          Hospital Section for all health-related needs or the Civics Section for public services
          and information.
        </p>
        <div className={styles.cardsGrid}>
          {/* Hospital Section Card */}
          <div
            className={styles.card}
            onClick={() => handleNavigation("/Hsection")}
          >
            <span role="img" aria-label="hospital" className={styles.icon}>🏥</span>
            <h2 className={styles.cardTitle}>Hospital Section</h2>
            <p className={styles.cardText}>
              Find doctors, book appointments, and access medical records.
            </p>
          </div>

          {/* Civics Section Card */}
          <div
            className={styles.card}
            onClick={() => handleNavigation("/Csection")}
          >
            <span role="img" aria-label="civics" className={styles.icon}>🏛️</span>
            <h2 className={styles.cardTitle}>Civics Section</h2>
            <p className={styles.cardText}>
              Explore government schemes, pay taxes, and access public services.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Arogya;