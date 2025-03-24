import { useState } from "react";
import styles from "./Login.module.css"; 

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              required
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
            />
            <label className={styles.inputLabel}>Email</label>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              required
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
            />
            <label className={styles.inputLabel}>Password</label>
          </div>

          <button type="submit" className={styles.loginBtn}>Login</button>
          <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
        </form>
      </div>
    </div>
  );
}
