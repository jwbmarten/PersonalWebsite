import { Routes, Route } from "react-router-dom";
import './App.css'

import Home from "./components/pages/Home"
import AnalyticsPing from "./components/analytics/AnalyticsPing";
import Stats from "./components/pages/Stats";

function App() {
  return (
    <>
      <AnalyticsPing />  {/* Mounting the analytics component once, inside the Router context → useLocation works and resends API ping whenever the page is changed*/}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats/>} />
      </Routes>
    </>
  )
}

export default App
