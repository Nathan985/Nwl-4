import { createContext, useState, ReactNode, useEffect } from "react"

import challengesData  from '../../challenges.json';

interface ChallengeType {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    levelUp: () => void;
    courrentExpirience: number;
    challengesCompleted: number;
    startNewChallenge: () => void;
    activeChallenge: ChallengeType;
    resetChallenge: () => void;
    experienceToNextNevel: number;
    completeChallenge: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}: ChallengesProviderProps){

    const [level, setLevel] = useState(1);
    const [courrentExpirience, setCourrentExpirience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActivechallenge] = useState(null);

    const experienceToNextNevel = Math.pow((level + 1) * 4,2);

    useEffect(() => {
        Notification.requestPermission();
    },[])

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallenge = Math.floor(Math.random() * challengesData.length);
        const challenge = challengesData[randomChallenge];

        setActivechallenge(challenge);

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🤟🏻', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }

        new Audio('/notification.mp3').play();
    }

    function resetChallenge() {
        setActivechallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const {amount} = activeChallenge;

        let finalExperience = courrentExpirience + amount;

        if(finalExperience >= experienceToNextNevel){
            finalExperience = finalExperience - experienceToNextNevel;
            levelUp();
        }

        setCourrentExpirience(finalExperience);
        setActivechallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return(
        <ChallengesContext.Provider value={{
            level, 
            levelUp,
            courrentExpirience,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextNevel,
            completeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}