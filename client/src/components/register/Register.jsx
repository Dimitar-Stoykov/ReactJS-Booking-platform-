import styles from "./Register.module.css";

export default function Register() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.registerBox}>
        <h2 className={styles.registerTitle}>Create an Account</h2>

        
        <div className={styles.inputGroup}>
          <input type="text" className={styles.inputField} required placeholder=" " />
          <label className={styles.inputLabel}>Full Name</label>
        </div>

        <div className={styles.inputGroup}>
          <input type="email" className={styles.inputField} required placeholder=" " />
          <label className={styles.inputLabel}>Email Address</label>
        </div>

        
        <div className={styles.inputGroup}>
          <input type="password" className={styles.inputField} required placeholder=" " />
          <label className={styles.inputLabel}>Password</label>
        </div>

       
        <div className={styles.inputGroup}>
          <input type="password" className={styles.inputField} required placeholder=" " />
          <label className={styles.inputLabel}>Confirm Password</label>
        </div>

       
        <button className={styles.registerBtn}>Sign Up</button>

        
        <p className={styles.switchForm}>
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
}
