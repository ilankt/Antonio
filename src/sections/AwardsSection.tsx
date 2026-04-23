import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../components/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const awards = [
  {
    name: 'VATAT Prize for Outstanding Research in Data Science',
    year: '2020, 2021',
    org: 'Israeli Council for Higher Education',
  },
  {
    name: 'George B. Dantzig Dissertation Award',
    detail: 'Honorable Mention',
    year: '2023',
    org: 'INFORMS',
  },
  {
    name: 'The Abraham Mehrez Prize',
    detail: 'Excellent Work in Operations Management',
    year: '2020',
    org: 'Operations Research Society of Israel (ORSIS)',
  },
  {
    name: 'POMS Applied Research Challenge',
    detail: 'Finalist',
    year: '2022',
    org: 'Production and Operations Management Society',
  },
]

export default function AwardsSection() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
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
    <section className="py-20 bg-ink">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionLabel text="Awards &amp; Honors" light />

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {awards.map((award, i) => (
            <div
              key={i}
              className="pt-5 border-t border-white/15 opacity-0"
            >
              <h4 className="font-sans text-sm font-medium text-surface leading-[1.5] mb-2">
                {award.name}
              </h4>
              {award.detail && (
                <p className="font-sans text-xs text-white/40 mb-1">
                  {award.detail}
                </p>
              )}
              <p className="font-sans text-xs text-white/50 mb-1">
                {award.year}
              </p>
              <p className="font-sans text-xs text-white/40">
                {award.org}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
