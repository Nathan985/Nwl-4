import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../Styles/Components/Countdown.module.css'
import {CountdownContext} from '../contexts/CountdownContext'
export function Countdown() {

  const {
    minutes, 
    seconds, 
    hasFinished, 
    active, 
    resetCountdown, 
    startCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {
        hasFinished ? (
          <button
            disabled
            className={`${styles.CountdownButton}`}
          >Ciclo Encerrado
          <img src="icons/green-check.svg" alt="Confirm"/>
          </button>
        ) : (
            active ? (
              
              <button
                type="button"
                className={`${styles.CountdownButton} ${styles.CountdownButtonActive}`}
                onClick={resetCountdown}
              >Abandonar Ciclo
              </button>
            ) : (

                <button
                  type="button"
                  className={styles.CountdownButton}
                  onClick={startCountdown}
                >Iniciar um ciclo</button>)
          )
      }
    </div>
  )
}