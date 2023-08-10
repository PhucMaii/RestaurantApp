import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SigninPage from './pages/SigninPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <SigninPage />

    </div>
  )
}

export default App
