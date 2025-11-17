import React, { useState } from 'react';
import styles from './Appointment.module.css';
import { FaCheckSquare, FaCalendarAlt, FaStethoscope, FaHistory, FaFileInvoice, FaCog, FaBell, FaUserCircle, FaSearch, FaAngleDown, FaLaptopMedical, FaUserMd, FaHeartbeat } from 'react-icons/fa';
import { MdOutlineMedicalServices, MdHealthAndSafety, MdEventNote } from 'react-icons/md'; // For specialist and wellness icons

const doctorsData = [
  { id: 1, name: 'Maaz Saleh', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Riaz Haid', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Faiza Gulb', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Sana Gul', avatar: 'https://i.pravatar.cc/150?img=4' },
];

const Calendar = ({ selectedDate, onDateSelect }) => {
  const today = new Date().getDate(); // Current day
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, null // Assuming current month is around 19th
  ];

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        {daysOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div className={styles.calendarGrid}>
        {dates.map((date, index) => (
          <button
            key={index}
            className={`${styles.dateCell} 
                        ${date === 19 ? styles.selectedDate : ''} 
                        ${date === today && date !== 19 ? styles.today : ''} 
                        ${!date ? styles.emptyCell : ''}`}
            onClick={() => date && onDateSelect(date)}
            disabled={!date}
            aria-label={date ? `Select date ${date}` : 'Empty day'}
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
};

const Appointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(doctorsData[0].id);
  const [selectedDate, setSelectedDate] = useState(19); // Default as in image
  const [selectedTime, setSelectedTime] = useState('9:00 AM'); // Default as in image

  return (
    <div className={styles.pageContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <FaCheckSquare className={styles.logoIcon} />
          <span>AppointAro</span>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li><a href="#" className={styles.navLink}><MdOutlineMedicalServices className={styles.navIcon} /> Dashboard</a></li>
            <li><a href="#" className={styles.navLink}><MdEventNote className={styles.navIcon} /> Appointments</a></li>
            <li><a href="#" className={styles.navLink}><FaStethoscope className={styles.navIcon} /> Doctors</a></li>
            <li><a href="#" className={styles.navLink}><FaHistory className={styles.navIcon} /> History</a></li>
            <li><a href="#" className={styles.navLink}><FaFileInvoice className={styles.navIcon} /> Billing</a></li>
            <li>
              <a href="#" className={`${styles.navLink} ${styles.activeNavLink}`}>
                <FaCalendarAlt className={styles.navIcon} /> Schedule
              </a>
            </li>
            <li><a href="#" className={styles.navLink}><FaCog className={styles.navIcon} /> Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainContentArea}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <h1 className={styles.pageTitle}>Schedule Your Consultation</h1>
          <div className={styles.headerRight}>
            <FaSearch className={styles.headerIcon} />
            <FaBell className={styles.headerIcon} />
            <FaUserCircle className={styles.headerIcon} />
          </div>
        </header>

        {/* Feature Cards */}
        <div className={styles.featureCards}>
          <div className={`${styles.featureCard} ${styles.cardYellow}`}>
            <div className={styles.cardIcon}><FaLaptopMedical /></div>
            <h3 className={styles.cardHeading}>Immediate Care</h3>
            <p className={styles.cardDescription}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.</p>
          </div>
          <div className={`${styles.featureCard} ${styles.cardBlue}`}>
            <div className={styles.cardIcon}><FaUserMd /></div>
            <h3 className={styles.cardHeading}>Specialist Match</h3>
            <p className={styles.cardDescription}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.</p>
          </div>
          <div className={`${styles.featureCard} ${styles.cardGreen}`}>
            <div className={styles.cardIcon}><MdHealthAndSafety /></div>
            <h3 className={styles.cardHeading}>Wellness Check</h3>
            <p className={styles.cardDescription}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod.</p>
          </div>
        </div>

        {/* Booking Details Section */}
        <div className={styles.bookingSection}>
          <div className={styles.leftColumn}>
            <div className={styles.calendarAndTime}>
              <div className={styles.selectDateCard}>
                <h4 className={styles.sectionHeading}>Select Date</h4>
                <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
              </div>
              <div className={styles.selectTimeCard}>
                <h4 className={styles.sectionHeading}>Select Time</h4>
                <div className={styles.timeSlots}>
                  {['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'].map(time => (
                    <button
                      key={time}
                      className={`${styles.timeButton} ${selectedTime === time ? styles.selectedTime : ''}`}
                      onClick={() => setSelectedTime(time)}
                      aria-pressed={selectedTime === time}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.findDoctorCard}>
              <h4 className={styles.sectionHeading}>Find Your Doctor</h4>
              <div className={styles.doctorFilters}>
                <div className={styles.dropdownFilter}>
                  <span>Speciality</span>
                  <FaAngleDown />
                </div>
                <div className={styles.dropdownFilter}>
                  <span>Hospital</span>
                  <FaAngleDown />
                </div>
                <FaSearch className={styles.searchIcon} />
              </div>
              <div className={styles.doctorsList}>
                {doctorsData.map(doctor => (
                  <button
                    key={doctor.id}
                    className={`${styles.doctorAvatarCard} ${selectedDoctor === doctor.id ? styles.selectedDoctor : ''}`}
                    onClick={() => setSelectedDoctor(doctor.id)}
                    aria-pressed={selectedDoctor === doctor.id}
                  >
                    <img src={doctor.avatar} alt={doctor.name} className={styles.doctorAvatar} />
                    <span className={styles.doctorName}>{doctor.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.virtualAssistantCard}>
              <h4 className={styles.sectionHeading}>Virtual Assistant</h4>
              <div className={styles.assistantContent}>
                <div className={styles.assistantAvatar}>
                  <img src="https://i.pravatar.cc/150?img=5" alt="AI Assistant" />
                  <span>Dr. Arya Sharma</span>
                </div>
                <p className={styles.assistantMessage}>Hello! How can I help you with your appointment today?</p>
                <div className={styles.assistantOptions}>
                  <button className={styles.assistantOption}>Reschedule</button>
                  <button className={styles.assistantOption}>Cancel</button>
                  <button className={styles.assistantOption}>Ask a question</button>
                </div>
                <input type="text" placeholder="Type medical assistant" className={styles.assistantInput} />
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Booking Button */}
        <div className={styles.confirmButtonContainer}>
          <button className={styles.confirmBookingButton}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;