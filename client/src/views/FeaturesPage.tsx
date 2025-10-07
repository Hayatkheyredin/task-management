import React from 'react'

export const FeaturesPage: React.FC = () => {
  const cards = [
    { title: 'Smart Task Lists', desc: 'Group by status, priority, due date.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop' },
    { title: 'Real-Time Notifications', desc: 'Stay in sync across devices.', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop' },
    { title: 'Calendar View', desc: 'Plan your week visually.', img: 'https://images.unsplash.com/photo-1518085250887-2f903c200fee?q=80&w=800&auto=format&fit=crop' },
    { title: 'Progress Analytics', desc: 'See trends and streaks at a glance.', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop' },
  ]
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Features</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {cards.map(c => (
          <div key={c.title} className="card" style={{ overflow: 'hidden' }}>
            <img src={c.img} alt="feature" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
            <h3 style={{ marginBottom: 4 }}>{c.title}</h3>
            <p style={{ color: 'var(--muted)', marginTop: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


