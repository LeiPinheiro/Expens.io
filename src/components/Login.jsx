// src/components/Login.jsx
import styles from './modules/Login.module.css';
import { RiAdminFill } from "react-icons/ri";
import useLogin from './hooks/login_hooks/useLogin.js'

function Login() {
    const {
        email, setEmail, password, setPassword, handleSubmit, logAsAdmin
    } = useLogin();

    return (
        <div className={styles.mainSection}>
            <h2>Login</h2>
            <div className={styles.loginContainer}>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="emailInput">Email*</label>
                        <input
                            type="email"
                            name="emailInput"
                            id="emailInput"
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="passwordInput">Password*</label>
                        <input
                            type="password"
                            name="passwordInput"
                            id="passwordInput"
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.submitBtnContainer}>
                    <input type="button" value={'Submit'} onClick={handleSubmit} />
                    <p>Don't have an account? Sign up <a href="/signup">here</a></p>
                </div>
                <div className={styles.adminBtnContainer}>
                    <button onClick={logAsAdmin}><RiAdminFill /> Join as Admin</button>
                </div>
            </div>
        </div>
    );
}

export default Login;