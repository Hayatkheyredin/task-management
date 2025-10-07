import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage: React.FC = () => {
  return (
    <main>
      {/* HERO - full viewport height */}
      <section id="home" className="container card" style={{ textAlign: 'center', padding: 56, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 48 }}>Stay Organized. Get Things Done.</h1>
        <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 18 }}>
          A simple and intuitive way to manage your daily tasks, projects, and deadlines—all in one place.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
          <Link to="/signup"><button style={{ background: '#16a34a', borderColor: '#16a34a' }}>Get Started</button></Link>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="card" style={{ display: 'grid', gap: 16 }}>
          <h2 style={{ margin: 0 }}>Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {[{
              title: 'Smart Task Lists',
              desc: 'Organize tasks by priority, project, or due date.',
              img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop'
            }, {
              title: 'Real-Time Notifications',
              desc: 'Get notified instantly when tasks update.',
              img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop'
            }, {
              title: 'Calendar View',
              desc: 'Visualize your deadlines and plan your week easily.',
              img: 'https://images.unsplash.com/photo-1518085250887-2f903c200fee?q=80&w=800&auto=format&fit=crop'
            }, {
              title: 'Progress Analytics',
              desc: 'Track completed tasks, streaks, and performance.',
              img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'
            }].map((f) => (
              <div key={f.title} className="card" style={{ overflow: 'hidden' }}>
                <img src={f.img} alt="feature" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                <h3 style={{ marginBottom: 4 }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', marginTop: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="about" className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="card" style={{ display: 'grid', gap: 16 }}>
          <h2 style={{ margin: 0 }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[{ icon: '✏️', title: 'Create an account', desc: 'Sign up and personalize your workspace.' },
              { icon: '🗂️', title: 'Add your tasks', desc: 'Organize by projects or priorities.' },
              { icon: '🚀', title: 'Stay on track', desc: 'Get reminders and monitor progress.' }].map(s => (
              <div key={s.title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36 }}>{s.icon}</div>
                <h3 style={{ marginBottom: 6 }}>{s.title}</h3>
                <p style={{ color: 'var(--muted)', marginTop: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <form className="card" style={{ display: 'grid', gap: 12, maxWidth: 640, margin: '0 auto' }} onSubmit={(e) => e.preventDefault()}>
          <h2 style={{ margin: 0, textAlign: 'center' }}>Get in touch</h2>
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginTop: 0 }}>Have feedback or questions? Send us a message.</p>
          <div className="row" style={{ gap: 12 }}>
            <input style={{ flex: 1 }} placeholder="Your name" required />
            <input style={{ flex: 1 }} placeholder="Your email" type="email" required />
          </div>
          <textarea placeholder="Message" rows={6} style={{ background: '#0b1220', border: '1px solid #1f2937', color: 'var(--text)', borderRadius: 8, padding: 12 }} required />
          <button style={{ background: '#2563eb', borderColor: '#2563eb' }}>Send Message</button>
        </form>
      </section>
    </main>
  )
}


