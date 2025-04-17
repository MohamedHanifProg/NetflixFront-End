import { Routes, Route, Navigate } from 'react-router-dom';

import Login             from './pages/Login';
import Signup            from './pages/Signup';
import WhoIsWatching     from './pages/WhoIsWatching';
import AccountHomePage   from './pages/AccountHomePage';
import TvShows           from './pages/TvShows';
import Movies            from './pages/Movies';
import Review            from './pages/Review';
import MyList            from './pages/MyList';
import NewAndPopular     from './pages/NewAndPopular';
import Browse            from './pages/Browse';

import AdminProgramPage       from './pages/AdminProgramPage';
import AdminProgramDashboard  from './pages/AdminProgramDashboard';
import EditProgramPage        from './pages/EditProgramPage';
import AdminLogsPage          from './pages/AdminLogsPage';
import AdminDashboard         from './pages/AdminDashboard';

import ProtectedRoute from './components//ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/"        element={<Login />}  />
      <Route path="/signup"  element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profiles"     element={<WhoIsWatching />}   />
        <Route path="/home"         element={<AccountHomePage />} />
        <Route path="/tv-shows"     element={<TvShows />}         />
        <Route path="/movies"       element={<Movies />}          />
        <Route path="/review"       element={<Review />}          />
        <Route path="/mylist"       element={<MyList />}          />
        <Route path="/new-popular"  element={<NewAndPopular />}   />
        <Route path="/browse"       element={<Browse />}          />
      </Route>

      <Route element={<ProtectedRoute onlyAdmin />}>
        <Route path="/admin/dashboard"          element={<AdminDashboard />}        />
        <Route path="/admin/programs"           element={<AdminProgramDashboard />} />
        <Route path="/admin/programs/new"       element={<AdminProgramPage />}      />
        <Route path="/admin/programs/edit/:id"  element={<EditProgramPage />}       />
        <Route path="/admin/logs"               element={<AdminLogsPage />}         />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
