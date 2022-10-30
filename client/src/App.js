import { Routes, Route } from 'react-router-dom';

import Login from './Pages/Login/index';
import Account from './Pages/Account/index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
