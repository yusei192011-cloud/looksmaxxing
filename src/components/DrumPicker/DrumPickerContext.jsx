import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import DrumPicker from './DrumPicker'

const DrumPickerContext = createContext(null)

// cfg shape: { title, sep?, drums: [{ items:[{label,value}], current, suffix?, label? }], onConfirm(values) }
export function DrumPickerProvider({ children }) {
  const [cfg, setCfg] = useState(null)

  const openPicker = useCallback((newCfg) => setCfg(newCfg), [])
  const closePicker = useCallback(() => setCfg(null), [])

  const value = useMemo(() => ({ openPicker, closePicker }), [openPicker, closePicker])

  return (
    <DrumPickerContext.Provider value={value}>
      {children}
      <DrumPicker cfg={cfg} onClose={closePicker} />
    </DrumPickerContext.Provider>
  )
}

export function useDrumPicker() {
  const ctx = useContext(DrumPickerContext)
  if (!ctx) throw new Error('useDrumPicker must be used within a DrumPickerProvider')
  return ctx
}
