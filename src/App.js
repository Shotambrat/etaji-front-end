import React from 'react'
import Main from './pages/Main';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UsersPage from './pages/UsersPage';

function App() {


  return (
    <div>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
