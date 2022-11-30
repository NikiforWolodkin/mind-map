import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Error from './Pages/Error/index';
import Login from './Pages/Login/index';
import Signup from './Pages/Signup/index';
import Account from './Pages/Account/index';
import MindMap from './mind-map';

function App() {
  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/error" />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/error" element={<Error />} />
      <Route path="/login" element={
        <Login
          loggedIn={loggedIn}
          registered={registered}
          setGlobalToken={ token => setToken(token) }
          setGlobalLoggedIn={ () => setLoggedIn(true) }
          setGlobalRegistered={ () => setRegistered(false) }
        />
      } />
      <Route path="/signup" element={
        <Signup
          loggedIn={loggedIn}
          setGlobalRegistered={ () => setRegistered(true) }
        />
      } />
      <Route path="/account" element={
        <Account
          loggedIn={loggedIn}
          token={token}
          setGlobalToken={ () => setToken("") }
          setGlobalLoggedIn={ () => setLoggedIn(false) }
        />
      } />
      <Route path="/mindmap" element={
        <MindMap
          
        />
      } />
    </Routes>
  );
}

export default App;
