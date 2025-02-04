

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://expens-io-api.onrender.com/api/login', {
                email,
                password
            });

            const { token, username } = response.data;

            localStorage.removeItem('authToken');
            localStorage.removeItem('userName');

            localStorage.setItem('authToken', token);
            localStorage.setItem('userName', username);

            axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';

            alert('Login bem-sucedido');
            window.location.href = '/';
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
            });

            const { token, username } = response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('userName', username);

            axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
            alert('Login bem-sucedido');
            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao realizar login', error.response?.data?.message || error.message);
            alert('Erro ao atualizar login');
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        logAsAdmin
    };
};

export default useLogin;