import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Login from './components/login/Login';
// import Logout from "./components/logout/Logout";
import Register from './components/register/Register';
import Path from './paths';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className='min-vh-100'>
      <Header />
      <Routes>
        {/* <Route path={Path.Home} element={<Home />}/> */}
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.Register} element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
