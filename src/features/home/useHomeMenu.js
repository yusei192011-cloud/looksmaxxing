import { useMemo, useState } from 'react'
import { useConditionCheckins } from '../../data/useConditionCheckins'
import { todayLocalDate } from '../../lib/formatDate'
import { generateDailyMenu } from './generateDailyMenu'

export function useHomeMenu({ records, frequency, lang }) {
  const [rotation, setRotation] = useState(0)
  const { data: checkins } = useConditionCheckins()

  const checkinsToday = useMemo(() => {
    const today = todayLocalDate()
    return checkins.filter(c => c.date === today)
  }, [checkins])

  const menu = useMemo(
    () => generateDailyMenu({ records, frequency, lang, rotation, checkinsToday }),
    [records, frequency, lang, rotation, checkinsToday],
  )

  const regenerate = () => setRotation(r => r + 1)

  return { menu, regenerate }
}
