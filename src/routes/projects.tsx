import { createFileRoute } from '@tanstack/react-router'
import { useRef, useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

interface Project {
  number: string
  name: string
  tagline: string
  story: string
  tags: string[]
  url?: string
  year: number
}

const PROJECTS: Project[] = []

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function ProjectSection({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView()
  const isMobile = useIsMobile()
  const isEven = index % 2 === 0

  return (
    <section
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        minHeight: isMobile ? 'auto' : '100vh',
        borderBottom: '1px solid var(--border)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(50px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      {/* Number + Name side */}
      <div
        style={{
          padding: isMobile ? '2.5rem 1.25rem' : '4rem 3rem',
          borderRight: isMobile ? 'none' : '1px solid var(--border)',
          borderBottom: isMobile ? '1px solid var(--border)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          order: isMobile ? 0 : (isEven ? 0 : 1),
        }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--text)',
            opacity: 0.5,
            letterSpacing: '0.1em',
            marginBottom: '1.5rem',
          }}
        >
          {project.number} — {project.year}
        </span>

        <h2
          style={{
            fontSize: isMobile ? 'clamp(2rem, 8vw, 2.5rem)' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 500,
            color: 'var(--text-h)',
            letterSpacing: '-1.5px',
            lineHeight: 1,
            margin: '0 0 1rem',
          }}
        >
          {project.name}
        </h2>

        <p
          style={{
            color: 'var(--accent)',
            fontSize: '1rem',
            fontWeight: 500,
            margin: '0 0 2.5rem',
            lineHeight: 1.5,
          }}
        >
          {project.tagline}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 10px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontFamily: 'var(--mono)',
                background: 'var(--code-bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Story side */}
      <div
        style={{
          padding: isMobile ? '2.5rem 1.25rem' : '4rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          order: isMobile ? 1 : (isEven ? 1 : 0),
        }}
      >
        <p
          style={{
            color: 'var(--text)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            margin: '0 0 2rem',
          }}
        >
          {project.story}
        </p>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: 'var(--accent)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            View project →
          </a>
        )}
      </div>
    </section>
  )
}

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <main>
      <header className="page-header">
        <h1 style={{ margin: 0 }}>Projects</h1>
      </header>

      {PROJECTS.length === 0 ? (
        <div style={{
          padding: '5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '480px',
        }}>
          <p style={{ color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
            Check back soon —{' '}
            <a href="https://github.com/minju25kim" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              GitHub
            </a>
          </p>
        </div>
      ) : (
        PROJECTS.map((project, index) => (
          <ProjectSection key={project.number} project={project} index={index} />
        ))
      )}
    </main>
  )
}
