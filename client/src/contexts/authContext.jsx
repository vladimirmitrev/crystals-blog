import { createContext, useContext } from 'react';
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { types, NotificationContext } from './NotificationContext';

import * as authService from '../services/authService';
import Path from '../paths';
import usePersistedState from '../hooks/usePersistedState';

const AuthContext = createContext();

export const AuthProvider = ({ 
    children
 }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState('auth', {});
  const { showNotification } = useContext(NotificationContext);
//   console.log(showNotification);

  const loginSubmitHandler = async (values) => {
    try {
      const result = await authService.login(values.email, values.password);

      setAuth(result);
  
      localStorage.setItem('accessToken', result.accessToken);
      showNotification('You logged in successfully!', types.success);
  
      navigate(Path.Home);
    } catch(err) {
      setAuth({});
      localStorage.removeItem('accessToken');
      showNotification(err.message, types.error);
    }
     
  };

  const registerSubmitHandler = async (values) => {
        try {
            const result =  await authService.register(values.name, values.email, values.phone, values.password);
            setAuth(result);

            localStorage.setItem('accessToken', result.accessToken);
            showNotification('You signed up successfully!', types.success);
            navigate(Path.Home);
        } catch (err) {
          setAuth({})
          localStorage.removeItem('accessToken');
        showNotification(err.message, types.error);
        }
  };

  const logoutHandler = () => {
    setAuth({});
    localStorage.removeItem('accessToken');
    navigate(Path.Home);
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    loggedUserId: auth._id,
    // username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!auth.accessToken,
    userId: auth._id,
    name: auth.name,
    phone: auth.phone,
  };
  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  ) 
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;
