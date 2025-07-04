import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'
import Register from './components/Register'

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <ChatRoom /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
