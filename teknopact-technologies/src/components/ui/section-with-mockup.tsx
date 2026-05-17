"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

interface SectionWithMockupProps {
  title: string | React.ReactNode
  description: string | React.ReactNode
  primaryImageSrc?: string
  secondaryImageSrc?: string
  mockup?: React.ReactNode
  secondaryMockup?: React.ReactNode
  reverseLayout?: boolean
  /** Narrow two-column cap so mockups fit beside sidebars / smaller viewports */
  embedded?: boolean
  className?: string
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

export default function SectionWithMockup({
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  mockup,
  secondaryMockup,
  reverseLayout = false,
  embedded = false,
  className,
}: SectionWithMockupProps) {
  const layoutClasses = reverseLayout ? "md:grid-cols-2 md:grid-flow-col-dense" : "md:grid-cols-2"
  const embeddedLayoutClasses =
    "lg:grid-cols-[minmax(0,1fr)_minmax(0,min(100%,26rem))] lg:items-start lg:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,min(100%,28rem))]"
  const textOrderClass = reverseLayout ? "md:col-start-2" : ""
  const imageOrderClass = reverseLayout ? "md:col-start-1" : ""

  return (
    <section
      className={cn("relative overflow-hidden bg-black py-12 md:py-16", embedded && "py-6 md:py-8", className)}
    >
      <div
        className={cn(
          "container relative z-10 mx-auto w-full px-0",
          embedded ? "max-w-full" : "max-w-[1220px]"
        )}
      >
        <motion.div
          className={cn(
            "grid w-full grid-cols-1 items-center gap-10 md:gap-8",
            embedded ? embeddedLayoutClasses : layoutClasses
          )}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className={cn(
              "mx-auto flex min-w-0 max-w-[546px] flex-col items-start gap-4 md:mx-0",
              embedded && "max-w-none lg:max-w-[40rem]",
              textOrderClass
            )}
            variants={itemVariants}
          >
            <h2
              className={cn(
                "text-3xl font-semibold leading-tight text-white md:text-[40px] md:leading-[53px]",
                embedded && "md:text-3xl md:leading-tight"
              )}
            >
              {title}
            </h2>

            <div className="text-sm leading-6 text-muted-foreground md:text-[15px]">{description}</div>
          </motion.div>

          <motion.div
            className={cn(
              "relative mx-auto w-full min-w-0",
              embedded ? "max-w-[min(100%,28rem)] justify-self-center lg:justify-self-end" : "max-w-[760px]",
              imageOrderClass
            )}
            variants={itemVariants}
          >
            <motion.div
              className={cn(
                "absolute z-0 rounded-[32px] bg-[#090909] opacity-80 blur-[2px]",
                embedded
                  ? "left-1/2 top-[5%] h-[min(380px,52vh)] w-[min(100%,24rem)] max-w-full -translate-x-1/2 sm:w-[90%]"
                  : "min-h-[280px] w-[86%]"
              )}
              style={
                embedded
                  ? undefined
                  : {
                      top: reverseLayout ? "auto" : "8%",
                      bottom: reverseLayout ? "8%" : "auto",
                      left: reverseLayout ? "auto" : "-8%",
                      right: reverseLayout ? "-8%" : "auto",
                    }
              }
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? -20 : embedded ? -12 : -30 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {secondaryMockup ? (
                <div className="h-full w-full overflow-hidden rounded-[32px] opacity-45">{secondaryMockup}</div>
              ) : secondaryImageSrc ? (
                <div
                  className="h-full w-full rounded-[32px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${secondaryImageSrc})` }}
                />
              ) : null}
            </motion.div>

            <motion.div
              className={cn(
                "relative z-10 w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-[15px]",
                embedded ? "min-h-0" : "min-h-[420px]"
              )}
              initial={{ y: 0 }}
              whileInView={{ y: reverseLayout ? 20 : embedded ? 14 : 30 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {mockup ? (
                <div className={cn(embedded ? "w-full min-h-0 p-2 sm:p-3" : "h-full p-4")}>{mockup}</div>
              ) : primaryImageSrc ? (
                <div
                  className={cn(
                    "h-full w-full bg-cover bg-center",
                    embedded ? "min-h-[240px]" : "min-h-[420px]"
                  )}
                  style={{ backgroundImage: `url(${primaryImageSrc})` }}
                />
              ) : null}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 z-0 h-px w-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(213,165,86,0.24) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  )
}

export type { SectionWithMockupProps }
