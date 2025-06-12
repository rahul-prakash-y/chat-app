import React from 'react'
import { NavBar } from './components'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage,LoginPage,ProfilePage, SettingsPage,SignUpPage } from './pages'
import {useAuthStore} from './store'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  console.log(onlineUsers);
  React.useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log({authUser});
  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div >
      <NavBar/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/>: <Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to='/'/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/'/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/>: <Navigate to='/login'/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
