import React, { useState, useMemo } from 'react';
import { FaSearch, FaBell, FaHome, FaUser, FaClipboardList, FaTachometerAlt, FaPlusCircle, FaChartBar, FaEye, FaSortUp, FaSortDown, FaBars, FaTimes, FaHeartbeat } from 'react-icons/fa';
import styles from './CampBlood.module.css';

// Dummy Data 
const initialCamps = [
    { id: 1, name: "Rotary Club Annual Drive", date: "2023-10-26", organizer: "Rotary International", status: "Open" },
    { id: 2, name: "City Hospital Blood Drive", date: "2023-11-05", organizer: "City Hospital Trust", status: "Open" },
    { id: 3, name: "University Campus Camp", date: "2023-11-10", organizer: "Student Health Services", status: "Full" },
    { id: 4, name: "Community Welfare Camp", date: "2023-11-15", organizer: "Local NGO", status: "Open" },
    { id: 5, name: "Annual Corporate Blood Drive", date: "2023-12-01", organizer: "Tech Corp Inc.", status: "Open" },
    { id: 6, name: "Winter Blood Marathon", date: "2023-12-20", organizer: "Red Cross", status: "Full" },
];

// Helper Component: Custom Sidebar Item with Aero style
const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
    <div 
        className={`flex items-center p-4 my-2 rounded-xl cursor-pointer ${styles['sidebar-aero-effect']} 
            ${isActive 
                ? 'bg-sky-500/80 text-white font-bold shadow-xl shadow-sky-500/40 border-l-4 border-white' 
                : 'text-gray-300 hover:bg-gray-700/50'
            }`}
        onClick={onClick}
    >
        <Icon className="text-xl mr-4 min-w-[20px]" />
        <span className="truncate">{label}</span>
    </div>
);

const CampBlood = () => {
    const [camps, setCamps] = useState(initialCamps);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Dummy handlers (unchanged)
    const handleNavigation = (path) => { console.log(`Navigating to ${path}`); };
    const handleViewEdit = (camp) => { alert(`Viewing/Editing Camp: ${camp.name}`); };
    const handleAddCamp = () => { alert("Opening form to add a new camp."); };
    
    // Filtering and Sorting Logic (unchanged)
    const sortedCamps = useMemo(() => {
        let sortableItems = [...camps];
        let filteredItems = sortableItems.filter(camp => {
            const statusMatch = filterStatus === 'All' || camp.status === filterStatus;
            const searchMatch = camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                camp.organizer.toLowerCase().includes(searchTerm.toLowerCase());
            return statusMatch && searchMatch;
        });
        if (sortConfig.key !== null) {
            filteredItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                let comparison = 0;
                if (aValue > bValue) comparison = 1;
                else if (aValue < bValue) comparison = -1;
                return sortConfig.direction === 'ascending' ? comparison : comparison * -1;
            });
        }
        return filteredItems;
    }, [camps, filterStatus, searchTerm, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const resetFilters = () => {
        setFilterStatus('All');
        setSearchTerm('');
        setSortConfig({ key: null, direction: 'ascending' });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? <FaSortUp className="text-sky-2000 ml-1" /> : <FaSortDown className="text-sky-400 ml-1" />;
    };

    // Luminous Status Badges
    const getStatusClasses = (status) => {
        return status === 'Open' 
            ? 'bg-gradient-to-r from-teal-400 to-green-500 text-white shadow-md shadow-teal-500/50' 
            : 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/50';
    };

    // --- RENDER START ---
    return (
        <div className={`flex min-h-screen relative ${styles['aero-background']}`}>
            
            {/* 1. SIDEBAR (Gradient Dark/Glass Effect) */}
            <aside 
                className={`fixed top-0 left-0 h-full bg-gray-900/95 text-white shadow-2xl z-50 transition-all duration-500 ease-in-out border-r border-gray-700/50
                    ${isSidebarOpen ? 'w-64' : 'w-0 sm:w-64'} 
                    lg:w-64`}
            >
                <div className="flex items-center p-5 pb-8 border-b border-gray-800 justify-between">
                    <div className="flex items-center">
                        <FaHeartbeat className="text-3xl text-red-500 mr-3 animate-pulse" />
                        <span className="text-xl font-extrabold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-teal-400">BloodNet</span>
                    </div>
                    <button className="sm:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                        <FaTimes className="text-xl" />
                    </button>
                </div>
                
                <nav className="p-4">
                    <SidebarItem icon={FaTachometerAlt} label="Dashboard" isActive={false} onClick={() => handleNavigation("/dashboard")} />
                    <SidebarItem icon={FaClipboardList} label="Manage Campaigns" isActive={true} onClick={() => handleNavigation("/camps")} />
                    <SidebarItem icon={FaPlusCircle} label="Schedule New Drive" isActive={false} onClick={handleAddCamp} />
                    <SidebarItem icon={FaChartBar} label="Reports & Insights" isActive={false} onClick={() => handleNavigation("/reports")} />
                </nav>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <div className={`flex flex-col flex-grow w-full transition-all duration-500 ease-in-out sm:ml-64 ${isSidebarOpen && 'blur-sm sm:blur-none'}`}>
                
                {/* 2.1. HEADER (Blurry Glass) */}
                <header className={`sticky top-0 p-4 flex justify-between items-center z-40 ${styles['header-blur-glass']}`}>
                    <button className="block sm:hidden text-gray-800 p-2" onClick={() => setIsSidebarOpen(true)}>
                        <FaBars className="text-xl" />
                    </button>
                    <div className="flex items-center space-x-6">
                        <h1 className="text-3xl font-extrabold text-gray-800 hidden sm:block">Campaign Manager</h1>
                        <div className="relative w-full max-w-sm hidden md:block">
                            <input 
                                type="text" 
                                className="w-full p-3 pl-12 pr-4 rounded-full bg-white/70 border border-sky-300 text-gray-700 focus:outline-none focus:ring-4 focus:ring-sky-200 transition shadow-inner text-sm"
                                placeholder="        "
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-500 text-sm" />
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button className="p-3 text-gray-600 hover:text-red-500 hover:bg-white rounded-full transition-all duration-300" onClick={() => alert("Notifications")}><FaBell className="text-lg" /></button>
                        <button className="p-3 text-gray-600 hover:text-sky-600 hover:bg-white rounded-full transition-all duration-300" onClick={() => handleNavigation("/")}><FaHome className="text-lg" /></button>
                        <button className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full transition-all hover:opacity-90 shadow-lg shadow-blue-500/50" onClick={() => handleNavigation("/profile")}>
                            <FaUser className="text-lg" />
                        </button>
                    </div>
                </header>

                {/* 2.2. CAMPS VIEW */}
                <main className="p-4 md:p-8 flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">Campaign Schedule <span className="text-sky-600 text-xl font-medium">({sortedCamps.length})</span></h2>
                        <button className={`text-white px-8 py-3 rounded-full font-bold flex items-center transition duration-300 w-full sm:w-auto ${styles['button-luminous-shadow']}`} onClick={handleAddCamp}>
                            <FaPlusCircle className="mr-2" /> Schedule New Drive
                        </button>
                    </div>
                    
                    {/* FILTER & ACTIONS (Glass Card Look) */}
                    <div className={`p-6 rounded-2xl shadow-xl mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 items-center ${styles['card-glass-effect']}`}>
                        <select 
                            className="p-3 border border-sky-300 rounded-lg bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">Filter by Status</option>
                            <option value="Open">Status: Open</option>
                            <option value="Full">Status: Full</option>
                        </select>
                        <input type="date" className="p-3 border border-sky-300 rounded-lg bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" />
                        <input type="text" className="p-3 border border-sky-300 rounded-lg bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" placeholder="Location..." />

                        <button className="bg-sky-600 text-white px-4 py-3 rounded-full font-bold hover:bg-sky-700 transition duration-300 w-full shadow-lg hover:shadow-xl" onClick={resetFilters}>
                            Clear Filters
                        </button>
                    </div>r

                    {/* DATA TABLE (Hover Lifts) */}
                    <div className={`rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 ${styles['card-glass-effect']}`}>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-sky-50/50 backdrop-blur-sm border-b-2 border-sky-200">
                                    <tr>
                                        <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"><input type="checkbox" className="rounded text-sky-600" /></th>
                                        <th onClick={() => requestSort('name')} className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:text-sky-600 transition">
                                            <div className="flex items-center">Camp Name {getSortIcon('name')}</div>
                                        </th>
                                        <th onClick={() => requestSort('organizer')} className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:text-sky-600">
                                            <div className="flex items-center">Organizer {getSortIcon('organizer')}</div>
                                        </th>
                                        <th onClick={() => requestSort('date')} className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:text-sky-600">
                                            <div className="flex items-center">Date {getSortIcon('date')}</div>
                                        </th>
                                        <th onClick={() => requestSort('status')} className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:text-sky-600">
                                            <div className="flex items-center">Status {getSortIcon('status')}</div>
                                        </th>
                                        <th className="p-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white/90 divide-y divide-gray-100">
                                    {sortedCamps.map(camp => (
                                        <tr key={camp.id} className={`${styles['table-row-luminous-hover']} ${camp.status === 'Full' ? 'bg-rose-50/70' : 'bg-white/90'}`}>
                                            <td className="p-4 whitespace-nowrap"><input type="checkbox" className="rounded text-sky-600" /></td>
                                            <td className="p-4 whitespace-nowrap font-extrabold text-gray-900">{camp.name}</td>
                                            <td className="p-4 whitespace-nowrap text-gray-700 font-medium">{camp.organizer}</td>
                                            <td className="p-4 whitespace-nowrap text-gray-600">{camp.date}</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span className={`px-4 py-1.5 inline-flex text-xs leading-5 rounded-full font-bold ${getStatusClasses(camp.status)}`}>
                                                    {camp.status}
                                                </span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                <button className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.05]" onClick={() => handleViewEdit(camp)}>
                                                    <FaEye className="mr-2" /> Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {sortedCamps.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="p-10 text-center text-xl text-gray-500 italic bg-gray-50/50">
                                                <FaSearch className="inline mr-3 text-2xl" /> No campaigns matching this view. 
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                {/* 2.3. FOOTER (Dark, Textured) */}
                <footer className="bg-gray-800 text-gray-400 p-4 text-sm flex flex-col md:flex-row justify-between items-center mt-auto border-t border-gray-700/50">
                    <div className="flex space-x-6 mb-2 md:mb-0">
                        <span className="hover:text-sky-400 cursor-pointer transition" onClick={() => handleNavigation("/privacy")}>Privacy</span>
                        <span className="hover:text-sky-400 cursor-pointer transition" onClick={() => handleNavigation("/about")}>About</span>
                        <span className="hover:text-sky-400 cursor-pointer transition" onClick={() => handleNavigation("/contact")}>Support</span>
                    </div>
                    <span className="text-gray-500 text-xs">
                        © 2025 BloodNet Platform. Empowering Health.
                    </span>
                </footer>
            </div>
        </div>
    );
};

export default CampBlood;