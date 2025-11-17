import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { 
  FaUser, FaMapMarkerAlt, FaHome, FaSearch, FaBell,
  FaCalendarAlt, FaTint, FaCampground, FaAmbulance, 
  FaFileContract, FaHandHoldingHeart, FaFileMedical, FaFileAlt, FaIdCard
} from "react-icons/fa";

const cardData = [
  { title: "Appointment", path: "/Appointment", icon: FaCalendarAlt, class: styles.card1 },
  { title: "Blood Availability", path: "/BloodAvail", icon: FaTint, class: styles.card2 },
  { title: "Blood Camp", path: "/CampBlood", icon: FaCampground, class: styles.card3 },
  { title: "Emergency", path: "/emergency", icon: FaAmbulance, class: styles.card4 },
  { title: "Govt Schemes", path: "/GovScheme", icon: FaFileContract, class: styles.card5 },
  { title: "Organ Donation", path: "/Organ", icon: FaHandHoldingHeart, class: styles.card6 },

  // 🩺 New Arogya Card Details Section Added Here
  { title: "Arogya Card Details", path: "/ArogyaCard", icon: FaIdCard, class: styles.cardNew },

  { title: "Reports & Prescriptions", path: "/Report", icon: FaFileMedical, class: styles.card7 },
  { title: "Death Certificate", path: "/DDeath", icon: FaFileAlt, class: styles.card8 },
];

const Profile = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>Arogya Portal</div>
          <div className={styles.searchBar}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search for services, doctors..." 
            />
            <button className={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
        </div>
        <div className={styles.headerIcons}>
          <button className={`${styles.iconButton} ${styles.iconNeumorphic}`} onClick={() => alert("Notifications")}>
            <FaBell />
          </button>
          <button className={`${styles.iconButton} ${styles.iconNeumorphic}`} onClick={() => handleNavigation("/location")}>
            <FaMapMarkerAlt />
          </button>
          <button className={`${styles.iconButton} ${styles.iconNeumorphic}`} onClick={() => handleNavigation("/")}>
            <FaHome />
          </button>
          <button className={`${styles.iconButton} ${styles.profileIcon}`} onClick={() => handleNavigation("/Card")}>
            <FaUser />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className={styles.mainContent}>
        <h2 className={styles.dashboardTitle}>Quick Access Services</h2>

        {/* CARDS WRAPPER */}
        <div className={styles.cardsWrapper}>
          {cardData.map((item, index) => (
            <div key={index} className={styles.cardContainer}>
              <div
                className={`${styles.card} ${item.class}`}
                onClick={() => handleNavigation(item.path)}
              >
                <div className={styles.cardIcon}>
                  <item.icon />
                </div>
                <p className={styles.cardTitle}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
            <span onClick={() => handleNavigation("/privacy")}>Privacy Policy</span>
            <span onClick={() => handleNavigation("/about")}>About Us</span>
            <span onClick={() => handleNavigation("/contact")}>Contact & Support</span>
        </div>
        <span className={styles.copyright}>
          © 2025 Arogya Portal. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default Profile;
