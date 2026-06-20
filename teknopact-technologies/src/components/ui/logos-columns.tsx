"use client"

import React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export type LogoItem = {
  src: string
  alt: string
}

export function LogosColumn({
  className,
  logos,
  duration = 16,
}: {
  className?: string
  logos: LogoItem[]
  duration?: number
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <React.Fragment key={index}>
            {logos.map((logo) => (
              <div
                key={`${logo.alt}-${index}`}
                className="flex h-24 w-full items-center justify-center rounded-2xl border border-border bg-card px-6 shadow-sm shadow-primary/5"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="max-h-12 w-auto max-w-[140px] object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
