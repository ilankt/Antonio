import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionLabelProps {
  text: string
  light?: boolean
}

export default function SectionLabel({ text, light = false }: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !lineRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={ref} className="mb-6 opacity-0">
      <span
        className={`font-sans text-xs uppercase tracking-[0.05em] ${
          light ? 'text-white/50' : 'text-muted-text'
        }`}
      >
        {text}
      </span>
      <div
        ref={lineRef}
        className={`mt-3 h-[1px] w-10 origin-left ${
          light ? 'bg-white/20' : 'bg-border-light'
        }`}
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
