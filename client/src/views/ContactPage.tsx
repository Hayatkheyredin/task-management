import React from 'react'

export const ContactPage: React.FC = () => (
  <form className="container card" style={{ display: 'grid', gap: 12, maxWidth: 560 }} onSubmit={(e) => e.preventDefault()}>
    <h1 style={{ margin: 0 }}>Contact</h1>
    <input placeholder="Your name" />
    <input placeholder="Your email" type="email" />
    <textarea placeholder="Message" rows={5} style={{ background: '#0b1220', border: '1px solid #1f2937', color: 'var(--text)', borderRadius: 8, padding: 10 }} />
    <button style={{ background: '#2563eb', borderColor: '#2563eb' }}>Send</button>
  </form>
)


