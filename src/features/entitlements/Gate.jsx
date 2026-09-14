import { useEntitlements } from './EntitlementContext'

// Wraps a feature that may become paywalled later. `fallback` renders in
// place of children once `isEntitled` can actually say no; today it never
// does, so this is a no-op boundary marking where that logic will attach.
export default function Gate({ feature, fallback = null, children }) {
  const { isEntitled } = useEntitlements()
  return isEntitled(feature) ? children : fallback
}
