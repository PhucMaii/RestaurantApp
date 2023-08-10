import { useState } from 'react'
import Button from './components/Button'
import { auth, googleProvider } from '../firebase.config'
import { signInWithPopup } from "firebase/auth"
import './App.css'

function App() {

  function handleSigninWithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  return (
    <>
      <Button handleClick={handleSigninWithGoogle} title="Hello World!" />
    </>
  )
}

export default App
