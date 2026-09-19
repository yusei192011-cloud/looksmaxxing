import { Component } from 'react'

// Plain boundary today (console logging only). This is the seam a real
// error-monitoring SDK (e.g. Sentry.ErrorBoundary) slots into later without
// restructuring AppShell.
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={styles.wrap}>
          <div style={styles.title}>問題が発生しました</div>
          <div style={styles.body}>ページを再読み込みしてください。</div>
          <button style={styles.btn} onClick={() => window.location.reload()}>再読み込み</button>
        </div>
      )
    }
    return this.props.children
  }
}

const styles = {
  wrap: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px', minHeight:'100vh', padding:'24px', textAlign:'center', background:'var(--bg)' },
  title: { fontFamily:"'Fredoka','Zen Maru Gothic',sans-serif", fontSize:'22px', letterSpacing:'2px', color:'var(--t1)' },
  body: { fontSize:'14px', color:'var(--t2)' },
  btn: { background:'var(--grad)', color:'#fff', border:'none', borderRadius:'8px', padding:'12px 24px', fontSize:'14px', fontWeight:'700', cursor:'pointer' },
}
