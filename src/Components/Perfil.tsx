import React from 'react';
import styles from '../Styles/Components/profile.module.css'
export function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/nathan985.png" alt="Nathan Rodriuges"/>
            <div>
                <strong>Nathan Rodrigues</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>
    );
}