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
              {/* 3D Flip Card Container */}
              <div className="perspective-1000 group w-full h-[460px]">
                <div className="relative w-full h-full preserve-3d duration-700 ease-out group-hover:rotate-y-180">
                  
                  {/* FRONT FACE (Location Cards / MakeMyTrip Style) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-[2.2rem] border border-border/40 bg-card/30 backdrop-blur-sm shadow-md">
                    {/* Background image */}
                    <img
                      src={offering.image}
                      alt={offering.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/5" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      {/* Floating Badge */}
                      <div className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-xs font-semibold tracking-wide uppercase backdrop-blur-md">
                        <offering.icon className="size-3 text-primary-foreground" />
                        <span>Pillar</span>
                      </div>

                      <h3 className="text-3xl font-extrabold tracking-tight text-white">{offering.title}</h3>
                      <p className="mt-2 text-sm text-white/70 line-clamp-2 leading-relaxed">
                        {offering.description}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary-foreground/90 group-hover:text-white transition-colors duration-300">
                        <span>Hover to view details</span>
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE (Translucent details & See details button) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 overflow-hidden rounded-[2.2rem] border border-primary/25 bg-card/75 backdrop-blur-md shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Back face Header */}
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "grid size-10 place-items-center rounded-xl border backdrop-blur-md",
                          offering.theme.badgeBg,
                          offering.theme.badgeText
                        )}>
                          <offering.icon className="size-5" />
                        </span>
                        <h3 className={cn("text-2xl font-bold tracking-tight", offering.theme.accent)}>
                          {offering.title}
                        </h3>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                        {offering.description}
                      </p>

                      {/* Highlights checklist */}
                      <ul className="mt-5 space-y-3">
                        {offering.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/80">
                            <span className={cn(
                              "mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full",
                              offering.theme.checkBg,
                              offering.theme.checkText
                            )}>
                              <Check className="size-2.5" />
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA button at bottom */}
                    <div>
                      <AppLink
                        href={offering.href}
                        className={cn(
                          "inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3.5 text-xs font-semibold transition-all duration-300",
                          "border-primary/25 bg-primary text-primary-foreground hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20"
                        )}
                      >
                        {offering.cta}
                        <ArrowRight className="size-3.5" />
                      </AppLink>
                    </div>
                  </div>

                </div>
              </div>
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
