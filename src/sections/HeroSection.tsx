import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import FlowCanvas from '../components/FlowCanvas'

const researchTags = [
  'Service Operations',
  'Data Science',
  'AI for Service',
  'Behavioral Operations',
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const institutionRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Canvas fade in
    if (canvasWrapRef.current) {
      gsap.fromTo(
        canvasWrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' }
      )
    }

    // Title character reveal
    if (titleRef.current) {
      const text = titleRef.current.textContent || ''
      const chars = text.split('')
      titleRef.current.innerHTML = ''
      const charSpans: HTMLSpanElement[] = []
      chars.forEach((char) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        titleRef.current!.appendChild(span)
        charSpans.push(span)
      })
      tl.fromTo(
        charSpans,
        { opacity: 0, yPercent: 40 },
        { opacity: 1, yPercent: 0, duration: 0.6, ease: 'power3.out', stagger: 0.03 },
        0.5
      )
    }

    // Subtitle word fade
    if (subtitleRef.current) {
      const text = subtitleRef.current.textContent || ''
      const words = text.split(' ')
      subtitleRef.current.innerHTML = ''
      const wordSpans: HTMLSpanElement[] = []
      words.forEach((word, i) => {
        if (i > 0) {
          const space = document.createElement('span')
          space.innerHTML = '&nbsp;'
          space.style.display = 'inline'
          subtitleRef.current!.appendChild(space)
        }
        const span = document.createElement('span')
        span.textContent = word
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        subtitleRef.current!.appendChild(span)
        wordSpans.push(span)
      })
      tl.fromTo(
        wordSpans,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 },
        '-=0.2'
      )
    }

    // Institution fade up
    if (institutionRef.current) {
      tl.fromTo(
        institutionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
    }

    // Tags stagger
    if (tagsRef.current) {
      const tags = tagsRef.current.children
      tl.fromTo(
        tags,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
        '-=0.3'
      )
    }

    // CTAs fade up
    if (ctasRef.current) {
      tl.fromTo(
        ctasRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
    }

    return () => {
      tl.kill()
    }
  }, [])

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Animated Flow Canvas Background */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 z-0 opacity-0"
        style={{ height: '360px', top: '50%', transform: 'translateY(-50%)' }}
      >
        <FlowCanvas />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-8 w-full pt-[15vh]">
        <h1
          ref={titleRef}
          className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] text-ink leading-[1.1] tracking-[-0.02em] mb-4"
        >
          Antonio Castellanos
        </h1>

        <p
          ref={subtitleRef}
          className="font-sans text-[18px] sm:text-[20px] lg:text-[24px] text-charcoal leading-[1.3] tracking-[-0.03em] mb-2"
        >
          Assistant Professor of Operations Research
        </p>

        <p
          ref={institutionRef}
          className="font-sans text-xs uppercase tracking-[0.05em] text-muted-text mb-10 opacity-0"
        >
          Hebrew University of Jerusalem &middot; Business School
        </p>

        <div ref={tagsRef} className="flex flex-wrap gap-[10px] mb-10">
          {researchTags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-xs font-medium text-brown border border-border-light rounded-full px-4 py-[6px] opacity-0"
            >
              {tag}
            </span>
          ))}
        </div>

        <div ref={ctasRef} className="flex flex-wrap gap-4 opacity-0">
          <a
            href="#publications"
            onClick={(e) => handleCtaClick(e, '#publications')}
            className="font-sans text-sm font-medium text-surface bg-ink rounded-md px-7 py-3 hover:bg-charcoal transition-colors duration-300"
          >
            View Publications
          </a>
          <a
            href="#contact"
            onClick={(e) => handleCtaClick(e, '#contact')}
            className="font-sans text-sm font-medium text-ink bg-transparent border border-border-light rounded-md px-7 py-3 hover:border-ink transition-colors duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
