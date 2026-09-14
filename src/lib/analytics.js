// No-op today; call sites are instrumented now so wiring in a real
// analytics SDK later is a one-file change instead of a re-audit of
// every interaction point.
export function track(event, props) {
  if (import.meta.env.DEV) console.debug('[analytics]', event, props)
}
