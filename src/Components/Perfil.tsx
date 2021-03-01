import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../Styles/Components/profile.module.css'
export function Profile() {

    const {level} = useContext(ChallengesContext);
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/nathan985.png" alt="Nathan Rodriuges"/>
            <div>
                <strong>Nathan Rodrigues</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}