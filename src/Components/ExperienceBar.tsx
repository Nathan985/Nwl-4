import React from 'react';
import styles from '../Styles/Components/ExperienceBar.module.css'
function ExperienceBar(){
  return (
      <header className={styles.experienceBar}>
        <span>0 xp</span>
        <div>
            <div style={{width: '50%'}} />
            <span className={styles.courrentExperience} style={{left: '50%'}}>300 xp</span>
        </div>
        <span>600 xp</span>
      </header>
  );
}

export default ExperienceBar;