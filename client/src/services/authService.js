import * as request from '../lib/request';


const BASE_URL = 'http://localhost:3030/users'
// const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const login = async (email, password) => {
    console.log(email);
    console.log(password);
   const result = await request.post(`${BASE_URL}/login`, {
        email,
        password,
    });

    return result;
};

export const register = (email, password) => request.post(`${BASE_URL}/register`, {
    email,
    password,
});

export const logout = () => request.get(`${BASE_URL}/logout`);