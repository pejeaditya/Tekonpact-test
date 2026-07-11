"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

import { AppLink } from "@/components/app-link"
import { cn } from "@/lib/utils"

export interface Industry {
  title: string
  description: string
  icon: LucideIcon
  href?: string
}

export interface IndustriesShowcaseProps {
  industries: Industry[]
  badge?: string
  heading?: string
  subtitle?: string
  /** If true, links to /case-studies?category=title */
  linkToCaseStudies?: boolean
  className?: string
}

export function IndustriesShowcase({
  industries,
  badge = "Industries",
  heading = "Sectors we serve",
  subtitle = "Deep domain expertise across government, enterprise, and specialized verticals—delivering measurable impact in every sector.",
  linkToCaseStudies = true,
  className,
}: IndustriesShowcaseProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-5 sm:px-8", className)}>
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {badge}
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">{heading}</h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">{subtitle}</p>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((industry, index) => {
          const href =
            industry.href ??
            (linkToCaseStudies
              ? `/case-studies?category=${encodeURIComponent(industry.title.toLowerCase())}`
              : undefined)

          const CardWrapper = href ? AppLink : "div"

          return (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <CardWrapper
                href={href as string}
                className={cn(
                  "group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all duration-300",
                  href && "cursor-pointer hover:border-primary/30 hover:bg-accent/30 hover:shadow-lg hover:shadow-primary/10"
                )}
              >
                <span className="grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <industry.icon className="size-6" />
                </span>
                <h3 className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {industry.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{industry.description}</p>
              </CardWrapper>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
