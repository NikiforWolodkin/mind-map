import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Error from './Pages/Error/index';
import Login from './Pages/Login/index';
import Signup from './Pages/Signup/index';
import Account from './Pages/Account/index';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/error" element={<Error />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<Account loggedIn={loggedIn} />} />
    </Routes>
  );
}

export default App;
