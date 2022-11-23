
import React from "react";
import Music from "./COMPONENT/Music";
import Loglog from "./COMPONENT/Loglog"
import Login from "./COMPONENT/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Loglog" element={<Loglog />} />
        <Route path="/Music" element={<Music />} />
      </Routes>

    </BrowserRouter>

  )
}
export default App;
