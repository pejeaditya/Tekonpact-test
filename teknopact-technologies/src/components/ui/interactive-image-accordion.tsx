"use client"

import { useEffect, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ImageAccordionItem = {
  id: number | string
  title: string
  description?: string
  imageUrl: string
}

type AccordionPanelProps = {
  item: ImageAccordionItem
  isActive: boolean
  onMouseEnter: () => void
}

function AccordionPanel({ item, isActive, onMouseEnter }: AccordionPanelProps) {
  return (
    <div
      className={cn(
        "relative h-[380px] shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-[width] duration-700 ease-in-out sm:h-[450px]",
        isActive
          ? "w-[min(380px,calc(100vw-3.5rem))] sm:w-[400px]"
          : "w-12 sm:w-[60px]"
      )}
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={item.title}
    >
      <img
        src={item.imageUrl}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const target = e.currentTarget
          target.onerror = null
          target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {isActive ? (
        <div className="absolute inset-x-0 bottom-0 z-10 min-w-0 bg-black/80 px-5 py-4 sm:px-6 sm:py-5">
          <p className="text-pretty text-left text-lg font-semibold leading-snug text-white sm:text-xl">
            {item.title}
          </p>
          {item.description ? (
            <p className="mt-2 text-pretty text-left text-sm leading-6 text-white/95">
              {item.description}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rotate-90 whitespace-nowrap text-base font-semibold text-white sm:text-lg">
            {item.title}
          </span>
        </div>
      )}
    </div>
  )
}

export type InteractiveImageAccordionProps = {
  items: ImageAccordionItem[]
  badge?: string
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
  defaultActiveIndex?: number
  className?: string
}

export function InteractiveImageAccordion({
  items,
  badge,
  title,
  description,
  ctaLabel = "Contact Us",
  ctaHref = "#contact",
  defaultActiveIndex = 0,
  className,
}: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(defaultActiveIndex, Math.max(0, items.length - 1))
  )
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showRightFade, setShowRightFade] = useState(true)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const updateFades = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      const maxScroll = scrollWidth - clientWidth
      setShowRightFade(maxScroll > 6 && scrollLeft < maxScroll - 6)
    }

    updateFades()
    el.addEventListener("scroll", updateFades, { passive: true })
    const resizeObserver = new ResizeObserver(updateFades)
    resizeObserver.observe(el)
    window.addEventListener("resize", updateFades)

    return () => {
      el.removeEventListener("scroll", updateFades)
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateFades)
    }
  }, [items.length])

  return (
    <div className={cn("bg-background", className)}>
      <div className="flex flex-col items-center justify-between gap-10 xl:flex-row xl:gap-12">
        <div className="w-full text-center xl:w-[42%] xl:text-left">
          {badge ? (
            <Badge
              variant="secondary"
              className="rounded-full border border-primary/25 bg-primary/10 text-primary"
            >
              {badge}
            </Badge>
          ) : null}
          <h2
            className={cn(
              "text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl",
              badge && "mt-4"
            )}
          >
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground xl:mx-0">
            {description}
          </p>

          <div className="mt-8">
            <Button asChild className="rounded-full">
              <a href={ctaHref}>{ctaLabel}</a>
            </Button>
          </div>
        </div>

        <div className="w-full xl:w-[58%]">
          <div className="relative xl:static">
            {showRightFade ? (
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-20 w-7 bg-[linear-gradient(to_left,color-mix(in_oklch,var(--background)_28%,transparent)_0%,color-mix(in_oklch,var(--background)_12%,transparent)_55%,transparent_100%)] xl:hidden"
                aria-hidden
              />
            ) : null}
            <div
              ref={scrollRef}
              className="teknopact-scrollbar flex flex-row items-stretch justify-start gap-2 overflow-x-auto scroll-smooth scroll-px-2 px-1 py-2 sm:gap-3 sm:px-2 xl:justify-center xl:overflow-visible"
            >
              {items.map((item, index) => (
                <AccordionPanel
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
