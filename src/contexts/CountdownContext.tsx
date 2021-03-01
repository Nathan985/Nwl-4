import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    active: boolean,
    startCountdown: () => void,
    resetCountdown: () => void
}

interface CountdownProvaiderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CoutndownProvaider({children}: CountdownProvaiderProps){

    let countdownTimeout: NodeJS.Timeout;

    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [active, setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setActive(true);
      }
    
      function resetCountdown() {
        setActive(false);
        clearTimeout(countdownTimeout);
        setTime(0.1 * 60);
        setHasFinished(false);
      }
    
      useEffect(() => {
        if (active && time > 0) {
          countdownTimeout = setTimeout(() => {
            setTime(time - 1);
          }, 1000)
        }
        else if (active && time === 0) {
          setHasFinished(true);
          setActive(false);
          startNewChallenge();
        }
      },
        [active, time])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            active,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
}