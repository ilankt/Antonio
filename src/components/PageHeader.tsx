import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PageHeaderProps {
  label: string
  title: string
  description?: string
}

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const labelEl = ref.current.querySelector('[data-anim="label"]')
    const titleEl = ref.current.querySelector('[data-anim="title"]')
    const descEl = ref.current.querySelector('[data-anim="desc"]')
    const lineEl = ref.current.querySelector('[data-anim="line"]')

    const tl = gsap.timeline({ delay: 0.2 })
    if (labelEl) tl.fromTo(labelEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    if (lineEl) tl.fromTo(lineEl, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, '-=0.3')
    if (titleEl) {
      const text = titleEl.textContent || ''
      titleEl.innerHTML = ''
      const spans: HTMLSpanElement[] = []
      text.split('').forEach((ch) => {
        const span = document.createElement('span')
        span.textContent = ch === ' ' ? ' ' : ch
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        titleEl.appendChild(span)
        spans.push(span)
      })
      tl.fromTo(
        spans,
        { opacity: 0, yPercent: 50 },
        { opacity: 1, yPercent: 0, duration: 0.7, ease: 'power3.out', stagger: 0.03 },
        '-=0.4'
      )
    }
    if (descEl) {
      tl.fromTo(
        descEl,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.2'
      )
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={ref}
      className="pt-[160px] lg:pt-[200px] pb-[60px] lg:pb-[100px] bg-surface"
    >
      <div className="max-w-[920px] mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-10 opacity-0" data-anim="label">
          <span
            data-anim="line"
            className="h-px w-12 bg-ink origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-muted-text">
            {label}
          </span>
        </div>
        <h1
          data-anim="title"
          className="font-serif text-[56px] sm:text-[72px] lg:text-[96px] text-ink leading-[0.95] tracking-[-0.03em] mb-8"
        >
          {title}
        </h1>
        {description && (
          <p
            data-anim="desc"
            className="font-sans text-lg lg:text-xl text-charcoal leading-[1.55] max-w-[640px] opacity-0"
          >
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
