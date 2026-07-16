import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronDown } from "lucide-react"

import { CaseStudyCard } from "@/components/sections/case-study-card"
import { Button } from "@/components/ui/button"
import { getAllCaseStudies } from "@/lib/case-studies"
import { caseStudiesPageIntro } from "@/lib/content"

const INITIAL_VISIBLE = 9
const SHOW_MORE_STEP = 9

/** Display name for product category IDs */
const categoryDisplayNames: Record<string, string> = {
  "ai-ml": "AI & Automation",
  "enterprise-ops": "Enterprise Strategy",
  "iot-manufacturing": "IoT & Manufacturing",
  "cyber-infra": "Cyber & Infrastructure",
  "specialized-verticals": "Specialized Verticals",
}

export function CaseStudiesShowcase({
  defaultCategory,
  defaultStudy,
}: {
  defaultCategory?: string
  defaultStudy?: string
}) {
  const navigate = useNavigate()
  const caseStudies = getAllCaseStudies()
  const [activeCategory, setActiveCategory] = useState<string | undefined>(defaultCategory)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  useEffect(() => {
    setActiveCategory(defaultCategory)
  }, [defaultCategory])

  useEffect(() => {
    if (defaultStudy) {
      navigate(`/case-studies/${defaultStudy}`, { replace: true })
    }
  }, [defaultStudy, navigate])

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE)
  }, [activeCategory])

  const allCategories = useMemo(() => {
    const cats = new Set<string>()
    caseStudies.forEach((cs) => {
      if (cs.relatedCategory) cats.add(cs.relatedCategory)
    })
    return Array.from(cats)
  }, [])

  const filteredStudies = useMemo(() => {
    if (!activeCategory) return caseStudies
    return caseStudies.filter((cs) => cs.relatedCategory === activeCategory)
  }, [activeCategory])

  const visibleStudies = filteredStudies.slice(0, visibleCount)
  const hasMore = visibleCount < filteredStudies.length

  return (
    <div className="w-full bg-transparent">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklch,var(--primary)_34%,transparent),transparent_28rem),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background sm:h-40"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-14 text-center sm:px-10 sm:py-20 lg:px-12">
          <p className="text-sm text-primary">Real outcomes from enterprise delivery</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Case Studies
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-foreground/80 sm:text-lg sm:leading-8">
            {caseStudiesPageIntro.headline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {caseStudiesPageIntro.body}
          </p>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-6 pt-4 pb-16 sm:px-10 lg:px-12">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory(undefined)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !activeCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All ({caseStudies.length})
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {categoryDisplayNames[cat] ?? cat}
              </button>
            ))}
          </div>
          {activeCategory ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Showing case studies for{" "}
              <span className="font-semibold text-foreground">
                {categoryDisplayNames[activeCategory] ?? activeCategory}
              </span>
            </p>
          ) : null}
        </div>

        {filteredStudies.length === 0 ? (
          <div className="flex min-h-[30vh] flex-col items-center justify-center text-center">
            <p className="text-lg font-medium text-foreground">No case studies found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              No case studies match this category yet.
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-full"
              onClick={() => setActiveCategory(undefined)}
            >
              View all case studies
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-8 text-lg text-muted-foreground">
              Showing{" "}
              <span className="text-2xl font-bold text-primary">
                {visibleStudies.length}
                {hasMore ? ` of ${filteredStudies.length}` : ""}
              </span>{" "}
              case studies
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {visibleStudies.map((study) => (
                <Link
                  key={study.id}
                  to={`/case-studies/${study.id}`}
                  className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <CaseStudyCard study={study} />
                </Link>
              ))}
            </div>

            {hasMore ? (
              <div className="mt-10 text-center">
                <Button
                  onClick={() => setVisibleCount((prev) => prev + SHOW_MORE_STEP)}
                  className="group rounded-full px-8 py-6 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                >
                  Show More
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </Button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  )
}
