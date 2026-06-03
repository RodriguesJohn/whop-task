// Minimal monochrome line icons (currentColor) — replaces emoji across the app.
const base = {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
}

export function Icon({ name, size = 22, fill, stroke = 1.7, className }) {
  const p = { ...base, width: size, height: size, strokeWidth: stroke, className }
  switch (name) {
    case 'home':
      return <svg {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
    case 'grid':
      return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
    case 'chat':
      return <svg {...p}><path d="M4 5h16v11H8l-4 4z" /></svg>
    case 'compass':
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>
    case 'mic':
      return <svg {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>
    case 'arrow-up':
      return <svg {...p}><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></svg>
    case 'plus':
      return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>
    case 'lock':
      return <svg {...p}><rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></svg>
    case 'play':
      return <svg {...p} fill={fill || 'currentColor'} stroke="none"><path d="M8 5.5v13l11-6.5z" /></svg>
    case 'heart':
      return <svg {...p}><path d="M12 20s-7-4.4-9.2-8.5C1.3 8.6 2.8 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.2 0 4.7 3.1 3.2 6C19 15.6 12 20 12 20z" /></svg>
    case 'share':
      return <svg {...p}><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" /></svg>
    case 'upload':
      return <svg {...p}><path d="M12 16V6" /><path d="m8 9 4-4 4 4" /><path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" /></svg>
    case 'aa':
      return <svg {...p} strokeWidth={1.5}><path d="M4 17 8 7l4 10" /><path d="M5.2 14h5.6" /><path d="M15 17l3-7 3 7" /><path d="M15.8 14.5h4.4" /></svg>
    default:
      return null
  }
}
