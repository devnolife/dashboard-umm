// hooks/useAuth.js
import { useEffect, useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from 'src/@core/api';

export const useAuth = () => {
  const [auth, setAuth] = useState({ token: null, loading: true, isRegistered: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth((prev) => ({ ...prev, token, loading: false }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkRegistrationStatus();
    } else {
      setAuth((prev) => ({ ...prev, token: null, loading: false }));
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

  const checkRegistrationStatus = async () => {
    try {
      const { data: { data: { isRegistered } } } = await axios.get(`${baseUrl}/user/check-register`);
      setAuth((prev) => ({ ...prev, isRegistered }));
      if (isRegistered) {
        Router.push('/registered');
      }
    } catch (error) {
      console.error('Error checking registration status', error);
    }
  };

  const login = async (token, users) => {
    localStorage.setItem('token', token);
    localStorage.setItem('users', JSON.stringify(users));
    setAuth((prev) => ({ ...prev, token, loading: false }));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    checkRegistrationStatus();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    localStorage.removeItem('role');
    setAuth({ token: null, loading: false, isRegistered: null });
    delete axios.defaults.headers.common['Authorization'];
    Router.push('/login');
  };

  const role = (role) => {
    localStorage.setItem('role', role);
  };

  return { ...auth, login, logout, role };
};
