import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WhoIsWatching from './pages/WhoIsWatching';
import AccountHomePage from './pages/AccountHomePage';
import TestModal from './pages/TestModal'; // import test page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profiles" element={<WhoIsWatching />} />
      <Route path="/home" element={<AccountHomePage />} /> 
      <Route path="/test-modal" element={<TestModal />} />
    </Routes>
  );
}

export default App;
