import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../components/SectionLabel'
import AnimatedHeading from '../components/AnimatedHeading'

gsap.registerPlugin(ScrollTrigger)

const publications = [
  {
    title: 'The Co-Production of Service: Modeling Services in Contact Centers Using Hawkes Processes',
    venue: 'Management Science',
    authors: 'Andrew Daw, Antonio Castellanos, Galit Yom-Tov, Jamol Pender, Leor Gruendlinger',
    year: '2025',
    awards: 'Finalist, 5th POMS Applied Research Challenge',
    link: '#',
  },
  {
    title: 'Combining Machine Learning and Queueing Theory for Data-Driven Incarceration-Diversion Program Management',
    venue: 'Proceedings of the 38th AAAI Conference on Artificial Intelligence',
    authors: 'Bingxuan Li, Antonio Castellanos, Pengyi Shi, Amy R. Ward',
    year: '2024',
    link: '#',
  },
  {
    title: 'Closing the Service: Contrasting Activity-Based and Time-Based Systematic Closure Policies',
    venue: '2024 Winter Simulation Conference, IEEE',
    authors: 'Antonio Castellanos, Andrew Daw, Amy R. Ward, Galit B. Yom-Tov',
    year: '2024',
    link: '#',
  },
]

export default function PublicationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (itemsRef.current) {
      const items = itemsRef.current.children
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    if (linkRef.current) {
      gsap.fromTo(
        linkRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: linkRef.current,
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
      id="publications"
      ref={sectionRef}
      className="py-[100px] lg:py-[160px] bg-surface"
    >
      <div className="max-w-narrow mx-auto px-6 lg:px-8">
        <SectionLabel text="Selected Publications" />
        <AnimatedHeading
          variant="charReveal"
          className="font-serif text-[28px] sm:text-[32px] lg:text-[36px] text-ink leading-[1.2] tracking-[-0.02em] mb-14"
        >
          Published Work
        </AnimatedHeading>

        <div ref={itemsRef} className="flex flex-col gap-0">
          {publications.map((pub, i) => (
            <div
              key={i}
              className={`pb-7 ${
                i < publications.length - 1 ? 'border-b border-border-light mb-8' : ''
              } opacity-0`}
            >
              <h3 className="font-sans text-base font-medium text-ink leading-[1.5] mb-2 hover:text-brown transition-colors duration-300 cursor-pointer">
                {pub.title}
              </h3>
              <p className="font-sans text-sm italic text-charcoal mb-1">
                {pub.venue}
              </p>
              <p className="font-sans text-xs text-muted-text mb-1">
                {pub.authors}
              </p>
              <p className="font-sans text-xs text-muted-text">
                {pub.year}
              </p>
              {pub.awards && (
                <p className="font-sans text-xs text-brown mt-1">
                  {pub.awards}
                </p>
              )}
            </div>
          ))}
        </div>

        <a
          ref={linkRef}
          href="https://scholar.google.pt/citations?user=IUHFbhkAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-sans text-sm font-medium text-ink mt-8 hover:text-brown transition-colors duration-300 opacity-0"
        >
          View all publications on Google Scholar &rarr;
        </a>
      </div>
    </section>
  )
}
