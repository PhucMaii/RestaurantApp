import { useState } from 'react'
import Button from './components/Button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button title="Hello World!" />
    </>
  )
}

export default App
