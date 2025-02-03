import styles from './modules/Login.module.css'
import { RiAdminFill } from "react-icons/ri";
import axios from 'axios'
import { useState } from 'react';

const api = axios.create({
    baseURL: 'https://expens-io-api.onrender.com'
})

function SignUp() {

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // User register
    function newUser() {
        api.post('/api/register', {
            username,
            email,
            password
        }).then((response) => {
            if (response.status === 201 || response.status === 200) {
                alert('User created successfully!')
                window.location.href = '/login'
            } else {
                alert('An error occured. Please try again')
            }
        })
            .catch((error) => {
                console.error('Error creating user', error)
                alert('Error creating user. Please ensure your data is correct')
            })
    }



    return (
        <div className={styles.mainSection}>
            <h2>Sign Up</h2>
            <div className={styles.loginContainer}>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="nameInput">Name*</label>
                        <input type="text" name="nameInput" id="nameInput" required onChange={event => setUserName(event.target.value)} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="emailInput">Email*</label>
                        <input type="email" name="emailInput" id="emailInput" required onChange={event => setEmail(event.target.value)} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="passwordInput">Password*</label>
                        <input type="password" name="passwordInput" id="passwordInput" required onChange={event => setPassword(event.target.value)} />
                    </div>
                </div>
                <div className={styles.submitBtnContainer}>
                    <input type="button" value={'Submit'} onClick={newUser} />
                    <p>Already have an account? Login <a href="/login">here</a></p>
                </div>
                <div className={styles.adminBtnContainer}>
                    <button><a href="/"><RiAdminFill /> Join as Admin</a></button>
                </div>
            </div>
        </div>
    )
}

export default SignUp