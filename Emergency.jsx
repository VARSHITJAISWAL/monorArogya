import React, { useState } from 'react';
import { FaAmbulance, FaBell, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle, FaTimes, FaUserMd, FaPhoneAlt, FaChevronRight, FaArrowLeft, FaHospitalAlt, FaClipboardCheck } from 'react-icons/fa';
import styles from './Emergency.module.css';

// Custom Animated Button Component for a soft, interactive feel
const SoftActionButton = ({ children, onClick, className = '' }) => (
    <button 
        className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center transition duration-300 transform hover:scale-[1.01] ${styles['soft-action-button']} ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
);

// Helper Component for Status Checks (now with light mode elegance)
const StatusCheck = ({ label, isConfirmed }) => (
    <div className="flex items-center justify-between py-2 text-gray-800">
        <span className={`flex items-center font-medium ${isConfirmed ? 'text-green-700' : 'text-yellow-700'}`}>
            {isConfirmed 
                ? <FaCheckCircle className="mr-3 text-xl text-green-500" /> 
                : <FaTimes className="mr-3 text-xl text-yellow-500" />
            }
            {label}
        </span>
        <FaChevronRight className="text-gray-400 text-sm" />
    </div>
);

const Emergency = () => {
    const [emergencyType, setEmergencyType] = useState('Medical');
    const [description, setDescription] = useState('');

    const handleBookEmergency = () => {
        alert(`Booking ${emergencyType} Emergency: ${description.substring(0, 20)}...`);
    };

    const handleCallAmbulance = () => {
        alert("Calling Ambulance... System initiating call to local emergency services.");
    };

    // --- RENDER START ---
    return (
        // Light background with subtle pattern/gradient from CSS module
        <div className={`min-h-screen p-8 lg:p-12 ${styles['light-aero-background']} text-gray-800 flex justify-center items-center`}>
            
            <div className="w-full max-w-7xl">
                
                {/* Header Bar - Clean and Functional */}
                <header className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <FaArrowLeft className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500 mr-4 transition-colors" onClick={() => console.log('Go Back')} />
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
                            Emergency Services <FaHospitalAlt className="ml-4 text-blue-500 text-3xl" />
                        </h1>
                    </div>
                    <div className="flex space-x-5">
                        <FaBell className="text-2xl text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
                        <FaUserMd className="text-2xl text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* 1. Instant Appointment Card (Main Form Area) */}
                    <div className={`lg:col-span-2 p-8 rounded-3xl shadow-xl ${styles['soft-glass-card']} border-l-4 border-blue-400`}>
                        <h2 className="text-3xl font-bold text-blue-700 mb-7 flex items-center">
                            <FaClipboardCheck className="mr-3 text-3xl" /> Book Instant Appointment
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            
                            {/* Medical Type */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-600 mb-2">Emergency Type</label>
                                <select
                                    value={emergencyType}
                                    onChange={(e) => setEmergencyType(e.target.value)}
                                    className={`w-full p-3 rounded-lg ${styles['input-light-glass']} focus:border-blue-500 focus:ring-blue-200`}
                                >
                                    <option value="Medical">Medical</option>
                                    <option value="Surgical">Surgical</option>
                                    <option value="Trauma">Trauma</option>
                                    <option value="Other">Other (Specify in description)</option>
                                </select>
                            </div>

                            {/* GPS Location */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-600 mb-2">Current Location</label>
                                <div className={`w-full p-3 rounded-lg flex items-center ${styles['input-light-glass']} text-gray-700`}>
                                    <FaMapMarkerAlt className="text-blue-500 mr-3" />
                                    <span>GPS Actively Detecting... <span className="font-semibold text-green-600">New York, NY</span></span>
                                </div>
                            </div>
                            
                            {/* Brief Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600 mb-2">Brief Description of Emergency</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                    placeholder="Please provide details to help us prepare. E.g., 'Severe abdominal pain, conscious', 'Car accident, unconscious, multiple injuries'."
                                    className={`w-full p-3 rounded-lg ${styles['input-light-glass']} focus:border-blue-500 focus:ring-blue-200`}
                                ></textarea>
                            </div>
                        </div>

                        {/* Booking CTA */}
                        <SoftActionButton onClick={handleBookEmergency} className={styles['btn-gradient-red']}>
                            <FaExclamationTriangle className="mr-3 text-xl" /> Book Emergency Appointment
                        </SoftActionButton>
                        <p className="text-center text-xs text-gray-500 mt-3 italic">
                            Your request will be sent to nearby hospitals immediately.
                        </p>
                    </div>

                    
                    {/* 2. Action & Alert Column */}
                    <div className="lg:col-span-1 flex flex-col space-y-8">
                        
                        {/* 2.1. Call Ambulance Card */}
                        <div className={`p-6 rounded-3xl shadow-xl ${styles['soft-glass-card']} border-t-4 border-red-400 flex-grow`}>
                            <h2 className="text-xl font-bold text-red-600 mb-4">Need an Ambulance Now?</h2>
                            <SoftActionButton onClick={handleCallAmbulance} className={styles['btn-gradient-blue']}>
                                <FaAmbulance className="mr-3 text-3xl" /> Call Emergency Services (911 / 108)
                            </SoftActionButton>
                            <p className="text-center text-xs text-gray-500 mt-3 italic">
                                Direct connection to your local emergency dispatch.
                            </p>
                        </div>
                        
                        {/* 2.2. Hospital Alert System Card */}
                        <div className={`p-6 rounded-3xl shadow-xl ${styles['soft-glass-card']} border-t-4 border-green-400`}>
                            <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                                <FaBell className="mr-2 text-2xl" /> Hospital Alert Status
                            </h2>
                            <div className={`p-4 rounded-xl ${styles['alert-status-panel']} space-y-2`}>
                                <StatusCheck 
                                    label={
                                        <>Nearby Hospitals Alerted <span className="text-xs text-gray-600 ml-2">(St. Jude's, Mercy Gen.)</span></>
                                    } 
                                    isConfirmed={true} 
                                />
                                <StatusCheck label="Estimated Arrival Time (ETA): 08 - 12 min" isConfirmed={true} />
                                <StatusCheck label="Hospital Prepped & Awaiting Patient" isConfirmed={true} />
                                <StatusCheck label="Patient Records Secured & Shared" isConfirmed={false} />
                            </div>
                            <p className="text-center text-xs text-gray-500 mt-4 italic">
                                Real-time updates for optimal care coordination.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Footer/Disclaimer */}
                <div className="mt-12 text-center text-sm text-gray-600">
                    <p>
                        <span className="text-red-500 font-bold">Important:</span> This platform is designed for critical emergencies. Please use responsibly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Emergency;