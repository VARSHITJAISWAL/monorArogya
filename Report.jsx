import React, { useState } from 'react';
import { 
    FaSearch, FaFilter, FaDownload, FaShareAlt, FaCalendarAlt, 
    FaPills, FaFileMedicalAlt, FaFileContract, FaBell, FaPlusCircle, 
    FaBars, FaUser, FaClock, FaRegCheckCircle, FaExclamationTriangle,
    FaHospitalAlt, FaPrint, FaRegWindowMaximize // Added FaHospitalAlt, FaPrint, FaRegWindowMaximize
} from 'react-icons/fa';
import styles from './Report.module.css';

// Dummy Data
const initialReports = [
    { id: 1, type: "Lab Results", date: "Oct 25, 2024", doctor: "Dr. Anya Sharma", hospital: "City Hospital", medication: "Atorvastatin (30-day supply)", status: "New", isRefill: true, refillDays: 2 },
    { id: 2, type: "Discharge Summary", date: "Sep 10, 2024", doctor: "Dr. Ben Carter", hospital: "General Medical", medication: "None", status: "Viewed", isRefill: false, refillDays: 0 },
    { id: 3, type: "Prescription", date: "Aug 01, 2024", doctor: "Dr. Anya Sharma", hospital: "City Hospital", medication: "Lisinopril (90-day supply)", status: "Viewed", isRefill: true, refillDays: 45 },
    { id: 4, type: "Imaging Report", date: "Mar 15, 2024", doctor: "Dr. Evelyn Reed", hospital: "St. Jude's Clinic", medication: "None", status: "Viewed", isRefill: false, refillDays: 0 },
    { id: 5, type: "Vaccination Record", date: "Jan 10, 2024", doctor: "Dr. Anya Sharma", hospital: "City Hospital", medication: "Flu Shot", status: "Viewed", isRefill: false, refillDays: 0 },
];

const reportTypes = ["All", "Prescription", "Lab Results", "Imaging Report", "Discharge Summary"];

// Helper Component: Custom Timeline Item
const TimelineItem = ({ report, isSelected, onClick }) => {
    const Icon = report.type.includes('Lab') ? FaFileMedicalAlt : (report.type.includes('Prescription') ? FaPills : (report.type.includes('Imaging') ? FaRegWindowMaximize : FaFileContract));
    const dateObj = new Date(report.date);

    return (
        <div className={`flex items-start mb-6 cursor-pointer ${styles['timeline-item']} ${isSelected ? styles['timeline-selected'] : ''}`} onClick={() => onClick(report)}>
            <div className={`${styles['timeline-dot']} ${report.status === 'New' ? 'bg-red-500 shadow-md shadow-red-300' : 'bg-blue-500'}`}>
                <Icon className="text-white text-xs" />
            </div>
            
            <div className="flex-grow ml-6 p-4 rounded-xl transition-all duration-300 transform hover:translate-x-1">
                <div className="text-xs text-gray-500 mb-1 flex items-center">
                    <FaCalendarAlt className="mr-1" /> {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h4 className="font-bold text-gray-900 text-lg leading-tight">{report.type}</h4>
                <p className="text-sm text-gray-600 truncate">Dr. {report.doctor.split(' ')[1]} / {report.hospital}</p>
            </div>
        </div>
    );
};

// Helper Component: Status Alert Card
const StatusAlertCard = ({ report }) => (
    <div className={`p-6 rounded-2xl ${styles['medication-focus-panel']} shadow-lg`}>
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-green-700 flex items-center">
                <FaBell className="mr-3 text-2xl text-yellow-600 animate-pulse" /> Urgent Alerts
            </h3>
            <span className="text-xs text-gray-500">Last updated: Today</span>
        </div>
        <div className="mt-4 space-y-3">
            <p className="font-semibold text-gray-800 flex items-center">
                <FaRegCheckCircle className="text-green-500 mr-2" /> New Lab Report: **{report.type} ({report.date})** is available.
            </p>
            {report.isRefill && (
                <p className="font-semibold text-gray-800 flex items-center">
                    <FaClock className="text-red-500 mr-2" /> Refill Due: **{report.medication.split(' ')[0]}** needed in **{report.refillDays} days**.
                </p>
            )}
            <button className="text-blue-500 font-medium text-sm hover:text-blue-700 mt-2">Manage Reminders →</button>
        </div>
    </div>
);


const Report = () => {
    const [reports, setReports] = useState(initialReports);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [selectedReport, setSelectedReport] = useState(initialReports[0]);

    const filteredReports = reports.filter(r => 
        (filterType === 'All' || r.type === filterType) &&
        (r.doctor.toLowerCase().includes(searchTerm.toLowerCase()) || r.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDownload = (report) => {
        alert(`Downloading ${report.type} from ${report.date}...`);
    };

    const handleShare = (report) => {
        alert(`Sharing ${report.type} link...`);
    };

    const handleSetReminder = (medication) => {
        alert(`Setting reminder for ${medication}...`);
    };

    // --- RENDER START ---
    return (
        <div className={`flex min-h-screen ${styles['soft-aero-background']}`}>
            
            {/* 1. SIDEBAR / NAV */}
            <aside className="w-64 bg-white/80 backdrop-blur-xl shadow-xl p-6 border-r border-gray-100 hidden lg:block">
                <div className="text-left mt-4 mb-12">
                    <h2 className="text-3xl font-extrabold text-blue-800">Medi<span className="text-red-500">Records</span></h2>
                </div>
                {/* Nav Items */}
                <div className="space-y-3">
                    <div className="p-4 rounded-xl text-white font-bold bg-blue-500/90 shadow-lg shadow-blue-500/30 flex items-center">
                        <FaFileMedicalAlt className="text-xl mr-3" />Reports & Prescriptions
                    </div>
                    <div className="p-4 rounded-xl text-gray-600 hover:bg-gray-100/70 flex items-center transition-colors">
                        <FaCalendarAlt className="text-xl mr-3" />Appointments
                    </div>
                    <div className="p-4 rounded-xl text-gray-600 hover:bg-gray-100/70 flex items-center transition-colors">
                        <FaUser className="text-xl mr-3" />Profile & Billing
                    </div>
                </div>
                <div className="mt-12 pt-6 border-t border-gray-100">
                    <button className="w-full py-3 rounded-full text-blue-600 border border-blue-200 hover:bg-blue-50/70 font-semibold flex items-center justify-center">
                        <FaPlusCircle className="mr-2" /> Add New Document
                    </button>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-grow p-10">
                
                {/* Header with Alerts */}
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Your Health Documentation Hub 🩺</h1>
                    <div className="flex items-center space-x-4">
                        <FaBell className="text-2xl text-red-500 hover:text-red-600 cursor-pointer animate-shake" />
                        <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-800 border-2 border-white shadow-md">DR</div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* 2.1. REPORTS TIMELINE (Left Column) */}
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <div className={`p-6 rounded-3xl ${styles['glass-card']} shadow-xl`}>
                            <h2 className="text-2xl font-bold text-blue-700 mb-4">Historical Timeline ({filteredReports.length})</h2>

                            {/* Search */}
                            <div className="relative mb-4">
                                <input 
                                    type="text" 
                                    className={`w-full p-3 pl-10 rounded-full ${styles['input-clean']} shadow-sm`} 
                                    placeholder="Search by Doctor, Date, or Type..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            </div>

                            {/* Pill-Tab Filter Navigation */}
                            <div className={`flex flex-wrap gap-2 mb-6 p-2 rounded-xl bg-gray-100/70 ${styles['form-section']}`}>
                                {reportTypes.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                            filterType === type 
                                                ? 'bg-blue-600 text-white shadow-md' 
                                                : 'bg-white text-gray-700 hover:bg-blue-50'
                                        }`}
                                    >
                                        {type === 'All' ? 'All Records' : type}
                                    </button>
                                ))}
                            </div>

                            {/* The actual Timeline List */}
                            <div className={`max-h-[60vh] overflow-y-auto pr-4 ${styles['custom-scrollbar']}`}>
                                <div className={styles['timeline-line']}>
                                    {filteredReports.length > 0 ? (
                                        filteredReports.map((report) => (
                                            <TimelineItem 
                                                key={report.id} 
                                                report={report} 
                                                isSelected={selectedReport && selectedReport.id === report.id} 
                                                onClick={setSelectedReport}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 italic mt-10">No records found matching criteria.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2.2. FOCUS CARD & SUMMARY (Right Column) */}
                    <div className="lg:col-span-2 order-1 lg:order-2">
                        {/* Status Alert Card (Top of Right Column) */}
                        {initialReports.find(r => r.status === 'New' || r.isRefill) && (
                            <div className="mb-8">
                                <StatusAlertCard report={initialReports.find(r => r.status === 'New' || r.isRefill) || initialReports[0]} />
                            </div>
                        )}

                        {selectedReport && (
                            <div className={`p-8 rounded-3xl ${styles['glass-card-focus']} shadow-2xl border-t-4 border-blue-500`}>
                                <div className="flex justify-between items-start mb-6 border-b pb-4 border-gray-100">
                                    <h2 className="text-3xl font-extrabold text-blue-800">{selectedReport.type} Details</h2>
                                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${selectedReport.status === 'New' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {selectedReport.status}
                                    </span>
                                </div>
                                
                                {/* Key Details Grid */}
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 text-lg border-b pb-6 border-gray-100">
                                    <p className="text-gray-600 flex items-center"><FaUser className="mr-3 text-blue-400" /> **Attending Doctor:** <span className="font-semibold text-gray-800 ml-2">Dr. {selectedReport.doctor}</span></p>
                                    <p className="text-gray-600 flex items-center"><FaHospitalAlt className="mr-3 text-blue-400" /> **Facility:** <span className="font-semibold text-gray-800 ml-2">{selectedReport.hospital}</span></p>
                                    <p className="text-gray-600 flex items-center"><FaCalendarAlt className="mr-3 text-blue-400" /> **Date of Service:** <span className="font-semibold text-gray-800 ml-2">{selectedReport.date}</span></p>
                                    <p className="text-gray-600 flex items-center"><FaFileMedicalAlt className="mr-3 text-blue-400" /> **Document ID:** <span className="font-semibold text-gray-800 ml-2">MRD-{selectedReport.id * 1000}</span></p>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex space-x-4 mb-8">
                                    <button 
                                        className={`flex-grow py-3 rounded-full text-white font-bold transition ${styles['btn-blue-gradient']} shadow-lg shadow-blue-500/30`}
                                        onClick={() => handleDownload(selectedReport)}
                                    >
                                        <FaDownload className="mr-2" /> Download Full Report (PDF)
                                    </button>
                                    <button 
                                        className={`w-36 py-3 rounded-full text-blue-700 font-bold border-2 border-blue-200 transition ${styles['btn-secondary-action']} hover:bg-blue-100/70`}
                                        onClick={() => handleShare(selectedReport)}
                                    >
                                        <FaShareAlt className="mr-2" /> Share
                                    </button>
                                    <button 
                                        className={`w-36 py-3 rounded-full text-gray-700 font-bold border-2 border-gray-300 transition ${styles['btn-secondary-action']} hover:bg-gray-100/70`}
                                        onClick={() => alert('Printing Report...')}
                                    >
                                        <FaPrint className="mr-2" /> Print
                                    </button>
                                </div>

                                {/* Placeholder for Interactive Visualization/Summary */}
                                <div className="mt-4 p-8 bg-gray-50/70 rounded-xl border border-gray-100 shadow-inner text-center text-gray-600">
                                    <p className="font-semibold mb-2">Interactive Summary View</p>
                                    <p className="text-sm italic">Detailed results, diagnostic images, and interactive data charts for **{selectedReport.type}** load here for secure analysis.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer (Re-used for consistency) */}
                <footer className="mt-12 text-center text-sm text-gray-500 border-t pt-4 border-gray-200">
                    <p>© 2025 MediRecords Portal. Your secure and private health records solution.</p>
                </footer>
            </div>
        </div>
    );
};

export default Report;