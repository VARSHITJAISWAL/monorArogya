import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Main Form State
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    aadhaar: "",
    fatherName: "",
    motherName: "",
    profilePhoto: null,
    fatherProof: null,
    motherProof: null,
    addressProof: null,
  });

  const [nominees, setNominees] = useState([{ name: "", mobile: "", aadhaar: "" }]);
  const [passwordError, setPasswordError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files[0] }));
  };

  // OTP mock
  const generateOtp = () => Math.floor(1000 + Math.random() * 9000);
  const handleOtp = (type) => alert(`${type} OTP: ${generateOtp()}`);

  // Nominee management
  const addNominee = () => {
    setNominees([...nominees, { name: "", mobile: "", aadhaar: "" }]);
  };
  const handleNomineeChange = (i, e) => {
    const { name, value } = e.target;
    const updated = [...nominees];
    updated[i][name] = value;
    setNominees(updated);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setPasswordError("⚠️ Passwords do not match!");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });
      formData.append("nominees", JSON.stringify(nominees));

      const res = await axios.post("http://localhost:5000/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      if (res.data.message.toLowerCase().includes("registered successfully"))
        navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  // --- JSX UI Starts ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          📝 Signup Form (Step {step} of 3)
        </h2>

        {/* ==================== STEP 1: PERSONAL DETAILS ==================== */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
            className="space-y-5"
          >
            <div>
              <label className={styles.label}>User Name</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div>
              <label className={styles.label}>Mobile Number</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Mobile No"
                  required
                />
                <button type="button" onClick={() => handleOtp("📱 Mobile")} className={styles.btn}>
                  Send OTP
                </button>
              </div>
              <input type="text" className={styles.input} placeholder="Enter OTP" required />
            </div>

            <div>
              <label className={styles.label}>Aadhaar Number</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="aadhaar"
                  value={form.aadhaar}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Aadhaar No"
                  required
                />
                <button type="button" onClick={() => handleOtp("🆔 Aadhaar")} className={styles.btn}>
                  Send OTP
                </button>
              </div>
              <input type="text" className={styles.input} placeholder="Enter OTP" required />
            </div>

            <button type="submit" className={`${styles.btn} w-full py-3 text-lg`}>
              Next ➡️
            </button>
          </form>
        )}

        {/* ==================== STEP 2: FAMILY DETAILS ==================== */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
            className="space-y-5"
          >
            <h3 className="text-xl font-semibold text-blue-700">👨‍👩‍👦 Family Details</h3>

            <div>
              <label className={styles.label}>Father Name & Proof</label>
              <input
                type="text"
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
                className={styles.input}
                placeholder="Father Name"
                required
              />
              <input
                type="file"
                name="fatherProof"
                onChange={handleFileChange}
                className={styles.input}
                required
              />
            </div>

            <div>
              <label className={styles.label}>Mother Name & Proof</label>
              <input
                type="text"
                name="motherName"
                value={form.motherName}
                onChange={handleChange}
                className={styles.input}
                placeholder="Mother Name"
                required
              />
              <input
                type="file"
                name="motherProof"
                onChange={handleFileChange}
                className={styles.input}
                required
              />
            </div>

            <h4 className="text-lg font-semibold text-blue-700 mt-4">👥 Nominees</h4>
            {nominees.map((nominee, i) => (
              <div key={i} className="p-4 border rounded-lg bg-blue-50 mb-3 shadow-sm">
                <input
                  type="text"
                  name="name"
                  value={nominee.name}
                  onChange={(e) => handleNomineeChange(i, e)}
                  className={styles.input}
                  placeholder="Nominee Name"
                  required
                />
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    name="mobile"
                    value={nominee.mobile}
                    onChange={(e) => handleNomineeChange(i, e)}
                    className={styles.input}
                    placeholder="Nominee Mobile"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleOtp("📱 Nominee Mobile")}
                    className={styles.btn}
                  >
                    Send OTP
                  </button>
                </div>
                <input type="text" className={styles.input} placeholder="Enter OTP" required />
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    name="aadhaar"
                    value={nominee.aadhaar}
                    onChange={(e) => handleNomineeChange(i, e)}
                    className={styles.input}
                    placeholder="Nominee Aadhaar"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleOtp("🆔 Nominee Aadhaar")}
                    className={styles.btn}
                  >
                    Send OTP
                  </button>
                </div>
                <input type="text" className={styles.input} placeholder="Enter OTP" required />
              </div>
            ))}

            <button type="button" onClick={addNominee} className={`${styles.btn} w-full`}>
              + Add Another Nominee
            </button>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className={styles.btn}>
                ⬅️ Back
              </button>
              <button type="submit" className={styles.btn}>
                Next ➡️
              </button>
            </div>
          </form>
        )}

        {/* ==================== STEP 3: DOCUMENTS + PASSWORD ==================== */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-xl font-semibold text-blue-700">📄 Documents & Password</h3>

            <div>
              <label className={styles.label}>Profile Photo</label>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
                className={styles.input}
                accept="image/*"
                required
              />
            </div>

            <div>
              <label className={styles.label}>Address Proof</label>
              <input
                type="file"
                name="addressProof"
                onChange={handleFileChange}
                className={styles.input}
                required
              />
            </div>

            <div className="flex gap-2">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className={styles.input}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(2)} className={styles.btn}>
                ⬅️ Back
              </button>
              <button type="submit" className={`${styles.btn} w-40`}>
                ✅ Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
