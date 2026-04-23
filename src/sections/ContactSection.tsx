import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedHeading from '../components/AnimatedHeading'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { label: 'Google Scholar', href: 'https://scholar.google.pt/citations?user=IUHFbhkAAAAJ' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/antonio-castellanos/' },
  { label: 'HUJI Profile', href: 'https://bschool-en.huji.ac.il/people/antonio-castellanos' },
]

export default function ContactSection() {
  const descRef = useRef<HTMLParagraphElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const instRef = useRef<HTMLParagraphElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Description word fade
    if (descRef.current) {
      const text = descRef.current.textContent || ''
      const words = text.split(' ')
      descRef.current.innerHTML = ''
      const spans: HTMLSpanElement[] = []
      words.forEach((word, i) => {
        if (i > 0) {
          const space = document.createElement('span')
          space.innerHTML = '&nbsp;'
          space.style.display = 'inline'
          descRef.current!.appendChild(space)
        }
        const span = document.createElement('span')
        span.textContent = word
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        descRef.current!.appendChild(span)
        spans.push(span)
      })
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.04,
        delay: 0.2,
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      gsap.set(spans, { y: 20 })
    }

    // Email fade
    if (emailRef.current) {
      gsap.fromTo(
        emailRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.4,
          scrollTrigger: {
            trigger: emailRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Institution fade
    if (instRef.current) {
      gsap.fromTo(
        instRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.5,
          scrollTrigger: {
            trigger: instRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Social links stagger
    if (socialsRef.current) {
      const links = socialsRef.current.children
      gsap.fromTo(
        links,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.6,
          scrollTrigger: {
            trigger: socialsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      id="contact"
      className="py-[100px] lg:py-[160px] bg-surface"
    >
      <div className="max-w-narrow mx-auto px-6 lg:px-8 text-center">
        <AnimatedHeading
          variant="charReveal"
          className="font-serif text-[36px] sm:text-[42px] lg:text-[48px] text-ink leading-[1.1] tracking-[-0.02em] mb-6"
        >
          Let's *collaborate*
        </AnimatedHeading>

        <p
          ref={descRef}
          className="font-sans text-base text-charcoal leading-[1.7] tracking-[-0.01em] mb-10"
        >
          I welcome collaborations exploring service systems operations, behavioral operations, and AI-driven service innovation.
        </p>

        <a
          ref={emailRef}
          href="mailto:antonio.castellanos@mail.huji.ac.il"
          className="inline-block font-sans text-lg text-ink hover:text-brown transition-colors duration-300 mb-2 opacity-0"
        >
          antonio.castellanos@mail.huji.ac.il
        </a>

        <p
          ref={instRef}
          className="font-sans text-xs uppercase tracking-[0.05em] text-muted-text opacity-0"
        >
          Hebrew University of Jerusalem &middot; Business School
        </p>

        <div ref={socialsRef} className="flex items-center justify-center gap-6 mt-8">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs font-medium text-charcoal border-b border-border-light pb-[2px] hover:border-ink hover:text-ink transition-all duration-300 opacity-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
