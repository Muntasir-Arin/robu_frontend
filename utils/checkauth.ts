'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const isAuthenticated = /* Fetch authentication status from your backend */ false;
const position = /* Fetch user's position from your backend */ 'Not a member';

export const checkLogin = () => {
  const router = useRouter();
  
  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  return { position };
};

export const checkNotLogin = () => {
  const router = useRouter();
  
  useEffect(() => {
    // If user is not authenticated, redirect to login page
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  return { position };
};