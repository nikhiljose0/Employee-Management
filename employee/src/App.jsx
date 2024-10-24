import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import Dashboard from './Pages/Dashboard'
import Landing from './Pages/Landing'
import { Routes,Route } from 'react-router-dom'
import Header from './Components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path ='/' element={<Landing/> } />
      <Route path ='/dash' element={<Dashboard/>} />
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
