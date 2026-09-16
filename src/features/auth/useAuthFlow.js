import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useLang } from '../../i18n/LangContext'

// step: 'welcome' | 'email' | 'otp'
export function useAuthFlow() {
  const { t } = useLang()
  const [step, setStep] = useState('welcome')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [message, setMessage] = useState('')

  const goToEmail = () => { setStep('email'); setMessage('') }
  const goToWelcome = () => { setStep('welcome'); setMessage('') }
  const backToEmail = () => { setStep('email'); setOtp(''); setMessage('') }

  const sendOtp = async () => {
    if (!email) return
    setSending(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
    if (error) setMessage(t('email_send_error'))
    else setStep('otp')
    setSending(false)
  }

  const verifyOtpCode = async () => {
    if (!otp || otp.length < 6) return
    setVerifying(true)
    setMessage('')
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
    if (error) setMessage(t('otp_error'))
    setVerifying(false)
  }

  return {
    step, email, setEmail, otp, setOtp, sending, verifying, message,
    goToEmail, goToWelcome, backToEmail, sendOtp, verifyOtpCode,
  }
}
