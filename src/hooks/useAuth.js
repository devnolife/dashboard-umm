// hooks/useAuth.js
import { useEffect, useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [auth, setAuth] = useState({ token: null, loading: true });
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ token, loading: false });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      setAuth({ token: null, loading: false });
    }
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          toast.error('Sesi Anda telah berakhir, silahkan login kembali');
          logout();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = (token, users) => {
    localStorage.setItem('token', token);
    localStorage.setItem('users', JSON.stringify(users));
    setAuth({ token, loading: false });
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    localStorage.removeItem('role');
    setAuth({ token: null, loading: false });
    delete axios.defaults.headers.common['Authorization'];
    Router.push('/login');
  };

  const role = (role) => {
    localStorage.setItem('role', role);
  }

  return { ...auth, login, logout, role };
};
