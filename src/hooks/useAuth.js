import { useEffect, useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
export const useAuth = () => {
  const [auth, setAuth] = useState({ token: null, loading: true });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ token, loading: false });
    } else {
      setAuth({ token: null, loading: false });
    }
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
    Router.push('/login');
  };

  const role = (role) => {
    localStorage.setItem('role', role);
  }

  return { ...auth, login, logout, role };
};
