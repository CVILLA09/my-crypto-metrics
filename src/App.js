import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page Placeholder</div>} />
        <Route path="/details/:id" element={<div>Detail Page Placeholder</div>} />
      </Routes>
    </Router>
  );
}

export default App;
