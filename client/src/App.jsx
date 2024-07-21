import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import Path from './paths';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';

function App() {
  return (
    <AuthProvider>
      <div className="min-vh-100">
        <Header />
        <Routes>
          {/* <Route path={Path.Home} element={<Home />}/> */}
          <Route element={<GuestGuard />}>
            <Route path={Path.Login} element={<Login />} />
            <Route path={Path.Register} element={<Register />} />
          </Route>
          <Route element={<AuthGuard />}>
            <Route path={Path.Logout} element={<Logout />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
