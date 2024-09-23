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

function App() {
  const [array, setArray] = useState([]);
  

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/api');
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  const fetchHome = async () => {
    const response = await axios.get('http://localhost:8080/home');
  };

  useEffect(() => {
    fetchAPI()
  }, []); //empty array ensure useEffects onyl runs on intial  rendering 

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
      
  )
}

export default App
