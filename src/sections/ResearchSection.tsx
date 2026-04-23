import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../components/SectionLabel'
import AnimatedHeading from '../components/AnimatedHeading'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    num: '01',
    title: 'Service Operations',
    desc: 'Contact centers, healthcare delivery, and service chats — analyzing how customers and agents interact, and how to design systems that serve people better.',
  },
  {
    num: '02',
    title: 'AI for Service Design',
    desc: 'Integrating machine learning with queueing theory to create intelligent systems that adapt to real-time demand, from incarceration-diversion programs to dynamic service allocation.',
  },
  {
    num: '03',
    title: 'Behavioral Dynamics',
    desc: 'Understanding the human factors that drive uncertainty in service systems — silent abandonment, in-conversation pauses, and customer patience — using stochastic modeling and data science.',
  },
]

export default function ResearchSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Image parallax
    if (imgRef.current) {
      gsap.to(imgRef.current.querySelector('img'), {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

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

    // Cards stagger
    if (cardsRef.current) {
      const cards = cardsRef.current.children
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
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
      id="research"
      ref={sectionRef}
      className="py-[100px] lg:py-[160px] bg-surface"
    >
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Top: 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-[60px]">
          {/* Left: Text */}
          <div>
            <SectionLabel text="Research" />
            <AnimatedHeading
              variant="wordFade"
              className="font-serif text-[28px] sm:text-[32px] lg:text-[36px] text-ink leading-[1.2] tracking-[-0.02em] mb-6"
            >
              Data Science *for* Service Systems
            </AnimatedHeading>
            <p
              ref={descRef}
              className="font-sans text-base text-charcoal leading-[1.7] tracking-[-0.01em]"
            >
              I analyze operational data of service systems to understand customer and agent behavior, developing stochastic models to optimize service delivery. My work addresses challenges where human behavior drives uncertainty — customers silently abandoning chat services, prolonged pauses disrupting queue management — using data-driven approaches that blend rigorous methodology with real-world impact.
            </p>
          </div>

          {/* Right: Image with parallax */}
          <div ref={imgRef} className="overflow-hidden rounded-lg aspect-[4/3]">
            <img
              src="./assets/img-research.jpg"
              alt="Academic workspace with data visualizations"
              className="w-full h-[120%] object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom: Research pillars */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 lg:mt-20"
        >
          {pillars.map((p) => (
            <div key={p.num} className="pt-8 border-t-2 border-teal opacity-0">
              <span className="font-sans text-xs text-muted-text block mb-4">
                {p.num}
              </span>
              <h3 className="font-sans text-lg font-medium text-ink mb-3">
                {p.title}
              </h3>
              <p className="font-sans text-sm text-charcoal leading-[1.6]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
