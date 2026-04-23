import { useEffect, useRef } from 'react'

const WAVE_COLORS = [
  [180, 212, 201], // teal
  [139, 115, 85],  // brown
  [180, 212, 201], // teal
  [139, 115, 85],  // brown
]

const SPACING = 52
const AMPLITUDE = 36
const FREQUENCY = 0.008
const SPEED = 0.015
const NUM_POINTS = 200
const NUM_MARKERS = 6

function calculateWaveY(x: number, time: number, waveIndex: number) {
  const primary = Math.sin(x * FREQUENCY + time * SPEED + waveIndex * 1.5) * AMPLITUDE
  const secondary = Math.sin(x * 0.015 + time * 0.01 + waveIndex * 0.8) * 18
  return (waveIndex - 1.5) * SPACING + primary + secondary
}

export default function FlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      if (w === 0 || h === 0) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    // Static noise texture - generate once
    const noiseCanvas = document.createElement('canvas')
    noiseCanvas.width = 200
    noiseCanvas.height = 200
    const noiseCtx = noiseCanvas.getContext('2d')!
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 200
      const y = Math.random() * 200
      const r = 1 + Math.random() * 1.5
      noiseCtx.beginPath()
      noiseCtx.arc(x, y, r, 0, Math.PI * 2)
      noiseCtx.fillStyle = 'rgba(15, 20, 25, 0.03)'
      noiseCtx.fill()
    }

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      const centerY = h / 2

      // Grid overlay
      ctx.strokeStyle = 'rgba(15, 20, 25, 0.04)'
      ctx.lineWidth = 0.5
      // Vertical lines
      for (let x = 0; x < w; x += 48) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      // Horizontal lines
      for (let y = 0; y < h; y += 72) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Waves
      for (let waveIdx = 0; waveIdx < 4; waveIdx++) {
        const points: { x: number; y: number }[] = []
        const step = w / NUM_POINTS

        for (let i = 0; i <= NUM_POINTS; i++) {
          const x = i * step
          const y = centerY + calculateWaveY(x, time, waveIdx)
          points.push({ x, y })
        }

        // Draw filled wave
        const [r, g, b] = WAVE_COLORS[waveIdx]
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          // Smooth curve
          const prev = points[i - 1]
          const curr = points[i]
          const cpx = (prev.x + curr.x) / 2
          ctx.quadraticCurveTo(prev.x, prev.y, cpx, (prev.y + curr.y) / 2)
        }
        ctx.lineTo(w, centerY + h / 2 + 20)
        ctx.lineTo(0, centerY + h / 2 + 20)
        ctx.closePath()
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.25)`
        ctx.fill()

        // Draw wave line
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1]
          const curr = points[i]
          const cpx = (prev.x + curr.x) / 2
          ctx.quadraticCurveTo(prev.x, prev.y, cpx, (prev.y + curr.y) / 2)
        }
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.8)`
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Circle markers
        const markerStep = Math.floor(NUM_POINTS / NUM_MARKERS)
        for (let m = 0; m < NUM_MARKERS; m++) {
          const ptIdx = m * markerStep
          if (ptIdx < points.length) {
            const markerOffset = waveIdx * 0.9 + m * 0.4
            const wobbleX = Math.sin(time * 0.02 + markerOffset) * 12
            const pt = points[Math.min(ptIdx + Math.floor(wobbleX / 5), points.length - 1)]
            ctx.beginPath()
            ctx.arc(pt.x + wobbleX, pt.y, 4, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(15, 20, 25, 0.6)'
            ctx.fill()
          }
        }
      }

      // Noise texture overlay
      ctx.drawImage(noiseCanvas, 0, 0, w, h)

      time += 1
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    const parent = canvas.parentElement!
    const ro = new ResizeObserver(() => resize())
    ro.observe(parent)

    // Also re-size when browser zoom changes the device pixel ratio
    let dprMq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    const onDprChange = () => {
      resize()
      dprMq.removeEventListener('change', onDprChange)
      dprMq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      dprMq.addEventListener('change', onDprChange)
    }
    dprMq.addEventListener('change', onDprChange)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      dprMq.removeEventListener('change', onDprChange)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full -z-0">
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
