
import {Routes, Route} from "react-router-dom";

import Header from './components/header/Header';
import Login from "./components/login/Login";
// import Logout from "./components/logout/Logout";
import Register from "./components/register/Register";

function App() {

  return (
    <>
    <Header />
    <h1>Crystals blog</h1>
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register />}/>
    </Routes>
    </>
  )
}

export default App
