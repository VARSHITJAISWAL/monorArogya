import React, { useState, useEffect } from "react";
import styles from "./ComB.module.css";
import { useNavigate } from "react-router-dom";

const ComB = () => {
  const navigate = useNavigate();
  const [uniqueId, setUniqueId] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://bahraincardiology.com/wp-content/uploads/2020/08/img-02-1-770x635.jpg",
    "https://asianheartinstitute.org/wp-content/uploads/2023/12/home-banner-mob.webp",
    "https://web-assets.bcg.com/a0/14/f02018e048518e827ecfca95b962/why-times-are-tough-for-australias-private-hospitals.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4s
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleViewAppointments = () => {
    if (!uniqueId) {
      alert("Please enter a Unique ID to view your appointment.");
    } else {
      navigate(`/appointments/${uniqueId}`);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={`${styles.header} flex justify-between items-center px-6 py-4`}>
        <h1 className="text-white text-3xl font-bold tracking-wide">Hospital Section</h1>
        <button
          className={`${styles.emergencyBtn} text-white px-5 py-2 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105`}
          onClick={() => handleNavigation("/emergency")}
        >
          Emergency Call
        </button>
      </header>

      {/* Navbar */}
      <nav className={`${styles.navbar} shadow flex justify-center py-4 text-gray-700 font-medium`}>
        <span className={`${styles.navItem}`} onClick={() => handleNavigation("/")}>
          Home
        </span>
        <span className={`${styles.navItem}`} onClick={() => handleNavigation("/departments")}>
          Departments
        </span>
        <span className={`${styles.navItem}`} onClick={() => handleNavigation("/doctors")}>
          Doctors
        </span>
        <span className={`${styles.navItem}`} onClick={() => handleNavigation("/Arogya")}>
          Arogya Portal
        </span>
      </nav>

      {/* Hero Section */}
      <section className={`${styles.hero} flex flex-col md:flex-row items-center`}>
        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Comprehensive <br /> Care For You.
          </h2>
          <p className="text-lg text-gray-600 max-w-lg">
            Our mission is to provide world-class medical services with a focus on patient well-being and compassionate care.
          </p>
          <div className="flex flex-col sm:flex-row items-center mt-6">
            <input
              type="text"
              placeholder="Enter your Unique ID"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className={`${styles.uniqueIdInput} p-3 rounded-md border border-gray-300 shadow-sm mr-0 sm:mr-4 mb-4 sm:mb-0 w-full sm:w-auto`}
            />
            <button
              className={`${styles.viewBtn} px-6 py-3 rounded-md font-semibold transition-transform transform hover:scale-105`}
              onClick={handleViewAppointments}
            >
              View My Appointment
            </button>
          </div>
        </div>
        {/* Right Image Slideshow */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <img
            src={images[currentImage]}
            alt="Medical team"
            className={`${styles.heroImage}`}
          />
        </div>
      </section>

      {/* Our Services Section */}
      <section className={`${styles.servicesSection} p-6`}>
        <h3 className={`${styles.sectionHeader}`}>Our Services</h3>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto text-center">
          We are committed to providing a full spectrum of high-quality healthcare services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className={`${styles.serviceCard}`}>
            <span className="text-5xl text-blue-500">🧪</span>
            <h4 className="font-bold mt-4 mb-2">Advanced Diagnostics</h4>
            <p className="text-sm text-gray-600">State-of-the-art lab and imaging facilities for accurate results.</p>
          </div>
          <div className={`${styles.serviceCard}`}>
            <span className="text-5xl text-green-500">💉</span>
            <h4 className="font-bold mt-4 mb-2">Surgical Excellence</h4>
            <p className="text-sm text-gray-600">Experienced surgeons and modern operating rooms for all procedures.</p>
          </div>
          <div className={`${styles.serviceCard}`}>
            <span className="text-5xl text-orange-500">🧑‍⚕️</span>
            <h4 className="font-bold mt-4 mb-2">24/7 Emergency Care</h4>
            <p className="text-sm text-gray-600">Ready to respond to any medical emergency with a dedicated team.</p>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className={`${styles.departmentsSection} p-6 text-center`}>
        <h3 className={`${styles.sectionHeader}`}>Our Medical Departments</h3>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          We offer a wide range of specialized services with a team of experienced professionals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`${styles.card}`} onClick={() => handleNavigation("/pediatrics")}>
            <h3 className="text-xl font-semibold">Pediatrics 👶</h3>
            <p className="text-sm text-gray-600">Specialized care for baby</p>
          </div>
          <div className={`${styles.card}`} onClick={() => handleNavigation("/neurology")}>
            <h3 className="text-xl font-semibold">Neurology 🧠</h3>
            <p className="text-sm text-gray-600">Comprehensive brain and nervous system</p>
          </div>
          <div className={`${styles.card}`} onClick={() => handleNavigation("/orthopedics")}>
            <h3 className="text-xl font-semibold">Orthopedics 🦴</h3>
            <p className="text-sm text-gray-600">Bone and joint care</p>
          </div>
          <div className={`${styles.card}`} onClick={() => handleNavigation("/cardiology")}>
            <h3 className="text-xl font-semibold">Cardiology ❤️</h3>
            <p className="text-sm text-gray-600">24/7 cardiac care with top specialists</p>
          </div>
        </div>
      </section>f

      {/* Contact Section */}
      <section className={`${styles.contactSection} p-8`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Have Questions? We're Here to Help.</h2>
          <p className="text-lg text-white opacity-90 mb-8">
            Our team is ready to answer your questions and guide you on your health journey. Contact us today to learn more.
          </p>
          <button
            className={`${styles.contactBtn} px-8 py-3 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105`}
            onClick={() => handleNavigation("/contact")}
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default ComB;