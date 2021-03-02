import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../Styles/Components/LevelUpModal.module.css'

export function LevelUpModal(){
    
    const {level} = useContext(ChallengesContext);
    const {closeLevelUpModal} = useContext(ChallengesContext);
    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>
                <button type="button" onClick={closeLevelUpModal}>
                     <img src="/icons/close.svg" alt="Fechar modal"/>
                </button>
            </div>
        </div>
    )
}