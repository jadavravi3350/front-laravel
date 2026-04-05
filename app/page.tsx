'use client';

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6rem',
      minHeight: '100vh'
    }}>
      <div style={{
        zIndex: 10,
        maxWidth: '80rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'monospace',
        fontSize: '0.875rem'
      }}>
        <p style={{
          position: 'fixed',
          left: 0,
          top: 0,
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          borderBottom: '1px solid #d1d5db',
          background: 'linear-gradient(to bottom, #e5e7eb, #f9fafb)',
          paddingBottom: '1.5rem',
          paddingTop: '2rem',
          backdropFilter: 'blur(12px)'
        }}>
          Get started by editing&nbsp;
          <code style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>app/page.tsx</code>
        </p>
      </div>

      <div style={{
        position: 'relative',
        display: 'flex',
        placeItems: 'center'
      }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold'
        }}>
          Hello World
        </h1>
      </div>

      <div style={{
        marginBottom: '8rem',
        display: 'grid',
        textAlign: 'center',
        maxWidth: '80rem',
        width: '100%',
        marginTop: '2rem'
      }}>
        <div style={{
          border: '1px solid transparent',
          borderRadius: '0.5rem',
          padding: '1.25rem',
          transition: 'border-color 0.3s, background-color 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#d1d5db';
          e.currentTarget.style.backgroundColor = '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}>
          <h2 style={{
            marginBottom: '0.75rem',
            fontSize: '1.5rem',
            fontWeight: 600
          }}>
            Docs{' '}
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s'
            }}>
              -&gt;
            </span>
          </h2>
          <p style={{
            margin: 0,
            maxWidth: '30ch',
            fontSize: '0.875rem',
            opacity: 0.5
          }}>
            Find in-depth information about Next.js features and API.
          </p>
        </div>
      </div>
    </main>
  );
}
