"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CircularTestimonial {
  quote: string
  name: string
  designation: string
  src: string
}

export interface CircularTestimonialsColors {
  name?: string
  designation?: string
  testimony?: string
  arrowBackground?: string
  arrowForeground?: string
  arrowHoverBackground?: string
}

export interface CircularTestimonialsFontSizes {
  name?: string
  designation?: string
  quote?: string
}

export interface CircularTestimonialsProps {
  testimonials: CircularTestimonial[]
  autoplay?: boolean
  colors?: CircularTestimonialsColors
  fontSizes?: CircularTestimonialsFontSizes
  className?: string
}

function calculateGap(width: number) {
  if (width < 480) return Math.max(20, width * 0.07)
  if (width < 768) return Math.max(28, width * 0.09)
  const minWidth = 1024
  const maxWidth = 1456
  const minGap = 60
  const maxGap = 86
  if (width <= minWidth) return minGap
  if (width >= maxWidth) {
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  }
  return minGap + ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth)
}

function NavButtons({
  onPrev,
  onNext,
  hoverPrev,
  hoverNext,
  setHoverPrev,
  setHoverNext,
  colorArrowBg,
  colorArrowFg,
  colorArrowHoverBg,
  size = "default",
}: {
  onPrev: () => void
  onNext: () => void
  hoverPrev: boolean
  hoverNext: boolean
  setHoverPrev: (v: boolean) => void
  setHoverNext: (v: boolean) => void
  colorArrowBg: string
  colorArrowFg: string
  colorArrowHoverBg: string
  size?: "default" | "compact"
}) {
  const iconSize = size === "compact" ? 22 : 28
  const buttonClass =
    size === "compact"
      ? "flex size-10 cursor-pointer items-center justify-center rounded-full border-0 transition-colors"
      : "flex size-[2.7rem] cursor-pointer items-center justify-center rounded-full border-0 transition-colors"

  return (
    <div className={cn("flex gap-3", size === "default" && "gap-6")}>
      <button
        type="button"
        className={buttonClass}
        onClick={onPrev}
        style={{ backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg }}
        onMouseEnter={() => setHoverPrev(true)}
        onMouseLeave={() => setHoverPrev(false)}
        aria-label="Previous"
      >
        <ArrowLeft size={iconSize} style={{ color: colorArrowFg }} />
      </button>
      <button
        type="button"
        className={buttonClass}
        onClick={onNext}
        style={{ backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg }}
        onMouseEnter={() => setHoverNext(true)}
        onMouseLeave={() => setHoverNext(false)}
        aria-label="Next"
      >
        <ArrowRight size={iconSize} style={{ color: colorArrowFg }} />
      </button>
    </div>
  )
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  className,
}: CircularTestimonialsProps) {
  const colorName = colors.name ?? "var(--foreground)"
  const colorDesignation = colors.designation ?? "var(--muted-foreground)"
  const colorTestimony = colors.testimony ?? "var(--muted-foreground)"
  const colorArrowBg = colors.arrowBackground ?? "var(--primary)"
  const colorArrowFg = colors.arrowForeground ?? "var(--primary-foreground)"
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "var(--chart-3)"

  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)
  const [containerWidth, setContainerWidth] = useState(390)
  const [isMobile, setIsMobile] = useState(false)

  const imageContainerRef = useRef<HTMLDivElement>(null)
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials])
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  )

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const updateMobile = () => setIsMobile(mq.matches)
    updateMobile()
    mq.addEventListener("change", updateMobile)
    return () => mq.removeEventListener("change", updateMobile)
  }, [])

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength)
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
  }, [testimonialsLength])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength)
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
  }, [testimonialsLength])

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength)
      }, 5000)
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current)
    }
  }, [autoplay, testimonialsLength])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handleNext, handlePrev])

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth)
    const maxStickUp = isMobile ? gap * 0.25 : gap * 0.8
    const isActive = index === activeIndex
    const isLeft =
      (activeIndex - 1 + testimonialsLength) % testimonialsLength === index
    const isRight = (activeIndex + 1) % testimonialsLength === index

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: isMobile ? 0.65 : 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(${isMobile ? 0.88 : 0.85}) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: isMobile ? 0.65 : 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(${isMobile ? 0.88 : 0.85}) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      }
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    }
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  }

  if (testimonialsLength === 0) return null

  const nameSize =
    fontSizes.name ?? (isMobile ? "clamp(1.125rem, 4.5vw, 1.5rem)" : "1.5rem")
  const designationSize =
    fontSizes.designation ?? (isMobile ? "clamp(0.8125rem, 3.5vw, 0.925rem)" : "0.925rem")
  const quoteSize =
    fontSizes.quote ?? (isMobile ? "clamp(0.75rem, 3.2vw, 0.9375rem)" : "1.125rem")

  return (
    <div
      className={cn(
        "w-full max-w-4xl px-0 py-2 sm:px-4 sm:py-4 md:p-8",
        "max-md:h-full max-md:min-h-0 max-md:overflow-hidden",
        className
      )}
    >
      <div className="flex max-md:h-full max-md:min-h-0 max-md:flex-col max-md:gap-3 md:grid md:grid-cols-2 md:gap-20">
        <div
          ref={imageContainerRef}
          className={cn(
            "relative w-full shrink-0 [perspective:1000px]",
            "h-[min(32dvh,12.75rem)] sm:h-[min(36dvh,15rem)]",
            "md:h-96"
          )}
        >
          {testimonials.map((testimonial, index) => (
            <img
              key={`${testimonial.name}-${index}`}
              src={testimonial.src}
              alt={testimonial.name}
              className="absolute h-full w-full rounded-2xl object-cover object-top shadow-lg md:rounded-3xl md:shadow-xl"
              data-index={index}
              style={getImageStyle(index)}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 md:justify-between md:gap-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3
                    className="mb-0.5 font-bold leading-tight"
                    style={{ color: colorName, fontSize: nameSize }}
                  >
                    {activeTestimonial.name}
                  </h3>
                  <p
                    className="leading-snug md:mb-8"
                    style={{ color: colorDesignation, fontSize: designationSize }}
                  >
                    {activeTestimonial.designation}
                  </p>
                </div>
                <div className="shrink-0 md:hidden">
                  <NavButtons
                    onPrev={handlePrev}
                    onNext={handleNext}
                    hoverPrev={hoverPrev}
                    hoverNext={hoverNext}
                    setHoverPrev={setHoverPrev}
                    setHoverNext={setHoverNext}
                    colorArrowBg={colorArrowBg}
                    colorArrowFg={colorArrowFg}
                    colorArrowHoverBg={colorArrowHoverBg}
                    size="compact"
                  />
                </div>
              </div>

              <p
                className={cn(
                  "mt-2 min-h-0 flex-1 leading-snug md:mt-0 md:leading-7",
                  isMobile && "line-clamp-[7] overflow-hidden"
                )}
                style={{ color: colorTestimony, fontSize: quoteSize }}
              >
                {activeTestimonial.quote}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="hidden pt-0 md:flex md:pt-0">
            <NavButtons
              onPrev={handlePrev}
              onNext={handleNext}
              hoverPrev={hoverPrev}
              hoverNext={hoverNext}
              setHoverPrev={setHoverPrev}
              setHoverNext={setHoverNext}
              colorArrowBg={colorArrowBg}
              colorArrowFg={colorArrowFg}
              colorArrowHoverBg={colorArrowHoverBg}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircularTestimonials
