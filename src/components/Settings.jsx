import { useEffect, useState } from 'react';
import styles from './modules/Settings.module.css'
import { IoIosAdd } from "react-icons/io";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

function Settings() {
    const [photo, setPhoto] = useState(null)
    const [savings, setSavings] = useState('')
    const userName = localStorage.getItem('userName')
    const [updatedName, setUpdatedName] = useState('')
    const [updatedEmail, setUpdatedEmail] = useState('')
    const [updatedPassword, setUpdatedPassword] = useState('')
    const [userData, setUserData] = useState(null)
    const token = localStorage.getItem('authToken')

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const photoUrl = reader.result

                setPhoto(photoUrl)

                localStorage.setItem(`profilePhoto_${userName}`, photoUrl)
            }
            reader.readAsDataURL(file)
            alert('Foto de perfil atualizada com sucesso!')
            window.location.reload()
        }
    }

    const handleSavingsChange = (e) => {
        setSavings(e.target.value)
    }

    const handleSavings = async () => {
        const token = localStorage.getItem('authToken');

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
                localStorage.setItem(`savings_${userName}`, savings)
            }

            alert('Dados atualizados com sucesso!');
            window.location.reload();
        } catch (error) {
            alert('Ocorreu um erro ao atualizar dados');
            console.error('Erro ao atualizar dados', error);
        }
    };



    return (
        <div className={styles.mainSection}>
            <div className={styles.inputsContainer}>
                <h2>Settings</h2>
                <div className={styles.inputContainer}>
                    <label htmlFor="inputName">Change user name:</label>
                    <input type="text" name="inputName" id="inputName" onChange={(event) => setUpdatedName(event.target.value)} />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="inputName">Change user email:</label>
                    <input type="email" name="inputEmail" id="inputEmail" onChange={(event) => setUpdatedEmail(event.target.value)} />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="inputName">Change user password:</label>
                    <input type="password" name="inputPassword" id="inputPassword" onChange={(event) => setUpdatedPassword(event.target.value)} />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="inputSavings">Add your savings:</label>
                    <input type="number" name="inputSavings" id="inputSavings" onChange={handleSavingsChange} />
                </div>
                <div className={styles.buttonContainer}>
                    <input type="button" value={'Submit'} onClick={handleSavings} />
                </div>
            </div>
            <div className={styles.rightContainer}>
                <h2>Change Photo</h2>
                <div className={styles.photoContainer}>
                    <p><IoIosAdd /></p>
                    <input type="file" accept='image/*' onChange={handleFileChange} />
                </div>
            </div>
        </div>
    )
}

export default Settings