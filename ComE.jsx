import React, { useState } from "react";
import styles from "./ComE.module.css";
import { useNavigate } from "react-router-dom";

const Civics = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to handle navigation to the Arogya Portal
  const handleArogyaNavigation = () => {
    navigate("/Arogya");
  };

  return (
    <div className={styles.container}>
      {/* Top Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>Civics Section <span className={styles.govtText}>(Govt. Of India)</span></h1>
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              <li><a href="#about" className={styles.navLink}>About Us</a></li>
              <li><a href="#services" className={styles.navLink}>Services</a></li>
              <li><a href="#media" className={styles.navLink}>Media</a></li>
              
              <li><a href="#employee" className={styles.navLink}>Employee Corner</a></li>
            </ul>
          </nav>
          <button
            className={styles.hamburger}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
        {isMobileMenuOpen && (
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              <li><a href="#about" className={styles.navLink}>About Us</a></li>
              <li><a href="#services" className={styles.navLink}>Services</a></li>
              <li><a href="#media" className={styles.navLink}>Media</a></li>
              
              <li><a href="#employee" className={styles.navLink}>Employee Corner</a></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Main Content Section */}
      <main className={styles.main}>
        {/* Featured Card Section */}
        <section className={styles.featuredSection}>
          <div className={styles.featuredCard}>
            <h2 className={styles.featuredTitle}>Welcome to the Official Civics Portal</h2>
            <p className={styles.featuredText}>
              Your gateway to government services, information, and citizen engagement.
            </p>
            <div className={styles.serviceGrid}>
              <div className={styles.serviceItem}>
                <h3 className={styles.serviceTitle}>Easy Access</h3>
                <p>Simple and intuitive interface for all users.</p>
              </div>
              <div className={styles.serviceItem}>
                <h3 className={styles.serviceTitle}>Transparent Governance</h3>
                <p>Providing clear and accessible information to the public.</p>
              </div>
            </div>
            <button className={styles.featuredButton} onClick={handleArogyaNavigation}>
              Explore Arogya Portal
            </button>
          </div>
        </section>

        {/* Other Online Services Section */}
        <section className={styles.onlineServices}>
          <h2 className={styles.sectionHeading}>Online Services & Information</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3 className={styles.cardTitle}>SWM <span role="img" aria-label="garbage">🗑️</span></h3>
              <p>Solid Waste Management services.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.cardTitle}>Property Tax <span role="img" aria-label="tax">💰</span></h3>
              <p>Pay your property taxes online.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.cardTitle}>Water Charges <span role="img" aria-label="water">💧</span></h3>
              <p>Manage and pay your water bills.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.cardTitle}>Business <span role="img" aria-label="business">🏢</span></h3>
              <p>Licenses and regulatory services for businesses.</p>
            </div>
          </div>
        </section>
        <hr className={styles.separator} />

        {/* Local Governance Section */}
        <section className={styles.localGovtSection}>
          <h2 className={styles.sectionHeading}>Local Governance</h2>
          <div className={styles.localGovtGrid}>
            <div className={styles.localGovtCard}>
              <h3 className={styles.localGovtTitle}>Nagar Palika</h3>
              <p>Information and services for municipalities.</p>
              <a href="#" className={styles.localGovtLink}>View Details →</a>
            </div>
            <div className={styles.localGovtCard}>
              <h3 className={styles.localGovtTitle}>Nagar Panchayat</h3>
              <p>Services for local village councils.</p>
              <a href="#" className={styles.localGovtLink}>View Details →</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Civics;