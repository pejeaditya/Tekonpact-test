import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { CaseStudy } from "@/lib/case-studies"
import { cn } from "@/lib/utils"

const fallbackThumbnail =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=1600&q=80"

function parseHighlightStat(text: string): { value: string; label: string } {
  const arrowSplit = text.split(/\s*→\s*/)
  if (arrowSplit.length === 2) {
    return { value: arrowSplit.join(" → "), label: "Improvement" }
  }

  const leading = text.match(/^([£$€]?\d[\d,.%+]*(?:\s*(?:million|billion|M|K|\+)?)?)\s+(.+)$/i)
  if (leading) {
    return { value: leading[1], label: leading[2] }
  }

  const words = text.split(/\s+/)
  if (words.length > 1 && /^[\d£$€%+\-]/.test(words[0])) {
    return { value: words[0], label: words.slice(1).join(" ") }
  }

  return { value: "—", label: text }
}

type CaseStudyArticleProps = {
  study: CaseStudy
  backHref?: string
  backLabel?: string
}

export function CaseStudyArticle({
  study,
  backHref = "/case-studies",
  backLabel = "Back to case studies",
}: CaseStudyArticleProps) {
  const [activeSection, setActiveSection] = useState(study.sections[0]?.id ?? "challenge")
  const heroStats = study.highlights.slice(0, 2).map(parseHighlightStat)

  useEffect(() => {
    const sectionElements = study.sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null)

    if (sectionElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sectionElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [study.sections])

  return (
    <article className="w-full bg-background">
      <div className="border-b border-border/60 bg-background/95">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-4 sm:px-10 lg:px-12">
          <Link
            to={backHref}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </div>
      </div>

      <header className="mx-auto w-full max-w-7xl px-6 pt-10 pb-8 sm:px-10 sm:pt-14 lg:px-12">
        <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">Case study</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
          {study.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
          {study.subtitle}
        </p>
      </header>

      <div className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="overflow-hidden rounded-2xl ring-1 ring-foreground/10">
            <img
              src={study.thumbnail}
              alt=""
              className="aspect-[16/10] h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null
                event.currentTarget.src = fallbackThumbnail
              }}
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-base leading-8 text-foreground/90 sm:text-lg sm:leading-9">
              {study.subtitle}
            </p>

            <div className="mt-8 space-y-0 border-t border-border">
              {heroStats.map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="border-b border-border py-6 last:pb-0"
                >
                  <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-20 sm:px-10 sm:pb-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-10">
              <nav aria-label="In this article">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  In this article
                </p>
                <ol className="mt-4 space-y-3">
                  {study.sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={cn(
                          "group flex items-baseline gap-3 text-sm transition-colors",
                          activeSection === section.id
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="space-y-6 border-t border-border pt-8">
                <MetaRow label="Company" value={study.company ?? "Confidential enterprise client"} />
                <MetaRow label="Industry" value={study.category} />
                <MetaRow label="Company size" value="10,000+" />
                <MetaRow label="Location" value={study.location} />
                <MetaRow label="Technology" value={study.tech} />
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-16 sm:space-y-20">
            {study.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-6 space-y-6">
                  {section.content.split(/\n\n+/).map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-8 text-foreground/90 sm:text-lg sm:leading-9"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {study.highlights.length > 2 ? (
              <section className="border-t border-border pt-12">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Key outcomes
                </h2>
                <ul className="mt-6 space-y-4">
                  {study.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 px-5 py-4 text-base leading-7 text-foreground"
                    >
                      <Badge className="mt-0.5 shrink-0 rounded-full border-0 bg-primary/15 text-primary">
                        ✓
                      </Badge>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-foreground">{value}</p>
    </div>
  )
}
