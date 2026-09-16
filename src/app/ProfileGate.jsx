import { EntitlementProvider } from '../features/entitlements/EntitlementContext'
import { RankUpProvider } from '../features/rank/RankUpContext'
import { DrumPickerProvider } from '../components/DrumPicker/DrumPickerContext'
import { useUserProfile } from '../data/useUserProfile'
import SetupWizard from '../features/onboarding/SetupWizard'
import AppShell from './AppShell'
import LoadingScreen from './LoadingScreen'

// Existing users (who have workout_records but no user_profiles row, from
// before this feature existed) go through the exact same wizard a brand
// new user does — the "does a profile row exist yet?" check below is the
// entire migration story, deliberately, per the product decision to not
// special-case them.
export default function ProfileGate() {
  const { data: profile, isLoading, refetch } = useUserProfile()

  if (isLoading) return <LoadingScreen />
  if (!profile) return <SetupWizard onComplete={refetch} />

  return (
    <EntitlementProvider>
      <RankUpProvider>
        <DrumPickerProvider>
          <AppShell />
        </DrumPickerProvider>
      </RankUpProvider>
    </EntitlementProvider>
  )
}
