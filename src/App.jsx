import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WhoIsWatching from './pages/WhoIsWatching';
import AccountHomePage from './pages/AccountHomePage';
// Note: We’re not wrapping components here—the layout components are used inside each page.

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profiles" element={<WhoIsWatching />} />
      <Route path="/home" element={<AccountHomePage />} /> {/* ✅ New route */}
    </Routes>
  );
}

export default App;
