import { useCallback, useState } from 'react'
import Nav from './components/Nav'
import Landing from './pages/Landing'
import Demo from './pages/Demo'

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false)

  const openDemo = useCallback(() => setDemoOpen(true), [])
  const closeDemo = useCallback(() => setDemoOpen(false), [])

  return (
    <>
      <a className="skip-link" href="#main">
        Үндсэн агуулга руу
      </a>
      <Nav onStart={openDemo} />
      <main id="main">
        <Landing onStart={openDemo} />
      </main>
      {demoOpen && <Demo onClose={closeDemo} />}
    </>
  )
}
