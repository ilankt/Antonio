import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHeader from '../components/PageHeader'

gsap.registerPlugin(ScrollTrigger)

type Course = {
  term: string
  course: string
  code: string
  institution: string
  level: string
  lecturer?: string
  role?: string
}

const lecturerCourses: Course[] = [
  {
    term: 'Spring / Fall 2025',
    course: 'Operations Management',
    code: '55506',
    institution: 'Hebrew University Business School',
    level: 'Undergraduate Core',
  },
  {
    term: 'Fall 2024 / 2025',
    course: 'Applied Statistics',
    code: '55810',
    institution: 'Hebrew University Business School',
    level: 'MBA Core',
  },
]

const taCourses: Course[] = [
  {
    term: 'Spring 2024',
    course: 'Managing Service Operations',
    code: '40110',
    institution: 'University of Chicago Booth School of Business',
    level: 'MBA (Full-time & Evening)',
    lecturer: 'Prof. Amy R. Ward',
    role: 'Revisions Leader & Co-grader',
  },
  {
    term: '2020 – 2021',
    course: 'Multi-Disciplinary Research in Service Engineering',
    code: '097135',
    institution: 'Technion',
    level: 'Undergraduate & Graduate',
    lecturer: 'Prof. Galit B. Yom-Tov',
    role: 'Recitations Leader & Grader',
  },
  {
    term: '2019 – 2022',
    course: 'Service Engineering',
    code: '096342',
    institution: 'Technion',
    level: 'Undergraduate & Graduate',
    lecturer: 'Prof. Galit B. Yom-Tov',
    role: 'Recitations Leader & Grader',
  },
]

function CourseEntry({ course, index }: { course: Course; index: number }) {
  return (
    <article className="course-item opacity-0 grid grid-cols-[auto_1fr] gap-6 lg:gap-10 pb-12 mb-12 border-b border-border-light last:border-b-0">
      <div className="pt-1">
        <span className="font-serif text-lg text-muted-text tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div>
        <div className="flex items-baseline gap-3 mb-3 flex-wrap">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-brown">
            {course.term}
          </span>
          <span className="font-sans text-xs text-muted-text">
            &middot; Course {course.code}
          </span>
        </div>
        <h3 className="font-serif text-[24px] lg:text-[30px] text-ink leading-[1.2] tracking-[-0.01em] mb-4">
          {course.course}
        </h3>
        <div className="space-y-1.5">
          <p className="font-sans text-base text-charcoal">
            {course.institution}
          </p>
          <p className="font-sans text-sm text-muted-text">
            {course.level}
          </p>
          {course.lecturer && (
            <p className="font-sans text-sm text-charcoal/80 pt-2">
              <span className="text-muted-text">Lecturer:</span> {course.lecturer}
            </p>
          )}
          {course.role && (
            <p className="font-sans text-sm text-charcoal/80">
              <span className="text-muted-text">Role:</span> {course.role}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

function Category({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const items = ref.current.querySelectorAll('.course-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <div ref={ref} className="mb-24 lg:mb-32">
      <div className="mb-12">
        <div className="flex items-baseline gap-5 mb-3">
          <h2 className="font-serif text-[32px] lg:text-[44px] text-ink leading-[1.1] tracking-[-0.02em]">
            {title}
          </h2>
          <div className="flex-1 h-px bg-border-light" />
        </div>
        {subtitle && (
          <p className="font-sans text-base text-muted-text">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  )
}

export default function TeachingPage() {
  return (
    <>
      <PageHeader
        label="Courses"
        title="Teaching"
        description="Courses I have taught as a lecturer at the Hebrew University, and as a teaching assistant at the University of Chicago Booth and the Technion."
      />

      <section className="py-[60px] lg:py-[100px] bg-surface">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10">
          <Category
            title="Lecturer"
            subtitle="Hebrew University of Jerusalem · Business School"
          >
            {lecturerCourses.map((c, i) => (
              <CourseEntry key={i} course={c} index={i} />
            ))}
          </Category>

          <Category title="Teaching Assistant">
            {taCourses.map((c, i) => (
              <CourseEntry key={i} course={c} index={i} />
            ))}
          </Category>
        </div>
      </section>
    </>
  )
}
