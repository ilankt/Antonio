import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Variant = 'charReveal' | 'wordFade'

interface AnimatedHeadingProps {
  children: string
  variant?: Variant
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  triggerOnLoad?: boolean
}

export default function AnimatedHeading({
  children,
  variant = 'wordFade',
  as: Tag = 'h2',
  className = '',
  delay = 0,
  triggerOnLoad = false,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Parse the text to handle italic markers: *word*
    const rawText = children
    const segments: { text: string; italic: boolean }[] = []
    const italicRegex = /\*(.*?)\*/g
    let lastIndex = 0
    let match

    while ((match = italicRegex.exec(rawText)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ text: rawText.slice(lastIndex, match.index), italic: false })
      }
      segments.push({ text: match[1], italic: true })
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < rawText.length) {
      segments.push({ text: rawText.slice(lastIndex), italic: false })
    }

    // Build spans
    el.innerHTML = ''
    const allSpans: HTMLSpanElement[] = []

    if (variant === 'charReveal') {
      segments.forEach((seg) => {
        const chars = seg.text.split('')
        chars.forEach((char) => {
          const span = document.createElement('span')
          span.textContent = char === ' ' ? '\u00A0' : char
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          if (seg.italic) {
            span.className = 'italic font-serif'
          }
          el.appendChild(span)
          allSpans.push(span)
        })
      })

      gsap.to(allSpans, {
        opacity: 1,
        yPercent: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.03,
        delay,
        ...(triggerOnLoad
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }),
      })

      // Set initial state
      gsap.set(allSpans, { yPercent: 30 })
    } else {
      segments.forEach((seg) => {
        const words = seg.text.split(' ')
        words.forEach((word, wi) => {
          if (wi > 0) {
            const space = document.createElement('span')
            space.innerHTML = '&nbsp;'
            space.style.display = 'inline'
            el.appendChild(space)
          }
          const span = document.createElement('span')
          span.textContent = word
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          if (seg.italic) {
            span.className = 'italic font-serif'
          }
          el.appendChild(span)
          allSpans.push(span)
        })
      })

      gsap.to(allSpans, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        delay,
        ...(triggerOnLoad
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }),
      })

      gsap.set(allSpans, { y: 20 })
    }

    return () => {
      // Cleanup ScrollTrigger instances created by this component
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [children, variant, delay, triggerOnLoad])

  return <Tag ref={containerRef as any} className={className} />
}
