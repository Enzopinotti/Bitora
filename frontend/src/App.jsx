import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LaboratoryPage from './pages/LaboratoryPage';
import ComparisonPage from './pages/ComparisonPage';
import TheoryPage from './pages/TheoryPage';
import NotFoundPage from './pages/NotFoundPage';

// Import our global Sass styles
import './styles/main.scss';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/laboratorio" element={<LaboratoryPage />} />
          <Route path="/comparacion" element={<ComparisonPage />} />
          <Route path="/teoria" element={<TheoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
