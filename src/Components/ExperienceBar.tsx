import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../Styles/Components/ExperienceBar.module.css'
function ExperienceBar(){

  const {courrentExpirience, experienceToNextNevel} = useContext(ChallengesContext);

  const percenttoNextLevel = Math.round((courrentExpirience * 100) / experienceToNextNevel);

  return (
      <header className={styles.experienceBar}>
        <span>0 xp</span>
        <div>
            <div style={{width: `${percenttoNextLevel}%`}} />
            <span className={styles.courrentExperience} style={{left: `${percenttoNextLevel}%`}}>{courrentExpirience} xp</span>
        </div>
        <span>{experienceToNextNevel} xp</span>
      </header>
  );
}

export default ExperienceBar;