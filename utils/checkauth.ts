'use client'
import { useState, useEffect, useMemo } from 'react';
import api from './auth';

interface UserData {
  [key: string]: any;
}
const useAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-profile/`);
          const userData = response.data;
          setUserData(userData);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, []);

  const memoizedUserData = useMemo(() => userData, [userData]);

  const handleLogin = async (newUserData: UserData) => {
    setUserData(newUserData);
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('lastTokenRefresh');
      setUserData(null);
      setLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { userData: isLoggedIn ? memoizedUserData : null, isLoggedIn, handleLogin, handleLogout };
};

export default useAuth;
