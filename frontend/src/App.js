import React from 'react';
import './_docs.scss';
import './style.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Sectors from './Sectors'
import Docs from './Docs'
import Dashboard from './Dashboard'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Sectors />} />
          <Route path="/home" element={<Sectors />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
