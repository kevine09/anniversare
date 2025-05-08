import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookPage from './pages/BookPage'
import MapPage from './pages/MapPage';
import GamePage from './pages/GamePage'
import './styles/home.css';
import Notifications from './components/Notifications'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
    <Notifications />
    <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/livre" element={<div style={{ padding: '2rem' }}>Page du Livre</div>} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/map" element= {<MapPage  />} />
        <Route path="/game" element={<GamePage />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
