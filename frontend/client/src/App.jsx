import { useState, useEffect } from 'react'
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
{
  /* The following line can be included in your src/index.js or App.js file */
}
//import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'
import axios from 'axios';
import Home from './views/home';
import Index from './views/index';
import Show from './views/Show';
import New from './views/New';
import Edit from './views/Edit';
import Boilerplate from './partials/boilerplate';
import Sidebar from './partials/sidebar';


axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const fetchHome = async () => {
    const response = await axios.get('http://localhost:8080/home');
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route element={<Boilerplate />}>
          <Route path="/tcas" element={<Index />}></Route>
          <Route path="/tcas/:tcaid" element={<Show />}></Route>
          <Route path="/tcas/:tcaid/edit" element={<Edit />}></Route>
          <Route path="/new" element={<New />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
