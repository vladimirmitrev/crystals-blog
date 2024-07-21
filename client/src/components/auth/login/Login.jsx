import { useContext } from 'react';
import AuthContext from '../../../contexts/authContext';
import { Link } from 'react-router-dom';
import Path from '../../../paths';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { loginSubmitHandler } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be at least 6 characters')
        .max(32, 'Password should be no longer than 30 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      loginSubmitHandler(values);
      // console.log(values);
    },
  });

  return (
    <div
        className={`col-lg-4 col-md-12 wow fadeInUp ${styles.loginForm}`}
        data-wow-delay="2s"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                <p className={styles.inputError}>{formik.errors.email}</p>
              ) : null}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                <p className={styles.inputError}>{formik.errors.password}</p>
              ) : null}
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
