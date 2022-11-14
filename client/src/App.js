import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Pages/Login/index';
import Signup from './Pages/Signup/index';
import Account from './Pages/Account/index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
