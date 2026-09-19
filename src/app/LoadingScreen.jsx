export default function LoadingScreen() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ color: 'var(--t3)', fontFamily: "'Nunito','Zen Maru Gothic',sans-serif", letterSpacing: '2px' }}>LOADING...</div>
    </div>
  )
}
