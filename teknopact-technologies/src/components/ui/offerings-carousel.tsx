"use client"

import { useCallback, useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

import { AppLink } from "@/components/app-link"
import { cn } from "@/lib/utils"

export interface Offering {
  icon: LucideIcon
  title: string
  description: string
  highlights: string[]
  cta: string
  href: string
}

export interface OfferingsCarouselProps {
  offerings: Offering[]
  className?: string
}

function useResponsiveVisible() {
  const [count, setCount] = useState(1)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1024) setCount(3)
      else if (w >= 768) setCount(2)
      else setCount(1)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return count
}

export function OfferingsCarousel({ offerings, className }: OfferingsCarouselProps) {
  const visibleCount = useResponsiveVisible()
  const maxIndex = Math.max(0, offerings.length - visibleCount)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (activeIndex > maxIndex) setActiveIndex(maxIndex)
  }, [maxIndex, activeIndex])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, maxIndex)))
    },
    [maxIndex]
  )

  const cardWidth = `${100 / visibleCount}%`
  const canGoPrev = activeIndex > 0
  const canGoNext = activeIndex < maxIndex

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex gap-4 sm:gap-6"
          animate={{ x: `-${activeIndex * (100 / visibleCount)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {offerings.map((offering) => (
            <div
              key={offering.href}
              className="shrink-0"
              style={{ width: `calc(${cardWidth} - ${visibleCount === 2 ? "0.75rem" : "1rem"})` }}
            >
              <AppLink
                href={offering.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/30 hover:bg-accent/30 sm:p-8"
              >
                <motion.div
                  className="flex flex-col items-start gap-4"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <offering.icon className="size-6" />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{offering.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{offering.description}</p>
                  <ul className="w-full space-y-1.5">
                    {offering.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
                        <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                  {offering.cta}
                  <motion.span
                    className="inline-flex"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <ArrowRight className="size-4" />
                  </motion.span>
                </div>
              </AppLink>
            </div>
          ))}
        </motion.div>
      </div>

      {maxIndex > 0 && (
        <>
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            className={cn(
              "absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full border border-border bg-card shadow-md transition-all",
              canGoPrev
                ? "hover:border-primary/30 hover:bg-accent hover:shadow-lg"
                : "cursor-default opacity-40"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            className={cn(
              "absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full border border-border bg-card shadow-md transition-all",
              canGoNext
                ? "hover:border-primary/30 hover:bg-accent hover:shadow-lg"
                : "cursor-default opacity-40"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}
    </div>
  )
}
