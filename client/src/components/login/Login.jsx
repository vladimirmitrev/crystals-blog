import { useContext } from 'react';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';
import { Link } from 'react-router-dom';
import Path from '../../paths';
import styles from './Login.module.css';

const LoginFormKeys = {
  Email: 'email',
  Password: 'password',
}

const Login = () => {
  const { loginSubmitHandler } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
    [LoginFormKeys.Email]: '',
    [LoginFormKeys.Password]: '',
  });

  return (
    <div
        className={`col-lg-4 col-md-12 wow fadeInUp ${styles.loginForm}`}
        data-wow-delay="2s"
      >
        <form onSubmit={onSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                  name="email"
                  onChange={onChange}
                  value={values[LoginFormKeys.Email]}
                />
                <label htmlFor="email">Your Email</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                  value={values[LoginFormKeys.Password]}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100 py-3" type="submit">
                Login
              </button>
            </div>
            <div className='col-12 d-flex'>
              <span style={{color: 'black'}}>You don`t have an account? <Link to={Path.Register} className={`${styles.registerLink}`}>Register</Link></span>
            </div>
          </div>
        </form>
      </div>
  );
};

export default Login;
