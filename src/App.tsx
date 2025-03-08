import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./components/layout/NavBar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <p>This is not the greatest website in the world. This is just a tribute.</p>
    </>
  )
}

export default App
