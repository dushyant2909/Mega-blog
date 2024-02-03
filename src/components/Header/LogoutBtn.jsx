import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../features/authSlice'
import { toast } from 'react-hot-toast'

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    //as logout is a promise so we use .then
    authService.logout()
      .then(() => {
        dispatch(logout())
        toast.success("Logged out successfully")
      })
      .catch((error) => { console.error("Error in logout::", error) });
  }

  return (
    <button
      className='text-white ml-3 lg:ml-0 px-4 duration-200 border border-red-400 hover:text-red-400 rounded-full'
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn