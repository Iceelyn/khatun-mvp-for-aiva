import { useCallback, useState } from 'react'
import Nav from './components/Nav'
import Landing from './pages/Landing'
import Demo from './pages/Demo'

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false)
  const [demoStage, setDemoStage] = useState(undefined)

  // openDemo() is also used as an onClick handler, so guard against the event arg.
  const openDemo = useCallback((stage) => {
    setDemoStage(typeof stage === 'string' ? stage : undefined)
    setDemoOpen(true)
  }, [])
  const openJourney = useCallback(() => openDemo('journey'), [openDemo])
  const closeDemo = useCallback(() => setDemoOpen(false), [])

  return (
    <>
      <a className="skip-link" href="#main">
        Үндсэн агуулга руу
      </a>
      <Nav onStart={openDemo} />
      <main id="main">
        <Landing onStart={openDemo} onJourney={openJourney} />
      </main>
      {demoOpen && <Demo onClose={closeDemo} initialStage={demoStage} />}
    </>
  )
}
