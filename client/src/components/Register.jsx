
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password })
      alert('Registration successful! You can now log in.')
      navigate('/login')
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">Register</h2>
        <input type="text" placeholder="Username" value={username} required
          onChange={(e) => setUsername(e.target.value)} className="w-full mb-3 p-2 rounded border" />
        <input type="password" placeholder="Password" value={password} required
          onChange={(e) => setPassword(e.target.value)} className="w-full mb-3 p-2 rounded border" />
        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  )
}
