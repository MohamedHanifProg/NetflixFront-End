import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WhoIsWatching from './pages/WhoIsWatching';
import AccountHomePage from './pages/AccountHomePage';
import TvShows from './pages/TvShows';
import Movies from './pages/Movies'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profiles" element={<WhoIsWatching />} />
      <Route path="/home" element={<AccountHomePage />} />
      <Route path="/tv-shows" element={<TvShows />} />
      <Route path="/movies" element={<Movies />} />

      <Route path="/home" element={<AccountHomePage />} /> 
    </Routes>
  );
}

export default App;

