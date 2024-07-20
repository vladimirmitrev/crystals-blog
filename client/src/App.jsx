
import {Routes, Route} from "react-router-dom";

import Header from './components/header/Header';
import Login from "./components/login/Login";
// import Logout from "./components/logout/Logout";
import Register from "./components/register/Register";
import Path from "./paths";

function App() {

  return (
    <>
    <Header />
    <Routes>
        {/* <Route path={Path.Home} element={<Home />}/> */}
        <Route path={Path.Login} element={<Login/>}/>
        <Route path={Path.Register} element={<Register />}/>
    </Routes>
    </>
  )
}

export default App
