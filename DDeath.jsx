import React, { useState } from 'react';
import { 
    FaArrowLeft, FaSearch, FaUserCheck, FaKey, FaHospitalAlt, 
    FaCalendarAlt, FaFileAlt, FaCheckCircle, FaSpinner, 
    FaPrint, FaDownload, FaShareAlt, FaBell, FaGlobe, FaIdCard, FaCreditCard, FaCar, FaHome, FaTimesCircle 
} from 'react-icons/fa';
import styles from './DDeath.module.css';

// Dummy Data
const certificateData = {
    name: "John Alexander Doe",
    dateOfBirth: "01/03/1998",
    dateOfDeath: "15/10/2023",
    causeOfDeath: "Cardiac Arrest",
    hospital: "City General Hospital",
    digitalSignature: "Verified",
    verificationStatus: "COMPLETED"
};

const initialLinkingStatus = [
    { id: 1, name: "Voter ID Deactivation", icon: FaIdCard, status: "COMPLETED", time: "25S 12:44 AM" },
    { id: 2, name: "Ration Card Status Update", icon: FaHome, status: "COMPLETED", time: "25S 12:44 AM" },
    { id: 3, name: "Nominee Notification (Bank Accounts)", icon: FaCreditCard, status: "IN_PROGRESS", time: "25S 01:00 AM" },
    { id: 4, name: "Insurance Company Notification", icon: FaCar, status: "PENDING", time: "" },
    { id: 5, name: "Land/Property Linking Completion", icon: FaHome, status: "PENDING", time: "" },
];

const DDeath = () => {
    const [aadhaar, setAadhaar] = useState('');
    const [otp, setOtp] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Assuming authenticated for desktop view demo
    const [linkingStatus, setLinkingStatus] = useState(initialLinkingStatus);

    const handleAuthenticate = () => {
        // Mock Authentication Logic
        if (aadhaar.length === 12 && otp.length === 6) {
            setIsAuthenticated(true);
            alert("Authentication Successful!");
        } else {
            alert("Please enter valid credentials.");
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "COMPLETED":
                return <FaCheckCircle className="text-green-500 text-lg" />;
            case "IN_PROGRESS":
                return <FaSpinner className="text-yellow-500 text-lg animate-spin" />;
            case "PENDING":
                return <FaTimesCircle className="text-gray-400 text-lg" />;
            default:
                return <FaGlobe className="text-blue-500 text-lg" />;
        }
    };

    // --- RENDER START ---
    return (
        <div className={`min-h-screen p-8 ${styles['soft-aero-background']}`}>
            <header className="flex justify-between items-center mb-8 border-b pb-4 border-gray-200">
                <div className="flex items-center">
                    <FaArrowLeft className="text-2xl text-gray-700 mr-4 cursor-pointer hover:text-blue-600 transition" />
                    <h1 className="text-3xl font-extrabold text-gray-900">Digital Death Certificate Portal</h1>
                </div>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search related documents..."
                        className={`py-2 px-4 pl-10 rounded-full ${styles['input-clean']} shadow-sm`}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 1. AUTHENTICATION & CERTIFICATE VIEW (LEFT COLUMN) */}
                <div className="lg:col-span-1 space-y-8">
                    
                    {/* Authentication Card */}
                    <div className={`p-6 rounded-2xl ${styles['glass-card']} shadow-xl`}>
                        <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center"><FaKey className="mr-2" /> 1. Certificate Access (OTP)</h2>
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="Enter 12-digit Aadhaar number" 
                                value={aadhaar}
                                onChange={(e) => setAadhaar(e.target.value)}
                                className={`w-full p-3 rounded-lg ${styles['input-clean']}`}
                                disabled={isAuthenticated}
                            />
                            <input 
                                type="password" 
                                placeholder="Enter OTP" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className={`w-full p-3 rounded-lg ${styles['input-clean']}`}
                                disabled={isAuthenticated}
                            />
                            <div className="flex items-center">
                                <input type="checkbox" id="relationship" className="mr-2" disabled={isAuthenticated} />
                                <label htmlFor="relationship" className="text-sm text-gray-600">Relationship to Deceased</label>
                            </div>
                            <button 
                                onClick={handleAuthenticate}
                                className={`w-full py-3 rounded-xl font-bold transition ${isAuthenticated ? 'bg-green-500/70 text-white cursor-default' : styles['btn-blue-gradient']}`}
                                disabled={isAuthenticated}
                            >
                                {isAuthenticated ? <><FaCheckCircle className="inline mr-2" /> Access Granted</> : "Authenticate & View"}
                            </button>
                        </div>
                    </div>

                    {/* Digital Death Certificate Preview */}
                    <div className={`p-6 rounded-2xl ${styles['glass-card-focus']} shadow-2xl border-l-4 border-blue-500`}>
                        <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center"><FaFileAlt className="mr-2" /> Certificate Details</h2>
                        <div className="flex space-x-4">
                            <div className="w-1/3 p-2 bg-gray-100 rounded-lg flex items-center justify-center">
                                {/* Placeholder for Document Icon/Image */}
                                <img src="https://via.placeholder.com/80x100?text=Cert" alt="Certificate Preview" className="h-24 w-auto rounded" />
                            </div>
                            <div className="w-2/3 space-y-1 text-sm">
                                <p className="font-extrabold text-lg text-gray-900">{certificateData.name}</p>
                                <p><span className="font-semibold">DOB:</span> {certificateData.dateOfBirth}</p>
                                <p><span className="font-semibold">DOD:</span> <span className="text-red-600 font-bold">{certificateData.dateOfDeath}</span></p>
                                <p><span className="font-semibold">Cause:</span> {certificateData.causeOfDeath}</p>
                                <p><span className="font-semibold">Hospital:</span> {certificateData.hospital}</p>
                                <div className="mt-2 text-green-600 font-bold flex items-center">
                                    <FaUserCheck className="mr-1" /> VERIFICATION STATUS: {certificateData.verificationStatus}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. KEY ACTIONS & RELATED INFORMATION (MIDDLE COLUMN) */}
                <div className="lg:col-span-1 space-y-8">
                    
                    {/* Key Actions Card */}
                    <div className={`p-6 rounded-2xl ${styles['glass-card']} shadow-xl`}>
                        <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center"><FaBell className="mr-2" /> 2. Key Actions</h2>
                        <div className="space-y-3">
                            <ActionItem icon={FaPrint} name="Print Certificate" status="COMPLETED" />
                            <ActionItem icon={FaDownload} name="Download Certified PDF" status="COMPLETED" />
                            <ActionItem icon={FaShareAlt} name="Share Securely (DigiLocker)" status="COMPLETED" />
                        </div>
                    </div>
                    
                    {/* Related Information Card */}
                    <div className={`p-6 rounded-2xl ${styles['glass-card']} shadow-xl`}>
                        <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center"><FaFileAlt className="mr-2" /> Related Documentation</h2>
                        <div className="space-y-3">
                            <ActionItem icon={FaFileAlt} name="Front Certificate" status="VIEWED" />
                            <ActionItem icon={FaDownload} name="Download Medical Summary" status="IN_PROGRESS" />
                            <ActionItem icon={FaShareAlt} name="Share to Next of Kin" status="PENDING" />
                        </div>
                    </div>

                    {/* Quick Notify Card */}
                    <div className={`p-6 rounded-2xl ${styles['medication-focus-panel']} shadow-xl`}>
                        <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center"><FaBell className="mr-2" /> Quick Notify</h2>
                        <button className="w-full py-3 rounded-xl text-white font-bold bg-green-500 hover:bg-green-600 transition">
                            Notify All Linked Databases
                        </button>
                    </div>
                </div>

                {/* 3. GOVERNMENT DATABASE LINKING STATUS (RIGHT COLUMN) */}
                <div className="lg:col-span-1">
                    <div className={`p-6 rounded-2xl ${styles['glass-card-focus']} shadow-2xl border-t-4 border-green-500`}>
                        <h2 className="text-xl font-bold text-green-700 mb-6 flex items-center"><FaGlobe className="mr-2" /> 3. Government Linking Status</h2>
                        <div className={styles['status-timeline-container']}>
                            {linkingStatus.map((item, index) => (
                                <StatusTimelineItem 
                                    key={item.id}
                                    item={item}
                                    isLast={index === linkingStatus.length - 1}
                                    getStatusIcon={getStatusIcon}
                                />
                            ))}
                        </div>
                        <div className="mt-6 p-3 text-sm bg-gray-100 rounded-lg">
                            <p className="text-gray-700">Linking is auto-initiated. Check back in 24 hours for completion status.</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-12 text-center text-sm text-gray-500 border-t pt-4 border-gray-200">
                <p>© 2025 Government Digital Portal. Secure Record Management.</p>
            </footer>
        </div>
    );
};

// Helper Component: Single Action Item
const ActionItem = ({ icon: Icon, name, status }) => {
    const statusColor = status === "COMPLETED" ? 'text-green-500' : (status === "IN_PROGRESS" ? 'text-yellow-500' : 'text-red-500');
    return (
        <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition">
            <div className="flex items-center text-gray-700 font-medium">
                <Icon className={`mr-3 ${statusColor}`} />
                {name}
            </div>
            {status === "COMPLETED" && <FaCheckCircle className="text-green-500" />}
            {status === "IN_PROGRESS" && <FaSpinner className="text-yellow-500 animate-spin" />}
            {status === "PENDING" && <FaTimesCircle className="text-gray-400" />}
        </div>
    );
};

// Helper Component: Timeline Status Item
const StatusTimelineItem = ({ item, isLast, getStatusIcon }) => (
    <div className={`relative flex ${!isLast ? 'pb-8' : ''}`}>
        {/* Timeline Line */}
        {!isLast && <div className={styles['timeline-v-line']}></div>}
        
        {/* Timeline Dot/Icon */}
        <div className={styles['timeline-dot-bg']}>
            <div className={styles['timeline-dot']}>
                {getStatusIcon(item.status)}
            </div>
        </div>

        {/* Content */}
        <div className="flex-grow ml-8 -mt-2">
            <p className="font-semibold text-gray-800">{item.name}</p>
            {item.status === "COMPLETED" && <p className="text-xs text-green-600 mt-1">Completed: {item.time}</p>}
            {item.status === "IN_PROGRESS" && <p className="text-xs text-yellow-600 mt-1">Processing...</p>}
            {item.status === "PENDING" && <p className="text-xs text-gray-500 mt-1">Awaiting initiation.</p>}
        </div>
    </div>
);

export default DDeath;