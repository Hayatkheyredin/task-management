import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

// Simple test component to verify React is working
const TestApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>🚀 React App is Working!</h1>
      <p>If you can see this, React is rendering correctly.</p>
      <button 
        onClick={() => alert('Button clicked!')}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Button
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>
)


