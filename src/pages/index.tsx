import { CompletedChallenges } from '../Components/CompletedChallenges';
import { Countdown } from '../Components/CountDown';
import ExperienceBar from '../Components/ExperienceBar';
import { Profile } from '../Components/Perfil';
import Head from 'next/head'
import styles from '../Styles/pages/home.module.css';
import { ChallengeBox } from '../Components/ChallengeBox';
import {GetServerSideProps} from 'next'
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CoutndownProvaider } from '../contexts/CountdownContext';

interface HomeProps{
  level: number;
  courrentExpirience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  console.log(props);
  
  return (
    <ChallengesProvider 
      level={props.level}
      courrentExpirience = {props.courrentExpirience}
      challengesCompleted = {props.challengesCompleted}
    >
      <CoutndownProvaider>
        <div className={styles.container}>
          <Head>
            <title>Move.it</title>
          </Head>
          <ExperienceBar />
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </div>
      </CoutndownProvaider>
    </ChallengesProvider>
  )
}
 
export const getServerSideProps: GetServerSideProps = async (ctx)  => {

  const {level, courrentExpirience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      courrentExpirience: Number(courrentExpirience),
      challengesCompleted: Number(challengesCompleted)
    }
  }

}