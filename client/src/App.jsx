import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';
import { NotificationProvider } from './contexts/NotificationContext'
import Path from './paths';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import Notification from './components/notification/Notification'

function App() {
  return (
    <NotificationProvider>
    <AuthProvider>
      <div className="min-vh-100">
        <Header />
        <Notification />
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
    </NotificationProvider>
  );
}

export default App;
