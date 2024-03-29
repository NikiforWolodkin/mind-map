import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Error from './Pages/Error/index';
import Login from './Pages/Login/index';
import Signup from './Pages/Signup/index';
import Account from './Pages/Account/index';
import MindMap from './Pages/MindMap/index';

function App() {
  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") || false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [mindMapId, setMindMapId] = useState(localStorage.getItem("mindMapId") || "");
  
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
          setMindMapId={setMindMapId}
          setGlobalToken={ () => setToken("") }
          setGlobalLoggedIn={ () => setLoggedIn(false) }
        />
      } />
      <Route path="/mindmap" element={
        <MindMap
          loggedIn={loggedIn}
          token={token}
          mindMapId={mindMapId}
          setGlobalToken={ () => setToken("") }
          setGlobalLoggedIn={ () => setLoggedIn(false) }
        />
      } />
    </Routes>
  );
}

export default App;
