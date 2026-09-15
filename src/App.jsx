import { useEffect, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { supabase } from './lib/supabase'
import { queryClient } from './data/queryClient'
import { LangProvider } from './i18n/LangContext'
import { ToastProvider } from './components/Toast'
import { DrumPickerProvider } from './components/DrumPicker/DrumPickerContext'
import { RankUpProvider } from './features/rank/RankUpContext'
import { EntitlementProvider } from './features/entitlements/EntitlementContext'
import ErrorBoundary from './app/ErrorBoundary'
import AppShell from './app/AppShell'

export default function App() {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [step, setStep] = useState('email') // 'email' | 'otp'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // メールアドレスにOTPを送信
  const handleSendOtp = async () => {
    if (!email) return
    setSending(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    })
    if (error) {
      setMessage('送信に失敗しました。もう一度お試しください。')
    } else {
      setStep('otp')
      setMessage('6桁のコードをメールに送りました！')
    }
    setSending(false)
  }

  // 6桁コードで認証
  const handleVerifyOtp = async () => {
    if (!otp) return
    setVerifying(true)
    setMessage('')
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    })
    if (error) {
      setMessage('コードが間違っています。もう一度確認してください。')
    }
    setVerifying(false)
  }

  if (authLoading) return (
    <div style={s.center}>
      <div style={{color:'#666',fontFamily:'sans-serif',letterSpacing:'2px'}}>LOADING...</div>
    </div>
  )

  if (!user) return (
    <div style={s.center}>
      <div style={s.card}>
        <div style={s.title}>LOOKSMAXXING</div>
        <div style={s.sub}>筋トレ記録アプリ</div>

        {step === 'email' ? (
          <>
            <input
              style={s.input}
              type="email"
              placeholder="メールアドレス"
              aria-label="メールアドレス"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
            />
            <button style={s.btn} onClick={handleSendOtp} disabled={sending}>
              {sending ? '送信中...' : 'コードを送る'}
            </button>
          </>
        ) : (
          <>
            <div style={s.emailLabel}>{email}</div>
            <input
              style={{...s.input, textAlign:'center', fontSize:'24px', letterSpacing:'8px'}}
              type="number"
              placeholder="000000"
              aria-label="認証コード"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
              maxLength={6}
            />
            <button style={s.btn} onClick={handleVerifyOtp} disabled={verifying}>
              {verifying ? '確認中...' : 'ログイン'}
            </button>
            <button style={s.backBtn} onClick={() => { setStep('email'); setOtp(''); setMessage(''); }}>
              ← メールアドレスを変更
            </button>
          </>
        )}

        {message && <div style={s.msg}>{message}</div>}
      </div>
    </div>
  )

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LangProvider>
          <EntitlementProvider>
            <ToastProvider>
              <RankUpProvider>
                <DrumPickerProvider>
                  <AppShell />
                </DrumPickerProvider>
              </RankUpProvider>
            </ToastProvider>
          </EntitlementProvider>
        </LangProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

const s = {
  center: { display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', background:'var(--bg)' },
  card: { background:'var(--s1)', border:'1px solid var(--b1)', borderRadius:'16px', padding:'48px 28px', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', width:'300px' },
  title: { color:'var(--ac2)', fontFamily:"'Bebas Neue',sans-serif", fontSize:'28px', letterSpacing:'4px' },
  sub: { color:'var(--t4)', fontSize:'12px', letterSpacing:'2px', marginBottom:'8px' },
  input: { background:'var(--s2)', border:'1px solid var(--b2)', borderRadius:'8px', color:'var(--t1)', padding:'14px', fontSize:'16px', width:'100%', boxSizing:'border-box' },
  btn: { background:'var(--grad)', color:'#fff', border:'none', borderRadius:'8px', padding:'14px', fontSize:'15px', fontWeight:'700', cursor:'pointer', width:'100%', letterSpacing:'2px' },
  backBtn: { background:'transparent', color:'var(--t4)', border:'none', fontSize:'13px', cursor:'pointer', marginTop:'-4px' },
  emailLabel: { color:'var(--t2)', fontSize:'13px', marginBottom:'4px' },
  msg: { color:'var(--green)', fontSize:'13px', textAlign:'center', marginTop:'4px' },
}
