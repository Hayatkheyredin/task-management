import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage: React.FC = () => {
  return (
    <main style={{ width: '100%', maxWidth: 'none' }}>
      {/* HERO - full viewport height */}
      <section id="home" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        
        <div style={{ 
          width: '100%',
          padding: '0 20px',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '24px',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            Stay Organized. Get Things Done.
          </h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            marginTop: 0, 
            fontSize: '1.25rem',
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
            A simple and intuitive way to manage your daily tasks, projects, and deadlines—all in one place.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px', 
            flexWrap: 'wrap',
            marginTop: '20px'
          }}>
            <Link to="/signup">
              <button style={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
              }}
              >
                Get Started Free
              </button>
            </Link>
            <Link to="/login">
              <button style={{ 
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                Sign In
              </button>
            </Link>
          </div>
        </div>
        
        {/* Floating elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '60px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '40px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 5s ease-in-out infinite reverse'
        }} />
      </section>

      {/* FEATURES */}
      <section id="features" className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="card" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Features</h2>
            <Link to="/features" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
              View All Features →
            </Link>
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>How It Works</h2>
            <Link to="/how-it-works" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
              Learn More →
            </Link>
          </div>
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
        <div className="card" style={{ display: 'grid', gap: 16, maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>Get in touch</h2>
          <p style={{ color: 'var(--muted)', marginTop: 0 }}>Have feedback or questions? We'd love to hear from you.</p>
          <Link 
            to="/contact" 
            style={{ 
              background: '#2563eb', 
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500',
              display: 'inline-block',
              margin: '0 auto'
            }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  )
}


