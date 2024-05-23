"use client";
import { useEffect } from 'react';
import { redirect } from 'next/navigation'

export default function Index() {
  const isAuthenticated = true;

  useEffect(() => {
    // Replace this with your actual authentication check

    if (isAuthenticated) {
      redirect('/home');
    } else {
      redirect('/login');
    }
  }, [isAuthenticated]);

  return null;
}