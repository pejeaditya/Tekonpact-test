"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { AppLink } from "@/components/app-link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ServiceCluster, ServiceSubItem } from "@/lib/content"

export interface ProductsShowcaseSliderProps {
  clusters: ServiceCluster[]
  badge?: string
  heading?: string
  subtitle?: string
  /** Auto-play interval in ms (0 or negative to disable) */
  interval?: number
  className?: string
  ctaLabel?: string
  ctaHref?: string
}

function ServiceCard({ service }: { service: ServiceSubItem }) {
  return (
    <div className="group flex gap-3 rounded-xl border border-border bg-card/50 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-accent/20">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <service.icon className="size-4" />
      </span>
      <div>
        <h4 className="text-sm font-semibold text-foreground">{service.title}</h4>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{service.description}</p>
      </div>
    </div>
  )
}

export function ProductsShowcaseSlider({
  clusters,
  badge = "Our Offerings",
  heading = "One Core. Six Surfaces.",
  subtitle = "End-to-end capability across the full IT lifecycle. Click a surface to explore our specialized services.",
  interval = 6000,
  className,
  ctaLabel,
  ctaHref,
}: ProductsShowcaseSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const active = clusters[activeIndex]

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(index)
      setProgress(0)
    },
    []
  )

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % clusters.length)
    setProgress(0)
  }, [clusters.length])

  useEffect(() => {
    if (interval <= 0 || isPaused) return

    const stepMs = 50
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (stepMs / interval) * 100
        return next >= 100 ? 100 : next
      })
    }, stepMs)

    timerRef.current = setInterval(() => {
      goNext()
    }, interval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [interval, isPaused, goNext])

  return (
    <div
      className={cn("mx-auto max-w-7xl px-5 sm:px-8", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-medium text-primary">{badge}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{heading}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>

          <nav className="mt-8 space-y-1" aria-label="Service clusters">
            {clusters.map((cluster, index) => (
              <button
                key={cluster.id}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-300",
                  index === activeIndex
                    ? "border-l-2 border-primary bg-accent/40 text-foreground font-semibold"
                    : "border-l-2 border-transparent text-muted-foreground hover:bg-accent/20 hover:text-foreground"
                )}
              >
                <cluster.icon
                  className={cn(
                    "size-5 shrink-0 transition-colors duration-300",
                    index === activeIndex ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span className="text-sm">{cluster.title}</span>
                {interval > 0 && index === activeIndex && (
                  <div className="ml-auto h-1 w-12 overflow-hidden rounded-full bg-border">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.05, ease: "linear" }}
                    />
                  </div>
                )}
              </button>
            ))}
          </nav>

          {ctaLabel && ctaHref && (
            <div className="mt-8">
              <Button asChild variant="outline" className="rounded-full border-border px-6">
                <AppLink href={ctaHref}>{ctaLabel}</AppLink>
              </Button>
            </div>
          )}
        </div>

        <div className="relative min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-xl bg-primary/10 text-primary">
                  <active.icon className="size-7" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{active.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{active.summary}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {active.services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
