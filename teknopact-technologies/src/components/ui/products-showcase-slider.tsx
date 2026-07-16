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
    <div className="group flex gap-3.5 rounded-2xl border border-border/40 bg-card/30 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/65 hover:shadow-[0_10px_25px_rgba(98,176,255,0.05)]">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_10px_rgba(98,176,255,0.3)]">
        <service.icon className="size-4.5" />
      </span>
      <div>
        <h4 className="text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-primary">{service.title}</h4>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{service.description}</p>
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
          <p className="text-sm font-semibold tracking-wide uppercase text-primary">{badge}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{heading}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>

          <nav className="mt-8 space-y-2" aria-label="Service clusters">
            {clusters.map((cluster, index) => (
              <button
                key={cluster.id}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  "group relative flex w-full items-center gap-4 px-5 py-4 text-left transition-all duration-300 rounded-xl",
                  index === activeIndex
                    ? "bg-primary/10 border border-primary/20 text-foreground font-bold shadow-md shadow-primary/5"
                    : "border border-transparent text-muted-foreground hover:bg-accent/15 hover:text-foreground"
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
                  <div className="ml-auto h-1.5 w-12 overflow-hidden rounded-full bg-primary/20">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_8px_rgba(98,176,255,0.8)]"
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
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] border border-border/50 bg-card/45 backdrop-blur-md p-6 sm:p-8 shadow-2xl shadow-primary/5"
            >
              <div className="mb-8 flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-primary/20 bg-primary/5 text-primary shadow-[0_0_15px_rgba(98,176,255,0.15)]">
                  <active.icon className="size-7" />
                </span>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-foreground">{active.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{active.summary}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
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
