//import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
//import About from './pages/About';
//import Contact from './pages/Contact';
import React from 'react';
// In your index.js or App.js file
import 'bootstrap/dist/css/bootstrap.min.css';







function App() {
  return (
    <div>
      <Outlet/>

      
    </div>
   
  );
}

export default App;
