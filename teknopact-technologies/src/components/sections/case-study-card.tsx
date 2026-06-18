import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import type { CaseStudy } from "@/lib/case-studies"
import { cn } from "@/lib/utils"

const fallbackThumbnail =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=1600&q=80"

type CaseStudyCardProps = {
  study: CaseStudy
  className?: string
  href?: string
  onClick?: () => void
}

export function CaseStudyCard({ study, className, href, onClick }: CaseStudyCardProps) {
  const interactive = Boolean(onClick)
  const to = href ?? `/case-studies/${study.id}`

  const content = (
    <>
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
        <p className="text-sm font-medium text-white/75">Teknopact · {study.category}</p>
        <h3 className="mt-2 line-clamp-2 text-2xl font-bold leading-tight text-white sm:text-[1.65rem]">
          {study.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">{study.subtitle}</p>
      </div>
    </>
  )

  if (onClick) {
    return (
      <article
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onClick()
          }
        }}
        className={cn(
          "group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl ring-1 ring-foreground/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          className
        )}
      >
        {content}
      </article>
    )
  }

  return (
    <article
      className={cn(
        "group relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-foreground/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl",
        interactive && "cursor-pointer",
        className
      )}
    >
      <Link to={to} className="absolute inset-0" aria-label={study.title}>
        <span className="sr-only">{study.title}</span>
      </Link>
      {content}
    </article>
  )
}
