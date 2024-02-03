import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice'
import { Footer, Header, Loader } from './components'
import { Outlet } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

function App() {
  const [loader, setloader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        console.log("UserData::", userData);
        if (userData) {
          dispatch(login({ userData }));
        }
        else
          dispatch(logout());
      })
      .catch((error) => {
        console.log("Error in useEffect::app.jsx: ", error);
      })
      .finally(() => { setloader(false) })
  }, []);

  if (loader) {
    return (
      <Loader />
    )
  }
  return (
    <div className='w-full min-h-screen flex flex-col flex-wrap bg-gray-200'>
      <Header />
      <main className='min-h-screen'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
