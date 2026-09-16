import { useRef } from 'react'

const LENGTH = 6

export default function OtpDigitInput({ value, onChange, onComplete }) {
  const refs = useRef([])
  const digits = Array.from({ length: LENGTH }, (_, i) => value[i] || '')

  const setDigit = (i, char) => {
    const next = digits.slice()
    next[i] = char
    const joined = next.join('')
    onChange(joined)
    if (char && i < LENGTH - 1) refs.current[i + 1]?.focus()
    if (joined.length === LENGTH && !joined.includes('')) onComplete?.(joined)
  }

  const handleChange = (i, e) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (!raw) { setDigit(i, ''); return }
    // Handles a fast paste-like burst of digits into one box too.
    if (raw.length > 1) {
      const next = value.split('')
      for (let k = 0; k < raw.length && i + k < LENGTH; k++) next[i + k] = raw[k]
      const joined = next.join('').slice(0, LENGTH)
      onChange(joined)
      const lastFilled = Math.min(i + raw.length, LENGTH - 1)
      refs.current[lastFilled]?.focus()
      if (joined.length === LENGTH && !joined.includes('')) onComplete?.(joined)
      return
    }
    setDigit(i, raw)
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  return (
    <div className="otp-digits">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el }}
          className="otp-digit"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={d}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}
