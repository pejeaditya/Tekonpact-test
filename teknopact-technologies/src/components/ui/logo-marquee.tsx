"use client"

import React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export type LogoItem = {
  src: string
  alt: string
}

function MarqueeRow({
  logos,
  direction = "left",
  duration = 40,
}: {
  logos: LogoItem[]
  direction?: "left" | "right"
  duration?: number
}) {
  const from = direction === "left" ? "0%" : "-50%"
  const to = direction === "left" ? "-50%" : "0%"

  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        {Array.from({ length: 2 }).map((_, copy) => (
          <React.Fragment key={copy}>
            {logos.map((logo) => (
              <div
                key={`${logo.alt}-${copy}`}
                className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-border bg-white px-3 shadow-sm shadow-primary/5 sm:h-20 sm:w-36 sm:px-4 dark:bg-white/90"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="max-h-10 w-auto max-w-full object-contain sm:max-h-12"
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

export function LogoMarquee({
  logos,
  rows = 3,
  className,
}: {
  logos: LogoItem[]
  rows?: number
  className?: string
}) {
  const chunkSize = Math.ceil(logos.length / rows)
  const chunks = Array.from({ length: rows }, (_, i) => logos.slice(i * chunkSize, (i + 1) * chunkSize)).filter(
    (chunk) => chunk.length > 0
  )

  return (
    <div
      className={cn(
        "relative w-full [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        {chunks.map((chunk, index) => (
          <MarqueeRow
            key={index}
            logos={chunk}
            direction={index % 2 === 0 ? "left" : "right"}
            duration={38 + index * 6}
          />
        ))}
      </div>
    </div>
  )
}
