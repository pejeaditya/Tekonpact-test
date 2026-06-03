import { useEffect, useRef, useState, type RefObject } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Menu, Quote, Star } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WorldMap } from "@/components/ui/map"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CircularTestimonials } from "@/components/ui/circular-testimonials"
import { HeroParallax, HeroParallaxHeader } from "@/components/ui/hero-parallax"
import { InteractiveImageAccordion } from "@/components/ui/interactive-image-accordion"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import { ThemeToggle } from "@/components/theme-toggle"
import { brand } from "@/lib/brand"
import {
  caseStudies,
  company,
  customerTestimonials,
  expertisePillars,
  faqs,
  heroParallaxProducts,
  navLinks,
  presenceMapDots,
  serviceClusterImages,
  serviceClusters,
  teamCircularTestimonials,
  testimonial,
  whyTeknopactAccordionItems,
} from "@/lib/content"
import type { ServiceCluster } from "@/lib/content"
import { cn } from "@/lib/utils"

function ClusterTopRail({
  clusters,
  activeClusterId,
  onSelectCluster,
  scrollRef,
  onInteractionPauseChange,
}: {
  clusters: ServiceCluster[]
  activeClusterId: string
  onSelectCluster: (id: string) => void
  scrollRef: RefObject<HTMLDivElement | null>
  onInteractionPauseChange: (paused: boolean) => void
}) {
  return (
    <div
      onMouseEnter={() => onInteractionPauseChange(true)}
      onMouseLeave={() => onInteractionPauseChange(false)}
      onFocusCapture={() => onInteractionPauseChange(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onInteractionPauseChange(false)
        }
      }}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Service areas</p>
      <div
        ref={scrollRef}
        className="teknopact-scrollbar flex gap-2.5 overflow-x-auto scroll-smooth pb-2"
      >
        {clusters.map((cluster) => (
          <button
            key={cluster.id}
            type="button"
            onClick={() => onSelectCluster(cluster.id)}
            className={cn(
              "flex min-w-[11rem] shrink-0 items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left text-sm shadow-sm transition-all duration-300 sm:min-w-0 sm:px-4",
              activeClusterId === cluster.id
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                : "border-border/80 bg-card text-foreground/80 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                activeClusterId === cluster.id
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "bg-primary/10 text-primary"
              )}
            >
              <cluster.icon className="size-4 shrink-0" />
            </span>
            <span className="font-semibold leading-snug">{cluster.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function HeroParallaxNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a href="#home" className="flex shrink-0 items-center gap-2">
          <img
            src={brand.logo.src}
            alt={brand.logo.alt}
            className="h-7 w-auto max-w-[10rem] object-contain object-left sm:h-8"
          />
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden rounded-full sm:inline-flex lg:inline-flex">
            <a href="#contact">Contact Us</a>
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
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="mt-4 w-full rounded-full">
                  <a href="#contact">Contact Us</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

export function HeroSection() {
  return (
    <section id="home" className="relative">
      <HeroParallaxNav />
      <HeroParallax
        products={[...heroParallaxProducts]}
        header={
          <HeroParallaxHeader
            badge={company.tagline}
            title={company.heroTitle}
            subtitle={company.heroSubtitle}
            className="!pb-2 pt-24 md:!pb-4 md:pt-28"
            actions={
              <>
                <Button asChild className="rounded-full">
                  <a href="#contact">Contact Us</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border bg-muted/60">
                  <a href="#services">Our Services</a>
                </Button>
              </>
            }
          />
        }
      />
    </section>
  )
}

export function ProductTabsSection() {
  const clusters = serviceClusters
  const initialCluster = clusters[0]
  const [activeClusterId, setActiveClusterId] = useState(initialCluster.id)
  const [activeServiceId, setActiveServiceId] = useState(initialCluster.services[0].id)
  const clusterScrollRef = useRef<HTMLDivElement>(null)
  const [pauseClusterAutoScroll, setPauseClusterAutoScroll] = useState(false)

  const activeCluster = clusters.find((c) => c.id === activeClusterId) ?? initialCluster
  const selectedService =
    activeCluster.services.find((s) => s.id === activeServiceId) ?? activeCluster.services[0]

  useEffect(() => {
    const el = clusterScrollRef.current
    if (!el || pauseClusterAutoScroll) return

    let raf = 0
    const speed = 0.45

    const tick = () => {
      el.scrollLeft += speed
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      if (el.scrollLeft >= max - 0.5) {
        el.scrollLeft = 0
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [pauseClusterAutoScroll, activeClusterId])

  const handleSelectCluster = (clusterId: string) => {
    setActiveClusterId(clusterId)
    const next = clusters.find((c) => c.id === clusterId)
    const firstSub = next?.services[0]
    if (firstSub) setActiveServiceId(firstSub.id)
  }

  const clusterImage =
    serviceClusterImages[activeCluster.id] ?? serviceClusterImages.erp

  return (
    <section
      id="services"
      className="relative overflow-hidden border-b border-border py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-3xl">
          <Badge
            variant="secondary"
            className="rounded-full border border-primary/25 bg-primary/10 text-primary"
          >
            Our services
          </Badge>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Comprehensive IT services across the full lifecycle.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/75">
            From ERP and core banking to managed services, blockchain, and BPM—backed by domain
            consultants, solution architects, and engineers.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-primary/15 bg-card/90 p-4 shadow-lg shadow-primary/5 backdrop-blur-sm sm:p-5">
          <ClusterTopRail
            clusters={clusters}
            activeClusterId={activeClusterId}
            onSelectCluster={handleSelectCluster}
            scrollRef={clusterScrollRef}
            onInteractionPauseChange={setPauseClusterAutoScroll}
          />
        </div>

        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)] lg:items-stretch">
          <div className="hidden rounded-2xl border border-primary/15 bg-card/95 p-3 shadow-md shadow-primary/5 backdrop-blur-sm lg:block">
            <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {activeCluster.title}
            </p>
            <div className="flex flex-col gap-2">
              {activeCluster.services.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveServiceId(item.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300",
                    activeServiceId === item.id
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "border-transparent bg-background/60 text-foreground/75 hover:border-primary/25 hover:bg-primary/5 hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl transition-colors",
                      activeServiceId === item.id
                        ? "bg-primary-foreground/15 text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    <item.icon className="size-4" />
                  </span>
                  <span className="block text-sm font-semibold leading-snug">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          <Card className="min-w-0 overflow-hidden border-primary/15 bg-card shadow-xl shadow-primary/10">
            <div className="relative h-44 overflow-hidden border-b border-border/60 sm:h-52">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeCluster.id}
                  src={clusterImage}
                  alt=""
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent mix-blend-multiply" />
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                  {activeCluster.title}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCluster.id}-${selectedService.id}`}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <CardHeader className="!flex !flex-col gap-0 pb-4">
                  <div className="flex items-center gap-3 sm:items-start sm:gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30 sm:h-11 sm:w-11 md:h-12 md:w-12 md:rounded-2xl">
                      <selectedService.icon className="size-5 shrink-0 sm:size-[1.35rem] md:size-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-xl leading-tight text-foreground sm:text-2xl">
                        {selectedService.title}
                      </CardTitle>
                      <CardDescription className="mt-1.5 text-sm leading-relaxed text-foreground/70 sm:mt-2 sm:text-base">
                        {activeCluster.summary}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-base leading-7 text-foreground/80">{selectedService.description}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {activeCluster.services.map((svc) => (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setActiveServiceId(svc.id)}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300",
                          svc.id === selectedService.id
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-background/80 text-foreground/70 hover:border-primary/35 hover:bg-primary/5 hover:text-foreground"
                        )}
                      >
                        {svc.title}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </section>
  )
}

export function TrustedBySection() {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <InteractiveImageAccordion
          badge="Why Teknopact?"
          title="Trusted across government and enterprise"
          description="Strategic IT and digital transformation partners for government and private enterprises across the GCC—with diverse market experience, proven delivery, and regional presence."
          items={whyTeknopactAccordionItems}
          ctaLabel="Contact Us"
          ctaHref="#contact"
          defaultActiveIndex={0}
        />
      </div>
    </section>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full border border-border bg-muted/60 text-muted-foreground">
            Our expertise
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Built for complex challenges
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The world economy is transforming through ICT and data—we simplify complexities and deliver intelligent solutions.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {expertisePillars.map((feature, index) => (
            <Card
              key={feature.title}
              className={cn(
                "border-border teknopact-card-gradient",
                index === 1 && "border-primary/30 bg-primary/10"
              )}
            >
              <CardHeader>
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </span>
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">{feature.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function VideoSection() {
  return (
    <section id="presence" className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary">
            Our presence
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Offices across GCC, India & Canada
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            Seven countries. Five GCC offices plus India and Canada—local support with global delivery standards.
          </p>
        </div>
        <WorldMap dots={presenceMapDots} className="mt-8" />
      </div>
    </section>
  )
}

export function TeamSection() {
  return (
    <section
      id="team"
      className="border-b border-border py-8 sm:py-16 md:py-24 max-md:max-h-[100dvh] max-md:overflow-hidden"
    >
      <div className="mx-auto flex max-w-7xl flex-col px-4 max-md:max-h-[inherit] max-md:min-h-0 sm:px-8">
        <div className="mx-auto shrink-0 max-w-2xl text-center">
          <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary">
            Our team
          </Badge>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:mt-4 sm:text-3xl md:text-5xl">
            Leadership driving innovation
          </h2>
        </div>
        <div className="mt-3 flex min-h-0 flex-1 justify-center sm:mt-8 md:mt-10">
          <CircularTestimonials
            testimonials={teamCircularTestimonials}
            autoplay
            colors={{
              name: "var(--foreground)",
              designation: "var(--primary)",
              testimony: "var(--muted-foreground)",
              arrowBackground: "var(--primary)",
              arrowForeground: "var(--primary-foreground)",
              arrowHoverBackground: "var(--chart-3)",
            }}
            className="w-full max-w-6xl"
          />
        </div>
      </div>
    </section>
  )
}

export function TestimonialSection() {
  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Quote className="mx-auto size-10 text-primary" />
        <blockquote className="mt-6 text-balance text-2xl font-medium leading-tight text-foreground sm:text-3xl">
          “{testimonial.quote}”
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">TT</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TestimonialsColumnsSection() {
  const firstColumn = customerTestimonials.slice(0, 3)
  const secondColumn = customerTestimonials.slice(3, 6)
  const thirdColumn = customerTestimonials.slice(6, 9)

  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-16 sm:py-24">
      <div className="absolute inset-x-0 top-1/4 h-72 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_42rem)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center justify-center text-center"
        >
          <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary">
            Customer testimonials
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Satisfied clients across the region
          </h2>
        </motion.div>

        <div className="relative mx-auto mt-10 max-h-[740px]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-background via-background/70 to-transparent backdrop-blur-[6px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background via-background/70 to-transparent backdrop-blur-[6px]"
            aria-hidden
          />
          <div className="flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.4)_6%,black_14%,black_86%,rgba(0,0,0,0.4)_94%,transparent_100%)]">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function BlogPreviewSection() {
  return (
    <section id="case-studies" className="border-b border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Badge
              variant="secondary"
              className="rounded-full border border-primary/25 bg-primary/10 text-primary"
            >
              Case studies
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Teknopact engagement highlights
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Representative deliveries across education, ERP, digital, and telecom—aligned with our
              corporate portfolio.
            </p>
          </div>
          <Button asChild className="w-fit shrink-0 rounded-full">
            <a href="#contact">Discuss your project</a>
          </Button>
        </div>

        <div
          className={cn(
            "mt-10 flex gap-4 overflow-x-auto scroll-smooth pb-2 teknopact-scrollbar",
            "snap-x snap-mandatory -mx-5 scroll-px-5 px-5",
            "md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:snap-none lg:grid-cols-4"
          )}
        >
          {caseStudies.map((study) => (
            <Card
              key={study.title}
              className={cn(
                "group/study w-[min(88vw,20rem)] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300",
                "hover:-translate-y-1 hover:border-primary/30 hover:shadow-md",
                "md:w-auto md:shrink"
              )}
            >
              <div className="relative h-40 overflow-hidden border-b border-border sm:h-44">
                <img
                  src={study.thumbnail}
                  alt={study.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover/study:scale-105"
                />
                <Badge
                  variant="secondary"
                  className="absolute left-4 top-4 rounded-full border border-primary/25 bg-background/90 text-primary backdrop-blur-sm"
                >
                  {study.category}
                </Badge>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold leading-tight text-foreground">{study.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{study.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.highlights.map((h) => (
                    <Badge
                      key={h}
                      variant="outline"
                      className="rounded-full border-primary/20 bg-primary/5 text-xs text-primary"
                    >
                      {h}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm text-primary">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Questions before we begin?
          </h2>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Reach out to discuss advisory, ERP, managed services, or digital transformation for your organization.
          </p>
          <Button asChild variant="creamPill" size="pill" className="mt-7">
            <a href="#contact">Contact Teknopact</a>
          </Button>
        </div>
        <Accordion type="single" collapsible className="rounded-3xl border border-border px-5">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm leading-6 text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export function DecorativeRating() {
  return (
    <div className="flex items-center gap-1 text-primary">
      {[0, 1, 2, 3, 4].map((item) => (
        <Star key={item} className="size-4 fill-current" />
      ))}
    </div>
  )
}
