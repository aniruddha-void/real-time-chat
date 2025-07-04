import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password })
      localStorage.setItem('token', 'dummy-token') 
      localStorage.setItem('username', res.data.username)
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto mt-20">
      <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full mb-3 p-2 rounded border"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-3 p-2 rounded border"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
  )
}

export default Login
