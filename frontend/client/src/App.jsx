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
import axios from 'axios' ;
import Home from './views/home';
import Index from './views/index';
import Show from './views/Show' ;
import New from './views/New' ;
import Edit from './views/Edit' ;


axios.defaults.baseURL = "http://localhost:8080" ;

function App() {
  const fetchHome = async () => {
    const response = await axios.get('http://localhost:8080/home');
  };


  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/tcas" element={<Index/>}></Route>
            <Route path="/tcas/:tcaid" element={<Show/>}></Route>
            <Route path="/tcas/:tcaid/edit" element={<Edit/>}></Route>
            <Route path="/new" element={<New/>}></Route>
        </Routes>
      </BrowserRouter>
      
  )
}

export default App ;
