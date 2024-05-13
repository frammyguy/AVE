import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/header'
import App from './App'
import Paper from './components/Paper/paper'

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.sass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/paper" element={<Paper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
