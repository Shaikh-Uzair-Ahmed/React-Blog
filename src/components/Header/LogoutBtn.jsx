import React from 'react'
import AuthService from '../../appwrite/auth'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/authSlice'
function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
    AuthService.logout().then(() => {
        dispatch(logout());
    }).catch((error) => {
        console.error('Logout failed:', error)
      })
  }

  return <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
}

export default LogoutBtn