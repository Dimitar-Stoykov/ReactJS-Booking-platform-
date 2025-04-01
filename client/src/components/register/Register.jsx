import { Link, useNavigate } from "react-router";
import styles from "./Register.module.css";
import { useRegister } from "../../API/userAPI";
import { useUserContext } from "../../contexts/UserContext";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useUserContext();

    const registerHandler = async (formData) => { 
        const { username, email, password } = Object.fromEntries(formData);

        const confirmPassword = formData.get('password-confirm'); 

        if (password !== confirmPassword) { 
            console.log("Password mismatch");

            return; 
        }

        const authData = await register(username, email, password);

        const {password: _ , ...newAuthData} = authData;

        userLoginHandler(newAuthData);

        navigate('/')
    } 

    return (
        <div className={styles.wrapper}>
            <form action={registerHandler} className={styles.registerBox}>
                <h2 className={styles.registerTitle}>Create an Account</h2>


                <div className={styles.inputGroup}>

                    <input
                        type="text"
                        name="username"
                        className={styles.inputField}
                        required
                        placeholder=" "
                    />

                    <label className={styles.inputLabel}>Full Name</label>
                </div>

                <div className={styles.inputGroup}>
                    <input

                        type="email"
                        name="email"
                        className={styles.inputField}
                        required
                        placeholder=" "
                    />

                    <label className={styles.inputLabel}>Email Address</label>
                </div>


                <div className={styles.inputGroup}>
                    <input

                        type="password"
                        name="password"
                        className={styles.inputField}
                        required
                        placeholder=" "

                    />
                    <label className={styles.inputLabel}>Password</label>
                </div>


                <div className={styles.inputGroup}>
                    <input

                        type="password"
                        name="password-confirm"
                        className={styles.inputField}
                        required
                        placeholder=" "

                    />
                    <label className={styles.inputLabel}>Confirm Password</label>
                </div>


                <button className={styles.registerBtn}>Sign Up</button>


                <p className={styles.switchForm}>
                    Already have an account? <Link to="/login">Log In </Link>
                </p>
            </form>
        </div>
    );
}
