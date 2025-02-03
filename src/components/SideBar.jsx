import styles from './modules/SideBar.module.css'
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
// Icons 
import { FaHome } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { FaUser } from "react-icons/fa";


function SideBar() {
    const [userName, setUserName] = useState('')
    const [profilePhoto, setProfilePhoto] = useState(null)


    useEffect(() => {
        const storedName = localStorage.getItem('userName')
        const storedPhoto = localStorage.getItem(`profilePhoto_${storedName}`)

        if (storedName) {
            setUserName(storedName)
        }

        if (storedPhoto) {
            setProfilePhoto(storedPhoto)
        }
    }, [])


    return (
        <div className={styles.sideBar}>
            <div className={styles.profilePhotoContainer}>
                <div className={styles.photoImageContainer}>
                    <img src={profilePhoto || "https://southernplasticsurgery.com.au/wp-content/uploads/2013/10/user-placeholder.png"} alt="User photo" />
                </div>

                <p>{userName || 'Guest'}</p>
            </div>
            <ul className={styles.navBar}>
                <li><NavLink to="/" className={({ isActive }) =>
                    isActive ? `${styles.listLink} ${styles.active}` : styles.listLink
                }><FaHome />Home</NavLink></li>
                <li><NavLink to="/expenses" className={({ isActive }) =>
                    isActive ? `${styles.listLink} ${styles.active}` : styles.listLink
                }><FaCreditCard />Expenses</NavLink></li>
                <li><NavLink to="/charts" className={({ isActive }) =>
                    isActive ? `${styles.listLink} ${styles.active}` : styles.listLink
                }><IoBarChartSharp />Charts</NavLink></li>
                <li><NavLink to="/settings" className={({ isActive }) =>
                    isActive ? `${styles.listLink} ${styles.active}` : styles.listLink
                }><LuSettings2 />Settings</NavLink></li>
                <li><NavLink to="/login" className={({ isActive }) =>
                    isActive ? `${styles.listLink} ${styles.active}` : styles.listLink
                }><FaUser />Login</NavLink></li>
            </ul>
            <div className={styles.appIconContainer}>
                <p>EXP<span id={styles.middle}>ENS</span><span id={styles.final}>.IO</span></p>
            </div>
        </div>
    )
}

export default SideBar