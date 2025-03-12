import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'

import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
      
    
    </>
  )
}

export default App
