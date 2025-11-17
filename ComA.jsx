import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styles from "./ComA.module.css";

function ComA() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        form,
        { withCredentials: true }
      );

      if (res.data.message?.toLowerCase().includes("login successful")) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/Profile");
      } else {
        setError(res.data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("⚠️ Unable to connect. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.card}>
        <h1 className={styles.title}>Arogya User</h1>
        <p className={styles.subtitle}>Login to your account to continue</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className={styles.input}
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className={styles.input}
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className={styles.signupText}>
          Don’t have an account?{" "}
          <span className={styles.signupLink} onClick={() => navigate("/Signup")}>
            Sign up now
          </span>
        </p>
      </div>
    </div>
  );
}

export default ComA;
