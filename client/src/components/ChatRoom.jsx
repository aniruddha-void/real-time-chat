import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

function ChatRoom() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const username = localStorage.getItem('username')

  useEffect(() => {
    
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => {
      socket.off('receiveMessage')
    }
  }, [])

  const handleSend = () => {
    if (message.trim() === '') return 
    const msgData = { sender: username, text: message }

    socket.emit('sendMessage', msgData) 
    setMessage('')                      
    
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <h2 className="text-xl mb-4">Welcome, {username}</h2>

      <div className="flex-grow border p-2 overflow-y-auto bg-gray-100 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === username ? 'text-right' : 'text-left'
            }`}
          >
            <span className="block font-bold">{msg.sender}</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded border"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatRoom
