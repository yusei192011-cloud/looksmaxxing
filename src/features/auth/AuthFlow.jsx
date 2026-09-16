import { useAuthFlow } from './useAuthFlow'
import WelcomeScreen from './WelcomeScreen'
import EmailStep from './EmailStep'
import OtpStep from './OtpStep'

export default function AuthFlow() {
  const auth = useAuthFlow()

  if (auth.step === 'email') {
    return (
      <EmailStep
        email={auth.email} setEmail={auth.setEmail}
        sending={auth.sending} message={auth.message}
        onBack={auth.goToWelcome} onSend={auth.sendOtp}
      />
    )
  }

  if (auth.step === 'otp') {
    return (
      <OtpStep
        email={auth.email} otp={auth.otp} setOtp={auth.setOtp}
        verifying={auth.verifying} message={auth.message}
        onBack={auth.backToEmail} onVerify={auth.verifyOtpCode} onResend={auth.sendOtp}
      />
    )
  }

  return <WelcomeScreen onStart={auth.goToEmail} />
}
