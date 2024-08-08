import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import Portfolio from './pages/Portfolio/Portfolio';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
    
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
        <Footer />
      </Router>
    </AppProvider>
    
  );
}

export default App;