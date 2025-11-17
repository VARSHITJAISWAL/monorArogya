import React, { useState } from 'react';
import { 
    FaArrowLeft, FaHeartbeat, FaSearch, FaUser, FaBars, 
    FaIdCard, FaCalendarAlt, FaTint, FaBriefcaseMedical, 
    FaStethoscope, FaPlus, FaCheckSquare, FaSquare, FaToggleOn, FaToggleOff, // Using FaStethoscope/FaPlus as abstract replacements
    FaUpload, FaCheckCircle, FaClipboardList, FaDownload, FaEye
} from 'react-icons/fa';
import styles from './Organ.module.css';

// Custom Toggle Switch Component (Using different abstract icons for better visual)
const ToggleSwitch = ({ label, isChecked, onChange }) => (
    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onChange(!isChecked)}>
        <span className="text-gray-700 text-base font-medium">{label}</span>
        <div className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isChecked ? 'bg-blue-500' : 'bg-gray-300'}`}>
            <div className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isChecked ? 'translate-x-full' : 'translate-x-0'}`}></div>
            {/* Displaying a subtle icon based on state */}
            {isChecked 
                ? <FaCheckSquare className="absolute right-1 top-1 text-blue-500 text-sm" /> 
                : <FaSquare className="absolute left-1 top-1 text-gray-400 text-sm" />
            }
        </div>
    </div>
);

// Helper for Organ Selection Checkbox (Using FaStethoscope/FaPlus for variety)
const OrganCheckbox = ({ icon: Icon, label, isChecked, onChange }) => (
    <div className={`flex items-center space-x-2 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ${isChecked ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}
        onClick={() => onChange(!isChecked)}>
        <input 
            type="checkbox" 
            checked={isChecked} 
            readOnly 
            className="hidden" // Hide default checkbox
        />
        <Icon className={`text-xl ${isChecked ? 'text-white' : 'text-blue-400'}`} />
        <span className="font-medium">{label}</span>
        {isChecked && <FaCheckCircle className="ml-auto text-white" />}
    </div>
);

const Organ = () => {
    const [isDonor, setIsDonor] = useState(true); // Toggle between Donor/Recipient forms
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [selectedOrgans, setSelectedOrgans] = useState({
        kidneys: false, heart: false, liver: false, lungs: false, corneas: false, pancreas: false
    });
    const [hasChronicConditions, setHasChronicConditions] = useState(false);
    const [isTakingMedications, setIsTakingMedications] = useState(false);
    const [briefDescription, setBriefDescription] = useState('');
    const [acknowledgement, setAcknowledgement] = useState(false);

    const handleOrganSelect = (organ) => {
        setSelectedOrgans(prev => ({ ...prev, [organ]: !prev[organ] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!acknowledgement && isDonor) {
            alert('Please acknowledge and consent to organ donation.');
            return;
        }
        alert(`Submitting ${isDonor ? 'Donor' : 'Recipient'} registration.`);
        console.log({ 
            isDonor, fullName, age, bloodGroup, selectedOrgans, 
            hasChronicConditions, isTakingMedications, briefDescription, acknowledgement 
        });
    };

    const renderDonorForm = () => (
        <>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${styles['form-section']}`}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} 
                           className={styles['input-glass']} placeholder="Your Full Name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input type="date" value={age} onChange={(e) => setAge(e.target.value)} 
                           className={styles['input-glass']} />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                    <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} 
                            className={styles['input-glass']}>
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option><option value="A-">A-</option>
                        <option value="B+">B+</option><option value="B-">B-</option>
                        <option value="AB+">AB+</option><option value="AB-">AB-</option>
                        <option value="O+">O+</option><option value="O-">O-</option>
                    </select>
                </div>
            </div>

            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center mt-8">
                <FaHeartbeat className="mr-3 text-red-500" /> Organs to Donate (Consent)
            </h3>
            {/* Using abstract icons for organ types */}
            <div className={`grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8 ${styles['form-section']}`}>
                <OrganCheckbox icon={FaStethoscope} label="Kidneys" isChecked={selectedOrgans.kidneys} onChange={() => handleOrganSelect('kidneys')} />
                <OrganCheckbox icon={FaStethoscope} label="Heart" isChecked={selectedOrgans.heart} onChange={() => handleOrganSelect('heart')} />
                <OrganCheckbox icon={FaStethoscope} label="Liver" isChecked={selectedOrgans.liver} onChange={() => handleOrganSelect('liver')} />
                <OrganCheckbox icon={FaStethoscope} label="Lungs" isChecked={selectedOrgans.lungs} onChange={() => handleOrganSelect('lungs')} />
                <OrganCheckbox icon={FaEye} label="Corneas" isChecked={selectedOrgans.corneas} onChange={() => handleOrganSelect('corneas')} />
                <OrganCheckbox icon={FaStethoscope} label="Pancreas" isChecked={selectedOrgans.pancreas} onChange={() => handleOrganSelect('pancreas')} />
            </div>

            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center mt-8">
                <FaBriefcaseMedical className="mr-3 text-green-600" /> Medical History Screening
            </h3>
            <div className={`space-y-4 mb-8 ${styles['form-section']}`}>
                <ToggleSwitch label="Have Chronic Conditions?" isChecked={hasChronicConditions} onChange={setHasChronicConditions} />
                <ToggleSwitch label="Are you currently taking Medications?" isChecked={isTakingMedications} onChange={setIsTakingMedications} />
                <label className="block text-sm font-medium text-gray-700 mb-2">Brief Description (optional)</label>
                <textarea value={briefDescription} onChange={(e) => setBriefDescription(e.target.value)} 
                          className={styles['input-glass']} rows="3" placeholder="Any relevant medical notes, allergies, past surgeries, etc."></textarea>
            </div>

            <div className="flex items-start mb-6">
                <input type="checkbox" checked={acknowledgement} onChange={(e) => setAcknowledgement(e.target.checked)}
                       className="mt-1 mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
                <label className="text-base text-gray-800 font-medium">
                    I have read and **consent to organ donation**, understanding the process and legal implications.
                </label>
            </div>
            
            <button type="submit" disabled={!acknowledgement} className={`w-full py-4 text-white rounded-xl font-bold text-lg mb-4 ${styles['btn-red-gradient']} ${!acknowledgement && 'opacity-50 cursor-not-allowed'}`}>
                <FaIdCard className="mr-3" /> Finalize Donor Registration
            </button>
            <button type="button" className={`w-full py-4 text-gray-800 rounded-xl font-bold text-lg ${styles['btn-upload-medical']}`}>
                <FaUpload className="mr-3" /> Upload Advance Medical Directive (Optional)
            </button>
        </>
    );

    const renderRecipientForm = () => (
        <>
            <p className="text-gray-700 text-lg mb-8">
                To register as a recipient, please provide your medical details and the organ(s) you require.
            </p>
            {/* Detailed Recipient Fields */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${styles['form-section']}`}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} 
                           className={styles['input-glass']} placeholder="Patient's Name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Required Organ</label>
                    <select className={styles['input-glass']}>
                        <option>Select Organ</option>
                        <option>Kidney</option><option>Heart</option><option>Liver</option><option>Lungs</option>
                        <option>Pancreas</option><option>Cornea</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Transplant Hospital</label>
                    <input type="text" className={styles['input-glass']} placeholder="e.g., St. Jude's Medical Center" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical Condition Summary</label>
                    <textarea className={styles['input-glass']} rows="4" placeholder="Briefly describe the medical condition requiring transplant, and urgency level as diagnosed by a specialist."></textarea>
                </div>
            </div>
            <button type="submit" className={`w-full py-4 text-white rounded-xl font-bold text-lg mb-4 ${styles['btn-blue-gradient']}`}>
                <FaClipboardList className="mr-3" /> Submit Recipient Registration
            </button>
            <button type="button" className={`w-full py-4 text-gray-800 rounded-xl font-bold text-lg ${styles['btn-upload-medical']}`}>
                <FaDownload className="mr-3" /> Download Recipient Registration Guide
            </button>
        </>
    );


    return (
        <div className={`min-h-screen p-8 lg:p-12 ${styles['caring-aero-background']} text-gray-800 flex justify-center items-center`}>
            
            <div className="w-full max-w-7xl">
                
                {/* Header Bar - Clear and Inviting */}
                <header className="flex justify-between items-center mb-10 pb-4 border-b border-blue-200/60">
                    <div className="flex items-center">
                        <FaArrowLeft className="text-2xl text-gray-600 cursor-pointer hover:text-blue-500 mr-4 transition-colors" onClick={() => console.log('Go Back')} />
                        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight flex items-center">
                            Life Donation Portal 
                            <FaHeartbeat className="ml-4 text-red-500 text-3xl animate-pulse" />
                        </h1>
                    </div>
                    <div className="flex space-x-5">
                        <FaSearch className="text-2xl text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
                        <FaUser className="text-2xl text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
                        <FaBars className="text-2xl text-gray-500 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                </header>

                {/* Main Content Area */}
                <div className={`${styles['main-glass-card']} p-10 rounded-3xl shadow-2xl`}>
                    <div className="flex justify-center mb-8">
                        <button 
                            className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 ${isDonor ? styles['tab-active'] : styles['tab-inactive']}`}
                            onClick={() => setIsDonor(true)}
                        >
                            Become a Donor
                        </button>
                        <button 
                            className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 ${!isDonor ? styles['tab-active'] : styles['tab-inactive']}`}
                            onClick={() => setIsDonor(false)}
                        >
                            Recipient Registration
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {isDonor ? renderDonorForm() : renderRecipientForm()}
                    </form>
                </div>
                
                {/* Footer/Disclaimer */}
                <div className="mt-12 text-center text-sm text-gray-600">
                    <p>
                        <span className="text-blue-600 font-bold">Privacy Note:</span> Your data is securely handled and shared only with authorized medical personnel.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Organ;