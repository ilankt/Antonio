import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../components/SectionLabel'
import AnimatedHeading from '../components/AnimatedHeading'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '2023 \u2013 Present',
    role: 'Assistant Professor',
    institution: 'Hebrew University of Jerusalem \u00B7 Business School',
  },
  {
    year: '2021 \u2013 2023',
    role: 'Postdoctoral Principal Researcher',
    institution: 'University of Chicago Booth School of Business',
  },
  {
    year: '2017 \u2013 2021',
    role: 'Ph.D. in Data and Decision Sciences',
    institution: 'Technion \u2013 Israel Institute of Technology',
  },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Image parallax
    if (imgRef.current) {
      gsap.to(imgRef.current.querySelector('img'), {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // Bio word fade
    if (bioRef.current) {
      const text = bioRef.current.textContent || ''
      const words = text.split(' ')
      bioRef.current.innerHTML = ''
      const spans: HTMLSpanElement[] = []
      words.forEach((word, i) => {
        if (i > 0) {
          const space = document.createElement('span')
          space.innerHTML = '&nbsp;'
          space.style.display = 'inline'
          bioRef.current!.appendChild(space)
        }
        const span = document.createElement('span')
        span.textContent = word
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        bioRef.current!.appendChild(span)
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
          trigger: bioRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      gsap.set(spans, { y: 20 })
    }

    // Timeline stagger
    if (timelineRef.current) {
      const items = timelineRef.current.children
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: timelineRef.current,
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
      id="about"
      ref={sectionRef}
      className="py-[100px] lg:py-[160px] bg-surface"
    >
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-[60px]">
          {/* Left: Portrait */}
          <div ref={imgRef} className="overflow-hidden rounded-lg aspect-[3/4] lg:aspect-[3/4]">
            <img
              src="./assets/img-portrait.jpg"
              alt="Antonio Castellanos professional portrait"
              className="w-full h-[110%] object-cover"
              loading="lazy"
            />
          </div>

          {/* Right: Bio + Timeline */}
          <div>
            <SectionLabel text="About" />
            <AnimatedHeading
              variant="wordFade"
              className="font-serif text-[28px] sm:text-[32px] lg:text-[36px] text-ink leading-[1.2] tracking-[-0.02em] mb-6"
            >
              From Engineering to *Academia*
            </AnimatedHeading>

            <p
              ref={bioRef}
              className="font-sans text-base text-charcoal leading-[1.7] tracking-[-0.01em] mb-8"
            >
              I hold a B.Sc. in Information Systems and Business and a Ph.D. from the Faculty of Data and Decision Sciences at the Technion \u2013 Israel Institute of Technology, where I conducted research at SEElab, a worldwide hub for service engineering. I then served as a Postdoctoral Principal Researcher at the University of Chicago Booth School of Business, hosted by Professor Amy Ward. Today, I am an Assistant Professor at the Hebrew University of Jerusalem Business School, where I teach Applied Statistics and Operations Management.
            </p>

            {/* Timeline */}
            <div ref={timelineRef} className="flex flex-col">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`pl-6 border-l-2 border-border-light ${
                    i < timeline.length - 1 ? 'pb-7' : ''
                  } opacity-0`}
                >
                  <span className="font-sans text-xs text-muted-text block mb-1">
                    {item.year}
                  </span>
                  <h4 className="font-sans text-base font-medium text-ink mb-1">
                    {item.role}
                  </h4>
                  <p className="font-sans text-sm text-charcoal">
                    {item.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
