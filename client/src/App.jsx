import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthProvider } from './contexts/authContext';
import { NotificationProvider } from './contexts/NotificationContext'
import Path from './paths';
import styles from './App.module.css'

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Logout from './components/auth/logout/Logout';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import Notification from './components/notification/Notification'
import CrystalCreate from './components/crystals/create/CrystalCreate';
import EnhancedHome from './components/home/Home';
import Loading from './components/loading/Loading';

function App() {
  return (
    <NotificationProvider>
    <AuthProvider>
      <div className={`min-vh-100 ${styles.homeScreen}`}>
        <Header />
        {/* <Suspense fallback={<h1 style={{color: 'black'}}>Loading...</h1>}> */}
        <Suspense fallback={<Loading />}>
        <Notification />
        <Routes>
          <Route path={Path.Home} element={<EnhancedHome />}/>
          <Route element={<GuestGuard />}>
            <Route path={Path.Login} element={<Login />} />
            <Route path={Path.Register} element={<Register />} />
          </Route>
          <Route element={<AuthGuard />}>
            <Route path={Path.Logout} element={<Logout />} />
            <Route path={Path.CrystalsCreate} element={<CrystalCreate />} />
          </Route>
        </Routes>
        </Suspense>
        <Footer />
      </div>
    </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
