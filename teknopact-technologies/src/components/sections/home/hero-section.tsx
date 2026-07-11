import { type ReactNode } from "react"
import { Menu, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"

import { AppLink } from "@/components/app-link"
import { prefetchHomeRoute } from "@/components/route-prefetch"
import { DesktopMainNav, MobileMainNav } from "@/components/layout/MainNavMenu"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { brand } from "@/lib/brand"
import { company } from "@/lib/content"

function HeroParallaxNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onMouseEnter={prefetchHomeRoute}
          onFocus={prefetchHomeRoute}
        >
          <img
            src={brand.logo.src}
            alt={brand.logo.alt}
            className="h-7 w-auto max-w-[10rem] object-contain object-left sm:h-8"
          />
        </Link>
        <DesktopMainNav
          menuClassName="hidden lg:flex"
          linkClassName="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          triggerClassName="rounded-lg bg-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        />
        <div className="flex items-center gap-2">
          <Button asChild className="hidden rounded-full sm:inline-flex lg:inline-flex">
            <AppLink href="/#contact">Contact Us</AppLink>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-background">
              <SheetHeader>
                <SheetTitle className="text-left text-foreground">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6" aria-label="Mobile">
                <MobileMainNav
                  linkClassName="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  serviceLinkClassName="rounded-lg px-3 py-2.5 pl-6 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                />
                <Button asChild className="mt-4 w-full rounded-full">
                  <AppLink href="/#contact">Contact Us</AppLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

function HeroBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-md dark:border-primary/25 dark:bg-background/40">
      <Sparkles className="size-3" />
      {children}
    </span>
  )
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const buttonHover = {
    scale: shouldReduceMotion ? 1 : 1.03,
    transition: { duration: 0.15 },
  }
  const buttonTap = {
    scale: shouldReduceMotion ? 1 : 0.97,
  }

  return (
    <section id="home" className="relative">
      <HeroParallaxNav />

      <div className="relative h-[100dvh] min-h-[32rem] w-full overflow-hidden sm:min-h-[36rem] lg:min-h-[40rem]">
        <motion.div
          className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 content-center items-center gap-8 px-5 pb-10 pt-16 sm:px-8 sm:pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-16 lg:pt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-xl lg:max-w-2xl">
            <motion.div variants={itemVariants}>
              <HeroBadge>{company.tagline}</HeroBadge>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="mt-4 text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-foreground sm:mt-5 sm:text-4xl sm:leading-[1.08] lg:text-5xl xl:text-[3.5rem] xl:leading-[1.05] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            >
              {company.heroTitle.split(",").map((part, i) => (
                <span key={i} className={i === 1 ? "block text-primary" : "block"}>
                  {part.trim()}
                  {part.includes(",") ? "," : ""}
                </span>
              ))}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base lg:max-w-xl lg:text-lg dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
            >
              {company.heroSubtitle}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="relative mt-6 flex w-full flex-col gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
            >
              <motion.div className="w-full sm:w-auto" whileHover={buttonHover} whileTap={buttonTap}>
                <Button
                  asChild
                  className="w-full rounded-full border border-primary/50 bg-primary px-6 text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto dark:border-primary/40 dark:bg-primary/60 dark:shadow-none dark:hover:bg-primary/75"
                >
                  <AppLink href="/#contact">Contact Us</AppLink>
                </Button>
              </motion.div>
              <motion.div className="w-full sm:w-auto" whileHover={buttonHover} whileTap={buttonTap}>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-primary/25 bg-background/70 px-6 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-background/90 sm:w-auto dark:border-border/60 dark:bg-background/15 dark:shadow-none dark:hover:bg-background/25"
                >
                  <AppLink href="/services">Our Services</AppLink>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <div className="hidden min-h-[1px] lg:block" aria-hidden />
        </motion.div>
      </div>
    </section>
  )
}
