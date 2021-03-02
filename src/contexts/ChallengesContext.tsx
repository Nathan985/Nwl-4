import { createContext, useState, ReactNode, useEffect } from "react"
import Cookies from 'js-cookie';
import challengesData  from '../../challenges.json';
import { LevelUpModal } from "../Components/LevelUpModal";


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
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    courrentExpirience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children, 
    ...rest
}: ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1 );
    const [courrentExpirience, setCourrentExpirience] = useState(rest.courrentExpirience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActivechallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextNevel = Math.pow((level + 1) * 4,2);

    useEffect(() => {
        Notification.requestPermission();
    },[])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('courrentExpirience', String(courrentExpirience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    },[level, courrentExpirience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true); 
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

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
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
            completeChallenge,
            closeLevelUpModal
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}