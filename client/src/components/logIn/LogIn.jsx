import styles from "./Login.module.css";


import { useActionState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useLogin } from "../../API/userAPI";

export default function Login() {
    const navigate   = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (_ ,formData) => { 
        const data = Object.fromEntries(formData);

        try { 
            const authData = await login(data.email, data.password);

            userLoginHandler(authData);

            console.log(authData);
            

            navigate(-1);
        } catch (err) { 
            console.error(err.message)
        }
    };


    const [_, loginAction, isPending] = useActionState(loginHandler, {email: '', password: ' '});
    

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginBox}>
                <h2 className={styles.loginTitle}>Welcome Back</h2>

                <form action={loginAction}>
                    <div className={styles.inputGroup}>
                        <input className={styles.inputField}
                            type="email"
                            name="email"
                            placeholder=""
                            required
                        />
                        <label className={styles.inputLabel}>Email</label>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            name="password"
                            placeholder=""
                            required
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
