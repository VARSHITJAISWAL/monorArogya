import React, { useState, useMemo } from 'react';
import { 
    FaArrowLeft, FaSearch, FaFilter, FaListAlt, FaCalendarCheck, FaTags, 
    FaUserCircle, FaBell, FaCog, FaHome, FaCalendarAlt, FaUsers, 
    FaChartLine, FaInfoCircle, FaClock, FaCheckCircle 
} from 'react-icons/fa';
import styles from './GovScheme.module.css';

// Dummy Data
const initialSchemes = [
    { 
        id: 1, 
        name: "Jan Swasthya Bima Yojana", 
        description: "Comprehensive health insurance for all citizens.", 
        eligibility: "Age 18-60, Income < ₹2L/year.", 
        category: "Health",
        status: "Open",
        deadline: "31 Dec 2024"
    },
    { 
        id: 2, 
        name: "Mahila Kalyan Chikitsa Nidhi", 
        description: "Maternal and child health subsidy for women.", 
        eligibility: "Women, All ages.", 
        category: "Women & Child",
        status: "Closing Soon",
        deadline: "15 Nov 2024"
    },
    { 
        id: 3, 
        name: "Gramin Seva Swasthya Kosh", 
        description: "Rural healthcare access fund for residents.", 
        eligibility: "Rural residents, All ages.", 
        category: "Rural Development",
        status: "Open",
        deadline: "31 Jan 2025"
    },
    { 
        id: 4, 
        name: "Yuva Rozgar Protsahan Yojana", 
        description: "Skill development and employment for youth.", 
        eligibility: "Youth, Age 18-35, Unemployed.", 
        category: "Employment",
        status: "New",
        deadline: "28 Feb 2025"
    },
    { 
        id: 5, 
        name: "Senior Citizen Sahayata Scheme", 
        description: "Financial assistance for senior citizens.", 
        eligibility: "Senior citizens, Age 60+, Low income.", 
        category: "Elderly Welfare",
        status: "Open",
        deadline: "Ongoing"
    },
];

// Reusable Scheme Card Component
const SchemeCard = ({ scheme, onViewDetails, onApply }) => {
    const isClosingSoon = scheme.status === "Closing Soon";
    const isNew = scheme.status === "New";
    const isOpen = scheme.status === "Open";

    return (
        <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${styles['scheme-card']} ${isClosingSoon ? styles['closing-soon-card'] : ''}`}>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">{scheme.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{scheme.description}</p>
            
            <div className="flex items-center text-blue-700 text-sm font-semibold mb-2">
                <FaCheckCircle className="mr-2 text-blue-500" />
                Eligibility: <span className="text-gray-800 ml-1 font-normal">{scheme.eligibility}</span>
            </div>

            {scheme.deadline && scheme.deadline !== "Ongoing" && (
                <div className="flex items-center text-red-600 text-sm font-semibold mb-4">
                    <FaClock className="mr-2 text-red-500" />
                    Application Deadline: <span className="ml-1 font-bold text-red-700">{scheme.deadline}</span>
                </div>
            )}
            {scheme.deadline === "Ongoing" && (
                <div className="flex items-center text-green-600 text-sm font-semibold mb-4">
                    <FaCalendarCheck className="mr-2 text-green-500" />
                    Application: <span className="ml-1 font-bold text-green-700">Ongoing</span>
                </div>
            )}

            <div className="flex justify-end space-x-3 mt-4">
                {scheme.id === 2 && ( // Example for "View Details"
                    <button 
                        className={`px-6 py-2 rounded-full text-sm font-semibold text-blue-700 border border-blue-400 bg-blue-50 hover:bg-blue-100 transition duration-200 ${styles['action-button-hover']}`}
                        onClick={() => onViewDetails(scheme)}
                    >
                        View Details
                    </button>
                )}
                {(isOpen || isNew) && ( // Example for "Apply" button based on status
                    <button 
                        className={`px-6 py-2 rounded-full text-sm font-bold text-white ${styles['apply-button']} ${styles['action-button-hover']}`}
                        onClick={() => onApply(scheme)}
                    >
                        Apply Now
                    </button>
                )}
                {isClosingSoon && (
                     <button 
                        className={`px-6 py-2 rounded-full text-sm font-bold text-white ${styles['closing-soon-button']} ${styles['action-button-hover']}`}
                        onClick={() => onViewDetails(scheme)} // View details when closing soon
                    >
                        Closing Soon
                    </button>
                )}
            </div>
        </div>
    );
};


const GovScheme = () => {
    const [schemes, setSchemes] = useState(initialSchemes);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEligibility, setFilterEligibility] = useState('All');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [activeFilterTags, setActiveFilterTags] = useState([]); // For displaying active filters

    // Handlers (dummy for now)
    const handleGoBack = () => console.log('Go back');
    const handleNotifications = () => alert('Notifications clicked!');
    const handleProfile = () => alert('Profile clicked!');
    const handleViewDetails = (scheme) => alert(`Viewing details for: ${scheme.name}`);
    const handleApply = (scheme) => alert(`Applying for: ${scheme.name}`);

    // Update active filter tags whenever filters change
    useMemo(() => {
        const tags = [];
        if (filterEligibility !== 'All') tags.push(`Eligibility: ${filterEligibility}`);
        if (filterCategory !== 'All') tags.push(`Category: ${filterCategory}`);
        if (filterStatus !== 'All') tags.push(`Status: ${filterStatus}`);
        setActiveFilterTags(tags);
    }, [filterEligibility, filterCategory, filterStatus]);


    const filteredSchemes = useMemo(() => {
        return schemes.filter(scheme => {
            const searchMatch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
            const eligibilityMatch = filterEligibility === 'All' || scheme.eligibility.includes(filterEligibility);
            const categoryMatch = filterCategory === 'All' || scheme.category === filterCategory;
            const statusMatch = filterStatus === 'All' || scheme.status === filterStatus;

            return searchMatch && eligibilityMatch && categoryMatch && statusMatch;
        });
    }, [schemes, searchTerm, filterEligibility, filterCategory, filterStatus]);

    const handleClearFilterTag = (tag) => {
        if (tag.startsWith('Eligibility')) setFilterEligibility('All');
        if (tag.startsWith('Category')) setFilterCategory('All');
        if (tag.startsWith('Status')) setFilterStatus('All');
    };

    return (
        <div className={`min-h-screen ${styles['gov-aero-background']} flex flex-col`}>
            {/* Top Navigation Bar */}
            <header className={`py-4 px-8 flex justify-between items-center ${styles['header-glass-effect']} shadow-md z-10`}>
                <div className="flex items-center space-x-4">
                    <FaArrowLeft className="text-xl text-gray-700 cursor-pointer hover:text-blue-600 transition" onClick={handleGoBack} />
                    <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">Government Health Schemes</h1>
                </div>
                <div className="flex items-center space-x-6">
                    <FaBell className="text-xl text-gray-600 cursor-pointer hover:text-blue-600 transition" onClick={handleNotifications} />
                    <FaUserCircle className="text-xl text-gray-600 cursor-pointer hover:text-blue-600 transition" onClick={handleProfile} />
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Search and Filters Section */}
                    <div className={`p-6 mb-8 rounded-2xl shadow-xl ${styles['filters-glass-card']}`}>
                        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
                            {/* Search Bar */}
                            <div className="relative flex-grow w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search for schemes by name or description..."
                                    className={`w-full p-3 pl-10 rounded-xl ${styles['input-light-glass']} focus:ring-blue-200 focus:border-blue-400`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            {/* Filter Dropdowns */}
                            <div className="flex space-x-3 w-full md:w-auto">
                                <select 
                                    className={`p-3 rounded-xl ${styles['filter-select-glass']} focus:ring-blue-200 focus:border-blue-400`}
                                    value={filterEligibility}
                                    onChange={(e) => setFilterEligibility(e.target.value)}
                                >
                                    <option value="All">Eligibility</option>
                                    <option value="Age 18-60">Age 18-60</option>
                                    <option value="Women">Women</option>
                                    <option value="Rural">Rural residents</option>
                                    <option value="Youth">Youth</option>
                                    <option value="Senior">Senior citizens</option>
                                </select>
                                <select 
                                    className={`p-3 rounded-xl ${styles['filter-select-glass']} focus:ring-blue-200 focus:border-blue-400`}
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    <option value="All">Category</option>
                                    <option value="Health">Health</option>
                                    <option value="Women & Child">Women & Child</option>
                                    <option value="Rural Development">Rural Development</option>
                                    <option value="Employment">Employment</option>
                                    <option value="Elderly Welfare">Elderly Welfare</option>
                                </select>
                                <select 
                                    className={`p-3 rounded-xl ${styles['filter-select-glass']} focus:ring-blue-200 focus:border-blue-400`}
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="All">Status</option>
                                    <option value="Open">Open</option>
                                    <option value="Closing Soon">Closing Soon</option>
                                    <option value="New">New</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filter Tags */}
                        {activeFilterTags.length > 0 && (
                            <div className="flex flex-wrap items-center space-x-3 mt-4 pt-4 border-t border-gray-200">
                                <span className="text-gray-600 text-sm font-medium mr-2">Active Filters:</span>
                                {activeFilterTags.map(tag => (
                                    <span key={tag} className={`flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${styles['filter-tag-glow']}`}>
                                        {tag}
                                        <FaTimes className="ml-2 text-blue-600 cursor-pointer hover:text-blue-800 transition" onClick={() => handleClearFilterTag(tag)} />
                                    </span>
                                ))}
                                <button 
                                    className="text-sm text-gray-500 hover:text-gray-700 transition"
                                    onClick={() => {
                                        setFilterEligibility('All');
                                        setFilterCategory('All');
                                        setFilterStatus('All');
                                        setSearchTerm('');
                                    }}
                                >
                                    Clear All
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Schemes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredSchemes.length > 0 ? (
                            filteredSchemes.map(scheme => (
                                <SchemeCard 
                                    key={scheme.id} 
                                    scheme={scheme} 
                                    onViewDetails={handleViewDetails} 
                                    onApply={handleApply} 
                                />
                            ))
                        ) : (
                            <div className="lg:col-span-3 text-center p-12 text-xl text-gray-500 italic bg-white/70 rounded-2xl shadow-lg border border-gray-100">
                                <FaInfoCircle className="inline mr-3 text-3xl text-blue-400" /> No schemes found matching your criteria.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <footer className={`py-4 px-8 flex justify-around items-center ${styles['footer-glass-effect']} shadow-inner-top z-10`}>
                <div className={`flex flex-col items-center cursor-pointer ${styles['footer-icon-hover']}`}>
                    <FaHome className="text-xl text-blue-600" />
                    <span className="text-xs text-blue-600 font-semibold mt-1">Home</span>
                </div>
                <div className={`flex flex-col items-center cursor-pointer ${styles['footer-icon-hover']}`}>
                    <FaCalendarAlt className="text-xl text-gray-600" />
                    <span className="text-xs text-gray-600 mt-1">Calendar</span>
                </div>
                <div className={`flex flex-col items-center cursor-pointer ${styles['footer-icon-hover']}`}>
                    <FaUsers className="text-xl text-gray-600" />
                    <span className="text-xs text-gray-600 mt-1">Community</span>
                </div>
                <div className={`flex flex-col items-center cursor-pointer ${styles['footer-icon-hover']}`}>
                    <FaChartLine className="text-xl text-gray-600" />
                    <span className="text-xs text-gray-600 mt-1">Analytics</span>
                </div>
                <div className={`flex flex-col items-center cursor-pointer ${styles['footer-icon-hover']}`}>
                    <FaCog className="text-xl text-gray-600" />
                    <span className="text-xs text-gray-600 mt-1">Settings</span>
                </div>
            </footer>
        </div>
    );
};

export default GovScheme;