import { CompletedChallenges } from '../Components/CompletedChallenges';
import { Countdown } from '../Components/CountDown';
import ExperienceBar from '../Components/ExperienceBar';
import { Profile } from '../Components/Perfil';
import Head from 'next/head'
import styles from '../Styles/pages/home.module.css';

export default function Home() {
  return (
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

        </div>
      </section>
    </div>
  )
}