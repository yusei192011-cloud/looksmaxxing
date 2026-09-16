import { useMemo, useState } from 'react'
import { generateDailyMenu } from './generateDailyMenu'

export function useHomeMenu({ records, frequency, lang }) {
  const [rotation, setRotation] = useState(0)

  const menu = useMemo(
    () => generateDailyMenu({ records, frequency, lang, rotation }),
    [records, frequency, lang, rotation],
  )

  const regenerate = () => setRotation(r => r + 1)

  return { menu, regenerate }
}
