import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WhoIsWatching from './pages/WhoIsWatching';
import AccountHomePage from './pages/AccountHomePage';
import TvShows from './pages/TvShows';
import Movies from './pages/Movies'
import Review from './pages/Review';
import MyList from './pages/MyList';
import NewAndPopular from './pages/NewAndPopular'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profiles" element={<WhoIsWatching />} />
      <Route path="/home" element={<AccountHomePage />} />
      <Route path="/tv-shows" element={<TvShows />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/review" element={<Review />} />
      <Route path="/mylist" element={<MyList />} />
      <Route path="/new-popular" element={<NewAndPopular />} /> 
    </Routes>
  );
}


export default App;

