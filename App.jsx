import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./App.module.css";
import UniqueID from "./UniqueID";
import SplashScreen from "./SplashScreen.jsx";
import ComA from "./ComA.jsx";
import ComB from "./ComB.jsx";
import ComC from "./ComC.jsx";
import ComD from "./ComD.jsx";
import ComE from "./ComE.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";
import Card from "./Card.jsx";
import Arogya from "./Arogya.jsx";
import Hsection from "./Hsection.jsx";
import Csection from "./Csection.jsx";
import Voice from "./Voice.jsx";
import Appointment from "./Appointment.jsx";
import BloodAvail from "./BloodAvail.jsx";
import CampBlood from "./CampBlood.jsx";
import Emergency from "./Emergency.jsx";
import GovScheme from "./GovScheme.jsx";
import Organ from "./Organ.jsx"
import Report from "./Report.jsx"
import DDeath from "./DDeath.jsx";
import ArogyaCard from "./ArogyaCard.jsx";


// ✅ Home component with typing animation
function Home() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const fullText = "For Every Citizen, For Every Life - Arogya Portal";
  const speed = 100; // typing speed (in ms)

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        const nextChar = fullText.charAt(index);
        setText((prev) => prev + nextChar);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>{text}</h1>

      <button className={styles.btn} onClick={() => navigate("/comA")}>
        User Section
      </button>
      <button className={styles.btn} onClick={() => navigate("/comB")}>
        Hospital Section
      </button>
      <button className={styles.btn} onClick={() => navigate("/comC")}>
        Ambulance <br />(On the way)
      </button>
      <button className={styles.btn} onClick={() => navigate("/comD")}>
        Emergency <br />(On Process)
      </button>
      <button className={styles.btn} onClick={() => navigate("/comE")}>
        Civics
      </button>
    </div>
  );
}

// ✅ MainApp handles voice commands and navigation
function MainApp() {
  const navigate = useNavigate();
  const [voiceCommand, setVoiceCommand] = useState(null);

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    console.log("Voice Command Received:", lowerCommand);

    if (lowerCommand.includes("user section")) {
      navigate("/comA");
    } else if (lowerCommand.includes("hospital section")) {
      navigate("/comB");
    } else if (lowerCommand.includes("ambulance")) {
      navigate("/comC");







      
    } else if (lowerCommand.includes("emergency")) {
      navigate("/comD");
    } else if (lowerCommand.includes("civics")) {
      navigate("/comE");
    } else if (lowerCommand.includes("home") || lowerCommand.includes("go home")) {
      navigate("/");
    } else if (lowerCommand.includes("card") || lowerCommand.includes("open card")) {
      navigate("/Card");
    } else if (lowerCommand.includes("arogya") || lowerCommand.includes("open arogya")) {
      navigate("/Arogya");
    } else if (lowerCommand.includes("login") || lowerCommand.includes("sign up")) {
      setVoiceCommand(lowerCommand);
      navigate("/profile");
    }
  };

  return (
    <>
      <Voice onCommand={handleVoiceCommand} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comA" element={<ComA />} />
        <Route path="/comB" element={<ComB />} />
        <Route path="/comC" element={<ComC />} />
        <Route path="/comD" element={<ComD />} />
        <Route path="/comE" element={<ComE />} />
        <Route path="/signup" element={<Signup voiceCommand={voiceCommand} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/card" element={<Card />} />
        <Route path="/arogya" element={<Arogya />} />
        <Route path="/hsection" element={<Hsection />} />
        <Route path="/csection" element={<Csection />} />
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/BloodAvail" element={<BloodAvail/>}/>
        <Route path="/CampBlood" element={<CampBlood/>}/>
        <Route path="/Emergency" element={<Emergency/>}/>
        <Route path="/GovScheme" element={<GovScheme/>}/>
        <Route path="/Organ" element={<Organ/>}/>
        <Route path="/Report" element={<Report/>}/>
        <Route path="/DDeath" element={<DDeath/>}/>
        <Route path="/ArogyaCard" element={<ArogyaCard/>}/>
        <Route path="/uniqueid" element={<UniqueID />} />











      </Routes>
    </>
  );
}

// ✅ Root App with Splash Screen
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Router>
          <MainApp />
        </Router>
      )}
    </>
  );
}

export default App;
