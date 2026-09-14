export default function BarbellIcon({ size = 24, color = 'white' }) {
  return (
    <svg viewBox="0 0 40 24" width={size} height={size * 0.6} style={{ display: 'block', margin: '0 auto' }} aria-hidden="true">
      <rect x="0" y="2" width="7" height="20" rx="2" fill={color} />
      <rect x="7" y="5" width="4" height="14" rx="1" fill={color} />
      <rect x="11" y="9" width="18" height="6" rx="3" fill={color} />
      <rect x="29" y="5" width="4" height="14" rx="1" fill={color} />
      <rect x="33" y="2" width="7" height="20" rx="2" fill={color} />
    </svg>
  )
}
