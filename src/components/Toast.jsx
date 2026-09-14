import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ msg: '', show: false })
  const timerRef = useRef(null)

  const showToast = useCallback((msg, ms = 3000) => {
    setToast({ msg, show: true })
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setToast(t => ({ ...t, show: false })), ms)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div id="toast" className={toast.show ? 'show' : ''} role="status" aria-live="polite">{toast.msg}</div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
