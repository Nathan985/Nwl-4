import '../Styles/GlobalStyles.css';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CoutndownProvaider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <CoutndownProvaider>
        <Component {...pageProps} />
      </CoutndownProvaider>
    </ChallengesProvider>
  )
}

export default MyApp
