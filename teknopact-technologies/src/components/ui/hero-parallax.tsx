"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type ParallaxProduct = {
  title: string
  description?: string
  link: string
  thumbnail: string
  categoryId?: string
}

export type HeroParallaxHeaderProps = {
  title: React.ReactNode
  subtitle: string
  badge?: string
  actions?: React.ReactNode
  className?: string
}

export function HeroParallaxHeader({
  title,
  subtitle,
  badge,
  actions,
  className,
}: HeroParallaxHeaderProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-7xl px-4 pb-4 pt-20 xl:pb-6 xl:pt-28",
        className
      )}
    >
      {badge ? (
        <Badge
          variant="secondary"
          className="mb-6 rounded-full border border-primary/25 bg-primary/10 text-primary"
        >
          {badge}
        </Badge>
      ) : null}
      <h1 className="home-hero-title text-balance text-3xl font-bold tracking-tight text-foreground lg:text-6xl xl:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground lg:text-xl lg:leading-8">
        {subtitle}
      </p>
      {actions ? (
        <div className="mt-6 flex flex-wrap items-center gap-4">{actions}</div>
      ) : null}
    </div>
  )
}

export function HeroParallax({
  products: _products,
  header,
  className,
}: {
  products: ParallaxProduct[]
  header?: React.ReactNode
  className?: string
}) {
  // const firstRow = products.slice(0, 5)
  // const secondRow = products.slice(5, 10)
  // const thirdRow = products.slice(10, 15)
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  // const translateX = useSpring(
  //   useTransform(scrollYProgress, [0, 1], [0, 1000]),
  //   springConfig
  // )
  // const translateXReverse = useSpring(
  //   useTransform(scrollYProgress, [0, 1], [0, -1000]),
  //   springConfig
  // )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.38], [-480, 120, 360]),
    springConfig
  )

  return (
    <div
      ref={ref}
      className={cn(
        "home-hero-parallax relative flex h-[300vh] flex-col self-auto overflow-hidden pb-32 pt-0 antialiased [perspective:1000px] [transform-style:preserve-3d] sm:pb-24 xl:pb-48 2xl:pb-52",
        "bg-gradient-to-b from-background via-background to-[color-mix(in_oklch,var(--muted)_18%,var(--background))]",
        className
      )}
    >
      {header ?? (
        <HeroParallaxHeader
          title={
            <>
              The Ultimate <br /> development studio
            </>
          }
          subtitle="We build beautiful products with the latest technologies and frameworks."
        />
      )}
      <motion.div
        className="relative z-[2] -mt-8 lg:-mt-12"
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        {/*
        <motion.div className="mb-12 flex flex-row-reverse space-x-20 space-x-reverse lg:mb-16">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="mb-20 flex flex-row space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        */}
      </motion.div>
    </div>
  )
}

export function ProductCard({
  product,
  translate,
}: {
  product: ParallaxProduct
  translate: MotionValue<number>
}) {
  const navigate = useNavigate()

  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      onClick={() => navigate(product.link)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          navigate(product.link)
        }
      }}
      className="group/product relative h-80 w-72 shrink-0 cursor-pointer xl:h-96 xl:w-[30rem]"
      tabIndex={0}
      role="button"
      aria-label={`View case studies for ${product.title}`}
    >
      <div className="block h-full w-full overflow-hidden rounded-2xl border border-border shadow-lg transition-shadow group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          width={600}
          height={600}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
          alt={product.title}
          onError={(e) => {
            const target = e.currentTarget
            target.onerror = null
            target.src =
              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/40" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl group-hover/product:hidden">
        <span className="max-w-[85%] text-center text-base font-semibold text-white sm:text-lg">
          {product.title}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden min-w-0 rounded-b-2xl bg-black/80 px-5 py-4 group-hover/product:block sm:px-6 sm:py-5">
        <p className="text-pretty text-left text-lg font-semibold leading-snug text-white sm:text-xl">
          {product.title}
        </p>
        {product.description ? (
          <p className="mt-2 text-pretty text-left text-sm leading-6 text-white/95">
            {product.description}
          </p>
        ) : null}
      </div>
    </motion.div>
  )
}
