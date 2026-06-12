import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { caseStudies, caseStudiesPageIntro } from "@/lib/content"
import type { CaseStudy } from "@/lib/content"

const fallbackThumbnail =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=1600&q=80"

export function CaseStudiesShowcase() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)

  useEffect(() => {
    document.body.style.overflow = selectedStudy ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedStudy])

  return (
    <div className="w-full bg-background">
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

      <section className="relative mx-auto w-full max-w-7xl px-6 pt-4 pb-8 sm:px-10 lg:px-12">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background sm:h-32"
          aria-hidden
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedStudy(study)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setSelectedStudy(study)
                }
              }}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl ring-1 ring-foreground/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={study.thumbnail}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = fallbackThumbnail
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
              <Badge className="absolute top-4 left-4 rounded-full border-0 bg-black px-3 py-1 text-xs font-medium text-white">
                Case Study
              </Badge>
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <p className="text-sm font-medium text-white/75">
                  Teknopact · {study.category}
                </p>
                <h3 className="mt-2 line-clamp-3 text-2xl font-bold leading-tight text-white sm:text-[1.65rem]">
                  {study.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedStudy ? (
          <CaseStudyDetail study={selectedStudy} onClose={() => setSelectedStudy(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function CaseStudyDetail({
  study,
  onClose,
}: {
  study: CaseStudy
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-detail-title"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/90 px-6 py-4 backdrop-blur-xl sm:px-10">
        <Button variant="ghost" onClick={onClose} className="gap-2 rounded-full">
          <ArrowLeft className="h-4 w-4" />
          Back to case studies
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close" className="rounded-full">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative min-h-[50vh] overflow-hidden">
        <img
          src={study.thumbnail}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = fallbackThumbnail
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="relative mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col justify-end px-6 py-14 sm:px-10 lg:px-12">
          <Badge className="mb-4 w-fit rounded-full border-0 bg-black px-3 py-1 text-xs font-medium text-white">
            Case Study
          </Badge>
          <p className="text-sm font-medium text-white/80">Teknopact · {study.category}</p>
          <h2 id="case-study-detail-title" className="mt-3 max-w-4xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {study.title}
          </h2>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              Overview
            </h3>
            <p className="text-lg leading-8 text-foreground/90">{study.description}</p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              Key outcomes
            </h3>
            <ul className="space-y-3">
              {study.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-foreground"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
