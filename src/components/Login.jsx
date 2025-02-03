import styles from './modules/Login.module.css';
import { RiAdminFill } from "react-icons/ri";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('authToken');
if (!token) {
    console.error('Token não encontrado');
}

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Login frontend
    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://expens-io-api.onrender.com/api/login', {
                email,
                password
            });

            const { token, username } = response.data;

            // Limpeza de tokens antigos
            localStorage.removeItem('authToken');
            localStorage.removeItem('userName');

            // Armazenando o novo token
            localStorage.setItem('authToken', token);
            localStorage.setItem('userName', username);

            // Define o header de autorização para todas as requisições futuras
            axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

            alert('Login bem-sucedido');
            window.location.href = '/';  // Redirecionando após login
        } catch (error) {
            console.error('Erro ao realizar login', error.response?.data?.message || error.message);
            alert('Erro ao realizar login');
        }
    };

    const logAsAdmin = async () => {
        try {
            const response = await axios.post('https://expens-io-api.onrender.com/api/login', {
                email: 'adm@gmail.com',
                password: '321'
            })

            const { token, username } = response.data

            localStorage.setItem('authToken', token)
            localStorage.setItem('userName', username)

            axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
            alert('Login bem-sucedido');
            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao realizar login', error.response?.data?.message || error.message)
            alert('Erro ao atualizar login')
        }
    }

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
        </div >
    );
}

export default Login;