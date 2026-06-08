"use client"

import * as React from "react"
import { type HTMLMotionProps, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number
  incrementY?: number
  incrementZ?: number
  stickyTopOffset?: number
  maxZIndex?: number
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  )
})
ContainerScroll.displayName = "ContainerScroll"

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 10,
      incrementZ = 1,
      stickyTopOffset = 0,
      maxZIndex = 40,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const y = stickyTopOffset + index * incrementY
    const z = Math.min(index * incrementZ, maxZIndex)

    return (
      <motion.div
        ref={ref}
        style={{
          position: "sticky",
          top: y,
          zIndex: z,
          backfaceVisibility: "hidden",
          ...style,
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

CardSticky.displayName = "CardSticky"

export { ContainerScroll, CardSticky }
