
import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const useSettings = () => {
    const [photo, setPhoto] = useState(null);
    const [savings, setSavings] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('authToken');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const photoUrl = reader.result;

                setPhoto(photoUrl);

                localStorage.setItem(`profilePhoto_${userName}`, photoUrl);
            };
            reader.readAsDataURL(file);
            alert('Foto de perfil atualizada com sucesso!');
            window.location.reload();
        }
    };

    const handleSavingsChange = (e) => {
        setSavings(e.target.value);
    };

    const handleSavings = async () => {
        if (!token) {
            alert('Faça login para atualizar seus dados');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.id;

            await axios.put(`https://expens-io-api.onrender.com/api/expenses/update/${userId}`, {
                username: updatedName || null,
                email: updatedEmail || null,
                password: updatedPassword || null // Envia a senha em texto plano
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (updatedName) localStorage.setItem('userName', updatedName);
            if (updatedEmail) localStorage.setItem('userEmail', updatedEmail);

            if (savings) {
                localStorage.setItem(`savings_${userName}`, savings);
            }

            alert('Dados atualizados com sucesso!');
            window.location.reload();
        } catch (error) {
            alert('Ocorreu um erro ao atualizar dados');
            console.error('Erro ao atualizar dados', error);
        }
    };

    return {
        photo,
        setPhoto,
        savings,
        setSavings,
        updatedName,
        setUpdatedName,
        updatedEmail,
        setUpdatedEmail,
        updatedPassword,
        setUpdatedPassword,
        handleFileChange,
        handleSavingsChange,
        handleSavings
    };
};

export default useSettings;