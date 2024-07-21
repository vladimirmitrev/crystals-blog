import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import useForm from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import Path from '../../paths';
import styles from './Register.module.css';

const RegisterFormKeys = {
  Name: 'name',
  Email: 'email',
  Password: 'password',
  ConfirmPassword: 'confirmPassword',
};

const Register = () => {
  const { registerSubmitHandler } = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
    [RegisterFormKeys.Email]: '',
    [RegisterFormKeys.Password]: '',
    [RegisterFormKeys.ConfirmPassword]: '',
  });

  return (
      <div
        className={`col-lg-4 col-md-12 wow fadeInUp ${styles.registerForm}`}
        data-wow-delay="2s"
      >
        <form onSubmit={onSubmit}>
        <h1>Register</h1>
          <div className="row g-3">
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  name="name"
                  onChange={onChange}
                  value={values[RegisterFormKeys.Name]}
                />
                <label htmlFor="name">Your Name</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                  name="email"
                  onChange={onChange}
                  value={values[RegisterFormKeys.Email]}
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
                  value={values[RegisterFormKeys.Password]}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  onChange={onChange}
                  value={values[RegisterFormKeys.ConfirmPassword]}
                />
                <label htmlFor="confirmPassword">Confirm password</label>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100 py-3" type="submit">
                Register
              </button>
            </div>
            <div className='col-12 d-flex'>
              <span style={{color: 'black'}}>You already have an account? <Link to={Path.Login} className={`${styles.loginLink}`}>Login</Link></span>
            </div>
          </div>
        </form>
      </div>
  );
};

export default Register;
