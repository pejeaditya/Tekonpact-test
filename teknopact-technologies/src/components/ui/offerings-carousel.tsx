"use client"

import { useCallback, useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react"
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
  image: string
  theme: {
    accent: string
    borderHover: string
    shadowGlow: string
    badgeBg: string
    badgeText: string
    checkBg: string
    checkText: string
  }
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
      <div className="overflow-hidden rounded-[2.5rem] p-4 -m-4">
        <motion.div
          className="flex gap-6 p-4"
          animate={{ x: `-${activeIndex * (100 / visibleCount)}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {offerings.map((offering) => (
            <div
              key={offering.href}
              className="shrink-0"
              style={{ width: `calc(${cardWidth} - ${visibleCount === 3 ? "1rem" : visibleCount === 2 ? "0.75rem" : "0px"})` }}
            >
              <motion.div
                whileHover={{
                  y: -8,
                  boxShadow: offering.theme.shadowGlow,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group flex h-full flex-col justify-between rounded-[2rem] border border-border/50 bg-card/45 backdrop-blur-md overflow-hidden shadow-sm transition-all duration-500 hover:bg-card/75",
                  offering.theme.borderHover
                )}
              >
                <AppLink href={offering.href} className="flex h-full flex-col justify-between">
                  <div>
                    {/* Top Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={offering.image}
                        alt={offering.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                      
                      {/* Icon Badge floating on the image */}
                      <span className={cn(
                        "absolute bottom-4 left-6 grid size-12 place-items-center rounded-2xl border backdrop-blur-md transition-all duration-300 group-hover:scale-110",
                        offering.theme.badgeBg,
                        offering.theme.badgeText
                      )}>
                        <offering.icon className="size-5" />
                      </span>
                    </div>

                    {/* Content Container */}
                    <div className="p-6 sm:p-8 pt-4">
                      <h3 className={cn(
                        "text-2xl font-bold tracking-tight text-foreground transition-colors duration-300",
                        offering.theme.accent
                      )}>
                        {offering.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{offering.description}</p>
                      
                      <ul className="mt-6 w-full space-y-3.5">
                        {offering.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80 transition-colors duration-300 group-hover:text-foreground">
                            <span className={cn(
                              "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full transition-all duration-300",
                              offering.theme.checkBg,
                              offering.theme.checkText
                            )}>
                              <Check className="size-3" />
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer button container */}
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <span className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                      "border-primary/20 bg-primary/5 text-primary",
                      "group-hover:border-current group-hover:bg-transparent group-hover:text-current"
                    )}>
                      {offering.cta}
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </AppLink>
              </motion.div>
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
