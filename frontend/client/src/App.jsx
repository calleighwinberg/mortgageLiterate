import { useState, useEffect } from 'react'
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Home from './views/home';
import Index from './views/index';

function App() {

  
  const fetchHome = async () => {
    const response = await axios.get('http://localhost:8080/home');
  };


  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/tcas" element={<Index/>}></Route>
        </Routes>
      </BrowserRouter>
      
  )
}

export default App ;
