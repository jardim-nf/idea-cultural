// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importando as páginas
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Home';
import NewProject from './pages/Dashboard/NewProject';
import ProjectAnalysis from './pages/Dashboard/ProjectAnalysis'; 
import Videos from './pages/Dashboard/Videos'; // <--- IMPORTANTE: Importar a página de vídeos

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rotas do Sistema */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/project/analysis" element={<ProjectAnalysis />} />
        
        {/* ROTA DE CAPACITAÇÃO / VÍDEOS */}
        <Route path="/videos" element={<Videos />} />
        
        {/* Rota de segurança (Curinga) - Joga pro inicio se não achar nada */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;