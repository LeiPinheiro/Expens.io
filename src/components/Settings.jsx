// src/components/Settings.jsx
import { useEffect, useState } from 'react';
import styles from './modules/Settings.module.css';
import { IoIosAdd } from "react-icons/io";
import useSettings from './hooks/settings_hooks/useSettings.js'

function Settings() {
    const {
        photo, savings, updatedName, updatedEmail, updatedPassword, handleFileChange, handleSavingsChange, handleSavings, setUpdatedName, setUpdatedEmail, setUpdatedPassword
    } = useSettings();

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
    );
}

export default Settings;