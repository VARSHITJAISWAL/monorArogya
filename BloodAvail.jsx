import React from 'react';
import styles from './BloodAvail.module.css';
import { FaSearch, FaBell, FaHome, FaMapMarkerAlt, FaUser, FaPlus, FaArrowLeft } from 'react-icons/fa';

const hospitalData = [
    {
        name: "St. Jude's Hospital",
        units: 3,
        distance: "2.5 km from your location",
        contact: "(555) 123-4567",
    },
    {
        name: "General Hospital",
        units: 1,
        distance: "5.1 km from your location",
        contact: "(555) 246-8000",
    },
    // Add more hospitals as needed
];

const BloodAvail = () => {
    // Dummy navigation/action handlers
    const handleNavigation = (path) => { console.log(`Navigating to ${path}`); };
    const handleRequest = (hospital) => { alert(`Requesting blood from ${hospital.name}`); };

    const bloodGroups = ['A+', 'A-', 'B+', 'AB+', 'O+', 'O-'];
    const searchRadii = ['10km', '5km']; // Assuming 5km is selected

    return (
        <div className={styles.container}>
            {/* HEADER */}
            <header className={styles.header}>
                <div className={styles.logo}>Arogya Portal</div>
                <div className={styles.searchBar}>
                    <input 
                        type="text" 
                        className={styles.searchInput} 
                        placeholder="Search for services, doctors, or reports..." 
                    />
                    <FaSearch className={styles.searchIcon} />
                </div>
                <div className={styles.headerIcons}>
                    <button className={styles.iconButton} onClick={() => alert("Notifications")}><FaBell /></button>
                    <button className={styles.iconButton} onClick={() => handleNavigation("/location")}><FaMapMarkerAlt /></button>
                    <button className={styles.iconButton} onClick={() => handleNavigation("/")}><FaHome /></button>
                    <button className={`${styles.iconButton} ${styles.profileIcon}`} onClick={() => handleNavigation("/profile")}><FaUser /></button>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className={styles.mainContent}>
                <div className={styles.pageHeader}>
                    <button className={styles.backButton} onClick={() => handleNavigation("/dashboard")}><FaArrowLeft /></button>
                    <h2 className={styles.pageTitle}>Check Blood Availability</h2>
                </div>

                <div className={styles.contentGrid}>
                    {/* LEFT SEARCH PANEL */}
                    <div className={styles.searchPanel}>
                        <h3 className={styles.sectionTitle}>Blood Group</h3>
                        <div className={styles.bloodGroupSelector}>
                            {bloodGroups.map(group => (
                                <button
                                    key={group}
                                    className={`${styles.groupButton} ${group === 'A+' ? styles.selected : ''}`}
                                >
                                    {group}
                                </button>
                            ))}
                        </div>

                        <div className={styles.locationInputWrapper}>
                            <FaSearch className={styles.locationSearchIcon} />
                            <input 
                                type="text" 
                                placeholder="Enter location or use current" 
                                className={styles.locationInput} 
                            />
                            <button className={styles.currentLocationButton}><FaPlus /></button>
                        </div>
                        
                        <h3 className={styles.sectionTitle}>Search Radius</h3>
                        <div className={styles.searchRadiusSelector}>
                            {searchRadii.map(radius => (
                                <button 
                                    key={radius}
                                    className={`${styles.radiusButton} ${radius === '5km' ? styles.selectedRadius : ''}`}
                                >
                                    {radius}
                                </button>
                            ))}
                            <button className={styles.currentLocationText}>Current Location</button>
                        </div>

                        <button className={styles.searchButtonLarge}>Search</button>
                    </div>

                    {/* RIGHT AVAILABILITY PANEL */}
                    <div className={styles.availabilityPanel}>
                        <h3 className={styles.sectionTitleAvailability}>Nearby Availability</h3>
                        {hospitalData.map((hospital, index) => (
                            <div key={index} className={styles.hospitalCard}>
                                <div className={styles.cardHeader}>
                                    <h4 className={styles.hospitalName}>{hospital.name}</h4>
                                    <div className={styles.unitDisplay}>{hospital.units}</div>
                                </div>
                                <p className={styles.unitInfo}>O+ Available Units: <span>{hospital.units}</span></p>
                                <p className={styles.distance}>{hospital.distance}</p>
                                <p className={styles.contact}>Contact: <a href={`tel:${hospital.contact.replace(/\D/g,'')}`}>{hospital.contact}</a></p>
                                
                                <button 
                                    className={styles.requestButton}
                                    onClick={() => handleRequest(hospital)}
                                >
                                    Request Blood
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer className={styles.footer}>
                <div className={styles.footerLinks}>
                    <span>Privacy Policy</span>
                    <span>About Us</span>
                    <span>Contact & Support</span>
                </div>
                <span className={styles.copyright}>
                    © 2025 Arogya Portal. All rights reserved.
                </span>
            </footer>
        </div>
    );
};

export default BloodAvail;