import Hero from '../sections/Hero'
import Problem from '../sections/Problem'
import Stat from '../sections/Stat'
import Promises from '../sections/Promises'
import ClosingCTA from '../sections/ClosingCTA'
import Footer from '../sections/Footer'
import ReturnStrip from '../components/ReturnStrip'

export default function Landing({ onStart, onJourney }) {
  return (
    <>
      <ReturnStrip onContinue={onJourney} />
      <Hero onStart={onStart} />
      <Problem />
      <Stat />
      <Promises />
      <ClosingCTA onStart={onStart} />
      <Footer />
    </>
  )
}
