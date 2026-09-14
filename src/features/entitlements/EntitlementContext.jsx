import { createContext, useContext, useMemo } from 'react'

// Stub for the future freemium/subscription system. Everyone is entitled to
// everything today; swapping this provider's value for a real Stripe-backed
// check later shouldn't require touching any component that uses <Gate>.
const EntitlementContext = createContext({ tier: 'free', isEntitled: () => true })

export function EntitlementProvider({ children }) {
  const value = useMemo(() => ({ tier: 'free', isEntitled: () => true }), [])
  return <EntitlementContext.Provider value={value}>{children}</EntitlementContext.Provider>
}

export function useEntitlements() {
  return useContext(EntitlementContext)
}
