import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Icon } from './icons'

const CONFETTI_COLORS = ['#4ade80', '#22d3ee', '#fbbf24', '#fb923c', '#a78bfa', '#f472b6', '#38bdf8']

function ConfettiBurst() {
  const reduce = useReducedMotion()
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        angle: (i / 26) * Math.PI * 2 + Math.random() * 0.4,
        dist: 85 + Math.random() * 95,
        delay: Math.random() * 0.12,
        duration: 1.55 + Math.random() * 0.55,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: 5 + Math.random() * 5,
        h: 7 + Math.random() * 9,
        spin: Math.random() > 0.5 ? 220 : -220,
      })),
    []
  )

  if (reduce) return null

  return (
    <div className="celebration-layer" aria-hidden>
      {pieces.map((p) => {
        const tx = Math.cos(p.angle) * p.dist
        const ty = Math.sin(p.angle) * p.dist * 0.55 - 40
        return (
          <motion.span
            key={p.id}
            className="confetti-piece"
            style={{
              background: p.color,
              width: p.w,
              height: p.h,
              left: '50%',
              top: '50%',
              marginLeft: -p.w / 2,
              marginTop: -p.h / 2,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
            animate={{
              x: tx,
              y: ty,
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1, 1, 0.6],
              rotate: p.spin,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.22, 0.61, 0.36, 1],
              times: [0, 0.08, 0.75, 1],
            }}
          />
        )
      })}
    </div>
  )
}

export function AnimatedDoneCheck({ label = 'Success' }) {
  const reduce = useReducedMotion()

  return (
    <div className="done-check-hero">
      <ConfettiBurst />
      <motion.div
        className="done-check"
        role="img"
        aria-label={label}
        initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0.65, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: 'spring', stiffness: 420, damping: 22, mass: 0.8 }
        }
      >
        <motion.div
          initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { delay: 0.12, type: 'spring', stiffness: 500, damping: 24 }
          }
        >
          <Icon name="check" size={34} />
        </motion.div>
      </motion.div>
    </div>
  )
}
