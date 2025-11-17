import React, { useState, useEffect } from "react";
import styles from "./Hsection.module.css";
import { useNavigate } from "react-router-dom";

// Importing icons for a sleek, modern look
import {
  FaUpload,
  FaCheckCircle,
  FaUserCircle,
  FaAddressCard,
  FaPhone,
  FaHeartbeat,
  FaSearch,
} from "react-icons/fa";

const Hsection = () => {
  const navigate = useNavigate();

  const [uploads, setUploads] = useState({
    certificate: { status: "pending", file: null },
    postmortem: { status: "pending", file: null },
    parents: { status: "pending", file: null },
    medical: { status: "pending", file: null },
  });

  const [verificationProgress, setVerificationProgress] = useState(0);

  useEffect(() => {
    const allUploaded = Object.values(uploads).every((u) => u.file !== null);

    if (allUploaded && verificationProgress < 100) {
      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          const newProgress = prev + 2; // Increase by +2 as requested
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [uploads, verificationProgress]);

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setUploads((prev) => ({
        ...prev,
        [type]: { status: "uploaded", file: file.name },
      }));
    }
  };

  const uploadSections = [
    {
      key: "certificate",
      title: "Upload Death Certificate",
      icon: <FaUpload />,
    },
    {
      key: "postmortem",
      title: "Upload Postmortem Certificate",
      icon: <FaUpload />,
    },
    {
      key: "parents",
      title: "Upload Parent/Relative Report",
      icon: <FaUpload />,
    },
    {
      key: "medical",
      title: "Previous Medical Report",
      icon: <FaUpload />,
    },
  ];

  return (
    <div className={styles.hsectionWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-8">
          <div className="flex items-center space-x-4">
            <div className={styles.logo}>🩺</div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
              Arogya Portal
            </h1>
          </div>
          <button
            className={styles.homeButton}
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 space-y-12 relative z-10">
        {/* User Info Section */}
        <section className={styles.userInfoCard}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={styles.inputGroup}>
              <label>User Name</label>
              <div className="flex items-center">
                <FaUserCircle className="text-xl text-blue-500 mr-3" />
                <input type="text" placeholder="Enter Name" />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Adhar No</label>
              <div className="flex items-center">
                <FaAddressCard className="text-xl text-blue-500 mr-3" />
                <input type="text" placeholder="XXXX-XXXX-XXXX" />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Cause of Death</label>
              <div className="flex items-center">
                <FaHeartbeat className="text-xl text-blue-500 mr-3" />
                <input type="text" placeholder="Cause of death" />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Phone No</label>
              <div className="flex items-center">
                <FaPhone className="text-xl text-blue-500 mr-3" />
                <input type="text" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Verification Stage</label>
              <div className="flex items-center">
                <FaSearch className="text-xl text-blue-500 mr-3" />
                <input
                  type="text"
                  value={verificationProgress < 100 ? "In Progress" : "Completed"}
                  readOnly
                />
              </div>
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {uploadSections.map((item) => (
            <div key={item.key} className={styles.uploadCard}>
              <div className="text-center mb-4">
                <div className={styles.uploadIcon}>{item.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <label className={styles.uploadButton}>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, item.key)}
                  className="hidden"
                />
                Browse
              </label>
              {uploads[item.key].file && (
                <p className="mt-3 text-sm text-green-600 font-medium">
                  <FaCheckCircle className="inline mr-2" /> Uploaded: {uploads[item.key].file}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Verification Status */}
        <section className={styles.statusCard}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Verification Process Status</h2>
          <div className={styles.progressBarWrapper}>
            <div
              className={styles.progressBar}
              style={{ width: `${verificationProgress}%` }}
            ></div>
          </div>
          <span className="text-center font-bold text-lg mt-3 text-gray-500 block">
            {verificationProgress > 0 ? `${verificationProgress}% Completed` : "Awaiting Uploads..."}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {uploadSections.map((item) => (
              <div
                key={item.key}
                className={`flex items-center p-3 rounded-lg ${
                  uploads[item.key].file ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                {uploads[item.key].file ? (
                  <FaCheckCircle className="text-green-500 mr-3 text-lg" />
                ) : (
                  <FaSearch className="text-yellow-500 mr-3 text-lg" />
                )}
                <span className="font-medium text-gray-700">{item.title}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hsection;