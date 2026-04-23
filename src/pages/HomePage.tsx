import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlowCanvas from '../components/FlowCanvas'
import SectionLabel from '../components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const areas = [
  'Service Operations',
  'AI for Service',
  'Behavioral Operations',
  'Contact Centers',
  'Healthcare',
]

const methodologies = [
  'Data Science',
  'Hawkes Processes',
  'Data-Driven Stochastic Modeling',
  'Machine Learning',
  'Queueing Theory',
  'Simulation',
  'Natural Language Processing',
]

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const welcomeRef = useRef<HTMLParagraphElement>(null)
  const affiliationRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    if (canvasWrapRef.current) {
      gsap.fromTo(
        canvasWrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: 'power2.out' }
      )
    }

    if (welcomeRef.current) {
      tl.fromTo(
        welcomeRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        0.1
      )
    }

    if (titleRef.current) {
      const text = titleRef.current.textContent || ''
      const chars = text.split('')
      titleRef.current.innerHTML = ''
      const spans: HTMLSpanElement[] = []
      chars.forEach((char) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? ' ' : char
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        titleRef.current!.appendChild(span)
        spans.push(span)
      })
      tl.fromTo(
        spans,
        { opacity: 0, yPercent: 50 },
        { opacity: 1, yPercent: 0, duration: 0.7, ease: 'power3.out', stagger: 0.025 },
        0.3
      )
    }

    if (affiliationRef.current) {
      tl.fromTo(
        affiliationRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 },
        '-=0.3'
      )
    }

    if (bioRef.current) {
      const paragraphs = bioRef.current.querySelectorAll('p')
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center overflow-hidden pt-[72px]"
      >
        <div
          ref={canvasWrapRef}
          className="absolute inset-0 z-0 opacity-0"
          style={{ height: '460px', top: '50%', transform: 'translateY(-50%)' }}
        >
          <FlowCanvas />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10 w-full">
          <p
            ref={welcomeRef}
            className="font-sans text-sm uppercase tracking-[0.2em] text-muted-text mb-8 opacity-0"
          >
            Welcome to my Website
          </p>

          <h1
            ref={titleRef}
            className="font-serif text-[44px] sm:text-[60px] lg:text-[80px] text-ink leading-[1.02] tracking-[-0.025em] mb-8"
          >
            Antonio Castellanos
          </h1>

          <div
            ref={affiliationRef}
            className="max-w-[620px] space-y-2 font-sans text-lg text-charcoal leading-[1.5]"
          >
            <p className="opacity-0">
              Assistant Professor of Operations Research &amp; Operations Management
            </p>
            <p className="opacity-0 text-muted-text text-base">
              Hebrew University of Jerusalem &middot; Business School
            </p>
            <p className="opacity-0 text-muted-text text-base">
              Visiting, Federmann Center for the Study of Rationality
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-text">
            Scroll
          </span>
          <span className="w-px h-8 bg-muted-text" />
        </div>
      </section>

      {/* BIO */}
      <section className="py-[120px] lg:py-[180px] bg-surface">
        <div className="max-w-narrow mx-auto px-6 lg:px-10">
          <SectionLabel text="About" />
          <div ref={bioRef} className="space-y-6 font-sans text-lg text-charcoal leading-[1.75] tracking-[-0.005em]">
            <p>
              I&rsquo;m Antonio and I am an Assistant Professor of Operations
              Research and Operations Management at the{' '}
              <span className="text-ink font-medium">
                Hebrew University of Jerusalem Business School
              </span>
              , where I am also visiting the{' '}
              <span className="text-ink font-medium">
                Federmann Center for the Study of Rationality
              </span>
              .
            </p>
            <p>
              Previously, I was a Postdoctoral Principal Researcher at the{' '}
              <span className="text-ink font-medium">
                University of Chicago Booth School of Business
              </span>
              , hosted by Professor Amy Ward. I received my PhD in Industrial
              Engineering from the Faculty of Data and Decision Sciences
              (formerly IE&amp;M) at the{' '}
              <span className="text-ink font-medium">
                Technion &ndash; Israel Institute of Technology
              </span>
              , advised by Professor Galit Yom-Tov, and worked closely with
              Professor Yair Goldberg. During my time at the Technion I
              conducted research at the <em>SEElab</em> a worldwide hub for
              research and teaching in Service Engineering.
            </p>
          </div>
        </div>
      </section>

      {/* ONE-LINER PULL QUOTE */}
      <section className="pb-[120px] lg:pb-[180px] bg-surface">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div ref={quoteRef} className="max-w-[900px] mx-auto text-center opacity-0">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-10 bg-teal" />
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-brown">
                In one sentence
              </span>
              <span className="h-px w-10 bg-teal" />
            </div>
            <blockquote className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] text-ink leading-[1.25] tracking-[-0.015em] italic">
              &ldquo;I develop behavior-aware stochastic and machine-learning
              models for service and healthcare operations, applied to
              chat-based contact centers and clinical operational decisions.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* RESEARCH INTERESTS */}
      <section className="py-[120px] lg:py-[160px] bg-ink text-surface">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/50">
              Research Interests
            </span>
            <div className="mt-3 h-[1px] w-10 bg-teal" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h3 className="font-serif text-[28px] lg:text-[34px] text-surface leading-[1.2] tracking-[-0.01em] mb-8">
                Areas
              </h3>
              <ul className="space-y-3 font-sans text-lg text-surface/85">
                {areas.map((item) => (
                  <li key={item} className="flex items-baseline gap-4">
                    <span className="text-teal font-sans text-xs tracking-widest">
                      &mdash;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-[28px] lg:text-[34px] text-surface leading-[1.2] tracking-[-0.01em] mb-8">
                Methodologies
              </h3>
              <ul className="space-y-3 font-sans text-lg text-surface/85">
                {methodologies.map((item) => (
                  <li key={item} className="flex items-baseline gap-4">
                    <span className="text-teal font-sans text-xs tracking-widest">
                      &mdash;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GRAD STUDENT CTA + SERVICE */}
      <section className="py-[120px] lg:py-[160px] bg-surface">
        <div className="max-w-content mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="border-t-2 border-ink pt-8">
            <SectionLabel text="Opportunities" />
            <h3 className="font-serif text-[26px] lg:text-[32px] text-ink leading-[1.2] tracking-[-0.01em] mb-5">
              Prospective students &amp; postdocs
            </h3>
            <p className="font-sans text-base text-charcoal leading-[1.7] mb-6">
              If you are a motivated graduate student or postdoc eager to
              explore research in my fields of interest, I&rsquo;d be glad to
              hear from you.
            </p>
            <a
              href="mailto:antonio.castellanos@mail.huji.ac.il"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-ink border-b border-ink/30 pb-1 hover:border-ink transition-colors duration-300"
            >
              antonio.castellanos@mail.huji.ac.il
              <span aria-hidden>&rarr;</span>
            </a>
          </div>

          <div className="border-t-2 border-ink pt-8">
            <SectionLabel text="Service" />
            <h3 className="font-serif text-[26px] lg:text-[32px] text-ink leading-[1.2] tracking-[-0.01em] mb-5">
              BAM Seminar
            </h3>
            <p className="font-sans text-base text-charcoal leading-[1.7] mb-6">
              I organize the BAM (Business Analytics and Marketing) seminar at
              the Hebrew University of Jerusalem Business School. The seminar
              brings together faculty across data science, operations research
              and operations management, and marketing.
            </p>
            <p className="font-sans text-sm text-muted-text italic">
              Interested in presenting your work? Please reach out.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
