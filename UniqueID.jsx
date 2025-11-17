import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UniqueID() {
  const [uniqueID, setUniqueID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("arogyaUser"));
    if (!user || !user.dob) return;

    const dob = new Date(user.dob);
    const year = dob.getFullYear();
    const month = dob.getMonth() + 1;

    // Year → Letter
    const yearLetter = getYearLetter(year);
    // Month → A-L
    const monthLetter = String.fromCharCode(64 + month);
    // Random 6-char code (with priority rule)
    const randomCode = generateRandomCode();

    const id = `ACIN${yearLetter}${monthLetter}${randomCode}`;
    setUniqueID(id);
    localStorage.setItem("uniqueID", id);
  }, []);

  // Convert year to A-Z/a-z mapping
  const getYearLetter = (year) => {
    const baseYear = 1921;
    const index = Math.floor((year - baseYear) / 10);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return letters[index] || "Z";
  };

  // Generate 6-digit or 4-digit+2char random code
  const generateRandomCode = () => {
    const random = Math.random();
    if (random < 0.8) {
      // 🔹 80% chance: 6 pure digits
      return String(Math.floor(100000 + Math.random() * 900000));
    } else {
      // 🔹 20% chance: 4 digits + 2 chars
      const digits = Math.floor(1000 + Math.random() * 9000);
      const letters = randomLetter() + randomLetter();
      return `${digits}${letters}`;
    }
  };

  const randomLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return letters.charAt(Math.floor(Math.random() * letters.length));
  };

  return (
    <div
      className="card shadow p-4 text-center"
      style={{ maxWidth: "600px", margin: "50px auto" }}
    >
      <h3 className="mb-3 text-success fw-bold">Your Unique Arogya ID</h3>
      <h4 className="text-primary fw-bold mb-4 fs-3">{uniqueID}</h4>
      <button className="btn btn-primary" onClick={() => navigate("/card")}>
        View My Card
      </button>
    </div>
  );
}
