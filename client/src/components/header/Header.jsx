import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import Path from "../../paths";
import styles from './Header.module.css';

const Header = () => {
    // const {
    //     isAuthenticated,
    //     email,
    // } = useContext(AuthContext);

    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <Link href="" className="navbar-brand p-0">
                <h1 className="text-primary m-0"><img src="img/logo.png" alt="Logo" style={{height: '35px'}} />Crystals Blog</h1>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
                    <Link to={Path.Home} className="nav-item nav-link">Home</Link>
                    <Link to={Path.Crystals} className="nav-item nav-link">Crystals</Link>
                    <Link to={Path.CrystalsCreate} className="nav-item nav-link">Publish crystal</Link>
                    <Link to={Path.Search} className="nav-item nav-link">Search</Link>
                    <Link to={Path.Contact} className="nav-item nav-link">Contact</Link>
                    <Link to={Path.About} className="nav-item nav-link">About Us</Link>
                </div>
                    <Link to={Path.Register} className={`btn btn-primary rounded-pill py-2 px-4 mx-1 ${styles.btnGradient}`}>Register</Link>
                    <Link to={Path.Login} className={`btn btn-primary rounded-pill py-2 px-4 mx-1 ${styles.btnGradient}`}>Login</Link>
                    <Link to={Path.Logout} className={`btn btn-primary rounded-pill py-2 px-4 mx-1 ${styles.btnGradient}`}>Logout</Link>
            </div>
        </nav>
          </div>
    );
};

export default Header;
