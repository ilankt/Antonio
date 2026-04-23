import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHeader from '../components/PageHeader'

gsap.registerPlugin(ScrollTrigger)

type Paper = {
  authors: string
  year: string
  title: string
  venue: string
  venueItalic?: boolean
  status?: string
  links?: { label: string; href: string }[]
  notes?: string[]
}

const peerReviewed: Paper[] = [
  {
    authors: 'Daw A., Castellanos, A., Yom-Tov, G.B., Pender, J., Gruendlinger, L.',
    year: '2025',
    title:
      'The Co-Production of Service: Modeling Service in Contact Centers Using Hawkes Processes',
    venue: 'Management Science',
    venueItalic: true,
    links: [{ label: 'arXiv version', href: '#' }],
    notes: [
      '2025: 2nd Place, MSOM Service Management SIG Best Paper Award',
      '2022: POMS Applied Research Challenge Finalist',
      '2021: Selected for MSOM Service Management SIG',
    ],
  },
]

const conferencePubs: Paper[] = [
  {
    authors: 'Castellanos, A., Daw, A., Ward, A.R., Yom-Tov, G.B.',
    year: '2024',
    title:
      'Closing the Service: Contrasting Activity-Based and Time-Based Systematic Closure Policies',
    venue: 'Proceedings of the 2024 Winter Simulation Conference',
    venueItalic: true,
  },
  {
    authors: 'Li, B., Castellanos, A., Shi, P., Ward, A.R.',
    year: '2024',
    title:
      'Combining Machine Learning and Queueing Theory for Data-driven Incarceration-Diversion Program Management',
    venue: 'Proceedings of the 38th AAAI Conference',
    venueItalic: true,
  },
]

const workingPapers: Paper[] = [
  {
    authors: 'Castellanos, A., Daw, A., Yom-Tov, G.B.',
    year: '2026',
    title:
      'What You Say Versus When You Say It: Efficiently Predicting Service Completions with LLMs and Stochastic Processes',
    venue: 'Submitted',
  },
  {
    authors: 'Castellanos, A., Yom-Tov, G.B., Goldberg, Y.',
    year: '2023',
    title:
      'Silent Abandonment in Contact Centers: Estimating Customer Patience from Uncertain Data',
    venue: 'Split into the two papers below',
    notes: [
      '2020: INFORMS Behavioral Operations Best Working Paper Competition, Honorable Mention',
      '2020: Operations Research Society of Israel (ORSIS) Abraham Mehrez Prize for Graduate Excellent Work',
      '2019: Israel Statistics and Data Science Association (ISDSA) Outstanding Research Poster, Second Place',
    ],
  },
  {
    authors: 'Castellanos, A., Yom-Tov, G.B., Goldberg, Y., Park, J.',
    year: '2025',
    title:
      'Silent Abandonment in Text-Based Contact Centers: Identifying, Quantifying, and Mitigating its Operational Impacts',
    venue: 'Submitted',
  },
  {
    authors: 'Castellanos, A., Yom-Tov, G.B.',
    year: '',
    title: 'Silent Abandonment Policies',
    venue: 'Working paper',
  },
  {
    authors: 'Castellanos, A., Landa, L.T., Goldberg, Y., Yom-Tov, G.B.',
    year: '2025',
    title: 'Real-Time Estimation of Customer Satisfaction in Contact Centers',
    venue: 'Submitted',
  },
]

const dissertationHonors = [
  '2023: INFORMS George B. Dantzig Dissertation Award, Honorable Mention',
  '2021 & 2020: Israeli Higher Education Council — Prize for Outstanding Research in Data Science',
  '2019: Technion IE&M Nahmani Prize for Outstanding Research in Quality Management',
]

function PaperEntry({ paper, index }: { paper: Paper; index: number }) {
  return (
    <article className="grid grid-cols-[auto_1fr] gap-6 lg:gap-10 opacity-0 pub-item">
      <div className="pt-1">
        <span className="font-serif text-lg text-muted-text tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="border-l border-border-light pl-6 lg:pl-10 pb-10">
        <p className="font-sans text-sm text-muted-text mb-2">
          {paper.authors}
          {paper.year && <span className="text-charcoal/60"> &middot; {paper.year}</span>}
        </p>
        <h3 className="font-serif text-[22px] lg:text-[26px] text-ink leading-[1.3] tracking-[-0.01em] mb-3">
          {paper.title}
        </h3>
        <p className="font-sans text-base text-charcoal mb-1">
          {paper.venueItalic ? <em>{paper.venue}</em> : paper.venue}
          {paper.status && <span className="text-muted-text"> &middot; {paper.status}</span>}
        </p>
        {paper.links && paper.links.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-3">
            {paper.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-sm text-brown hover:text-ink border-b border-brown/30 hover:border-ink pb-[1px] transition-colors duration-300"
              >
                {link.label} &rarr;
              </a>
            ))}
          </div>
        )}
        {paper.notes && paper.notes.length > 0 && (
          <ul className="mt-5 space-y-1.5">
            {paper.notes.map((note, i) => (
              <li
                key={i}
                className="font-sans text-sm text-charcoal/80 flex items-baseline gap-3"
              >
                <span className="text-teal text-xs">&#9671;</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

function Category({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const items = ref.current.querySelectorAll('.pub-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <div ref={ref} className="mb-20 lg:mb-28">
      <div className="flex items-baseline gap-5 mb-12">
        <h2 className="font-serif text-[26px] lg:text-[32px] text-ink leading-[1.2] tracking-[-0.015em]">
          {title}
        </h2>
        <div className="flex-1 h-px bg-border-light" />
      </div>
      {children}
    </div>
  )
}

export default function ResearchPage() {
  const honorsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!honorsRef.current) return
    const items = honorsRef.current.querySelectorAll('li')
    gsap.fromTo(
      items,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: honorsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <>
      <PageHeader
        label="Publications"
        title="Research"
        description="A selection of peer-reviewed work, conference proceedings, and ongoing projects in service operations, behavioral operations, and data-driven decision making."
      />

      <section className="py-[80px] lg:py-[120px] bg-surface">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10">
          <Category title="Peer-Reviewed Articles">
            {peerReviewed.map((p, i) => (
              <PaperEntry key={i} paper={p} index={i} />
            ))}
          </Category>

          <Category title="Conference Peer-Reviewed Publications">
            {conferencePubs.map((p, i) => (
              <PaperEntry key={i} paper={p} index={i} />
            ))}
          </Category>

          <Category title="Selected Working Papers">
            {workingPapers.map((p, i) => (
              <PaperEntry key={i} paper={p} index={i} />
            ))}
          </Category>

          <div ref={honorsRef} className="mb-10">
            <div className="flex items-baseline gap-5 mb-10">
              <h2 className="font-serif text-[26px] lg:text-[32px] text-ink leading-[1.2] tracking-[-0.015em]">
                Dissertation Honors
              </h2>
              <div className="flex-1 h-px bg-border-light" />
            </div>
            <ul className="space-y-4 mb-10">
              {dissertationHonors.map((h, i) => (
                <li
                  key={i}
                  className="font-sans text-base text-charcoal flex items-baseline gap-4"
                >
                  <span className="text-teal font-sans text-xs tracking-widest">
                    &mdash;
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-ink border-b border-ink/30 pb-1 hover:border-ink transition-colors duration-300"
            >
              Link to Dissertation <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
