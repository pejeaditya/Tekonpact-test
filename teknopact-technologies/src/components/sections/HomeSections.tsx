import { useEffect, useRef, useState, type RefObject } from "react"
import { motion } from "motion/react"
import {
  CirclePlay,
  Quote,
  Star,
} from "lucide-react"

import { DashboardPreview } from "@/components/dashboard/DashboardPreview"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroLanding } from "@/components/ui/hero-1"
import SectionWithMockup from "@/components/ui/section-with-mockup"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import {
  blogPreview,
  company,
  faqs,
  features,
  partnerNames,
  productClusters,
  stats,
  steps,
  testimonial,
} from "@/lib/content"
import type { ProductCluster, ProductShowcaseSlide } from "@/lib/content"
import { cn } from "@/lib/utils"

const customerTestimonials = [
  {
    text: "Teknopact helped us turn a scattered operation into a clean digital workflow. The team understood the business problem before writing code.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementation was fast, focused, and easy for our team to adopt. The interface felt polished from the first review.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "Their support during setup was excellent. We always knew what was being built, why it mattered, and what came next.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    name: "Saman Malik",
    role: "Customer Success Lead",
  },
  {
    text: "The automation layer removed hours of repetitive work every week and gave our leadership team a better view of performance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Teknopact delivered a product experience that looked premium and worked reliably across our internal teams.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The discovery process was sharp. They helped us simplify requirements and launch a version that users actually wanted.",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our website and product flows became clearer, faster, and easier to manage after the redesign.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They translated our idea into a structured platform and kept every sprint practical and transparent.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=120&q=80",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "The final product gave us a stronger online presence and a much smoother customer journey.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=80",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
]

function ProductShowcaseGallery({ slides }: { slides: ProductShowcaseSlide[] }) {
  if (slides.length === 0) return null
  const looped = [...slides, ...slides]
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-10"
        />
        <div className="flex w-max animate-teknopact-marquee gap-2 py-2 pl-2 pr-2 hover:[animation-play-state:paused] sm:gap-3 sm:py-3 sm:pl-3 sm:pr-3">
          {looped.map((slide, index) => (
            <img
              key={`${slide.src}-${slide.label}-${index}`}
              src={slide.src}
              alt={slide.label}
              className="h-24 w-[11.5rem] shrink-0 rounded-lg object-cover ring-1 ring-white/10 sm:h-28 sm:w-44"
              loading="lazy"
            />
          ))}
        </div>
        <p className="sr-only">Product interface samples scrolling horizontally</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {slides.map((slide, i) => (
          <figure
            key={`${slide.label}-${i}`}
            className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg shadow-black/30"
          >
            <div className="relative aspect-[16/10] w-full bg-white/[0.04]">
              <img
                src={slide.src}
                alt={slide.label}
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <figcaption className="border-t border-white/10 px-3 py-2.5 text-xs font-medium leading-snug text-muted-foreground">
              {slide.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

function ClusterTopRail({
  clusters,
  activeClusterId,
  onSelectCluster,
  scrollRef,
  onInteractionPauseChange,
}: {
  clusters: ProductCluster[]
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
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Product clusters</p>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent] sm:pb-2"
      >
        {clusters.map((cluster) => (
          <button
            key={cluster.id}
            type="button"
            onClick={() => onSelectCluster(cluster.id)}
            className={cn(
              "flex min-w-[9.5rem] shrink-0 items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-sm transition sm:min-w-0 sm:px-4",
              activeClusterId === cluster.id
                ? "border-primary/45 bg-primary/12 text-white shadow-[0_0_0_1px_rgba(213,165,86,0.12)]"
                : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
            )}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/5 text-primary">
              <cluster.icon className="size-4" />
            </span>
            <span className="font-medium leading-snug">{cluster.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="home">
      <HeroLanding
        logo={{
          alt: `${company.shortName} logo`,
          companyName: company.shortName,
        }}
        navigation={[
          { name: "Product", href: "#products" },
          { name: "Features", href: "#features" },
          { name: "How it works", href: "#how-it-works" },
          { name: "Testimonials", href: "#pricing" },
          { name: "FAQ", href: "#faq" },
        ]}
        loginText="Get Started"
        loginHref="#contact"
        title="Customized digital solutions for ambitious teams."
        description={company.description}
        announcementBanner={{
          text: "Your tech sorted for the next digital chapter.",
          linkText: "Explore products",
          linkHref: "#products",
        }}
        callToActions={[
          { text: "Get Started", href: "#contact", variant: "primary" },
          { text: "Explore Services", href: "#products", variant: "secondary" },
        ]}
        titleSize="large"
        gradientColors={{
          from: "oklch(0.72 0.12 74)",
          to: "oklch(0.18 0.02 82)",
        }}
      />
    </section>
  )
}

export function ProductTabsSection() {
  const clusters = productClusters
  const initialCluster = clusters[0]
  const [activeClusterId, setActiveClusterId] = useState(initialCluster.id)
  const [activeSubProductId, setActiveSubProductId] = useState(initialCluster.products[0].id)
  const clusterScrollRef = useRef<HTMLDivElement>(null)
  const [pauseClusterAutoScroll, setPauseClusterAutoScroll] = useState(false)

  const activeCluster = clusters.find((c) => c.id === activeClusterId) ?? initialCluster
  const selectedSubProduct =
    activeCluster.products.find((p) => p.id === activeSubProductId) ?? activeCluster.products[0]

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
    const firstSub = next?.products[0]
    if (firstSub) setActiveSubProductId(firstSub.id)
  }

  return (
    <section id="products" className="relative -mt-8 border-b border-white/10 bg-gradient-to-b from-background via-black/50 to-black/40 pt-24 pb-16 sm:-mt-12 sm:pt-28 sm:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 max-w-3xl">
          <Badge variant="secondary" className="rounded-full border border-white/10 bg-white/5 text-muted-foreground">
            Idea products
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Choose a cluster, then open the app you want to explore.
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
            Pick a cluster, then an app: each one opens the same gallery layout—a scrolling filmstrip plus a grid—with
            stock photography everywhere except Intangible, which uses your real product shots from{" "}
            <span className="text-white/80">public/intangible/</span>.
          </p>
        </div>

        <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 sm:p-5">
          <ClusterTopRail
            clusters={clusters}
            activeClusterId={activeClusterId}
            onSelectCluster={handleSelectCluster}
            scrollRef={clusterScrollRef}
            onInteractionPauseChange={setPauseClusterAutoScroll}
          />
        </div>

        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)] lg:items-stretch">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-3">
            <p className="px-3 pb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Apps in this cluster</p>
            <div className="grid gap-2">
              {activeCluster.products.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSubProductId(item.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border border-transparent p-4 text-left transition",
                    activeSubProductId === item.id
                      ? "border-primary/40 bg-primary/10 text-white"
                      : "bg-white/[0.03] text-muted-foreground hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                  )}
                >
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-white/5 text-primary">
                    <item.icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{item.title}</span>
                    {item.sector ? <span className="mt-1 block text-xs text-primary">{item.sector}</span> : null}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_15%_0%,rgba(213,165,86,0.22),transparent_28rem)]">
            <SectionWithMockup
              embedded
              embeddedCopyCentered
              title={selectedSubProduct.title}
              description={
                <>
                  <p>{selectedSubProduct.description}</p>
                  {selectedSubProduct.audiences?.length ? (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {selectedSubProduct.audiences.map((audience) => (
                        <Badge
                          key={audience}
                          variant="outline"
                          className="rounded-full border-white/10 bg-white/[0.03] text-xs text-muted-foreground"
                        >
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </>
              }
              secondaryImageSrc={selectedSubProduct.showcaseSlides[0]?.src}
              mockup={
                <div
                  className={cn(
                    "max-h-[80vh] min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain",
                    "teknopact-scrollbar"
                  )}
                >
                  <ProductShowcaseGallery slides={selectedSubProduct.showcaseSlides} />
                </div>
              }
              className="bg-transparent px-3 py-6 sm:px-5 sm:py-7"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function TrustedBySection() {
  return (
    <section className="border-b border-white/10 py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm text-muted-foreground">Trusted by teams building across MENA</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-3">
              {partnerNames.map((name) => (
                <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-xs text-muted-foreground">
                  {name}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-4xl font-semibold tracking-tight text-white">{stat.value}</p>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-white/10 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <DashboardPreview compact variant="Optimization" />
        <div>
          <Badge variant="secondary" className="rounded-full border border-white/10 bg-white/5 text-muted-foreground">
            Built for the future of AI-enabled teams
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            We connect business strategy with dependable engineering.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Teknopact brings the pace of rapid software development together with the care needed for secure, scalable digital products.
          </p>
          <div className="mt-8 grid gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-medium text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function VideoSection() {
  return (
    <section className="border-b border-white/10 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <AspectRatio ratio={16 / 7} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_25%,rgba(213,165,86,0.42),transparent_20rem),linear-gradient(135deg,#15110b,#070707)]">
          <div className="flex h-full items-center justify-center">
            <Button size="icon" className="size-16 rounded-full bg-white text-black hover:bg-white/90" aria-label="Play video">
              <CirclePlay className="size-8" />
            </Button>
          </div>
        </AspectRatio>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-b border-white/10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="text-sm text-primary">How it works</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          A clear path from idea to launch.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className={cn("border-white/10 bg-white/[0.03] text-left", index === 1 && "border-primary/50 bg-primary/10")}>
              <CardHeader>
                <div className="mb-8 grid size-11 place-items-center rounded-2xl bg-white/8 text-primary">
                  <step.icon className="size-5" />
                </div>
                <CardTitle className="text-white">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">{step.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialSection() {
  return (
    <section className="border-b border-white/10 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Quote className="mx-auto size-10 text-primary" />
        <blockquote className="mt-6 text-balance text-2xl font-medium leading-tight text-white sm:text-4xl">
          “{testimonial.quote}”
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">AR</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium text-white">{testimonial.name}</p>
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
    <section id="pricing" className="relative overflow-hidden border-b border-white/10 bg-background py-16 sm:py-24">
      <div className="absolute inset-x-0 top-1/4 h-72 bg-[radial-gradient(circle_at_center,rgba(213,165,86,0.18),transparent_42rem)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center justify-center text-center"
        >
          <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary">
            Testimonials
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            What our users say
          </h2>
          <p className="mt-5 text-sm leading-6 text-muted-foreground sm:text-base">
            See how teams use Teknopact to turn digital strategy, automation, and custom software into measurable results.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  )
}

export function BlogPreviewSection() {
  return (
    <section className="border-b border-white/10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-primary">Latest insight</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Ideas for modern teams.</h2>
          </div>
          <Button variant="outline" className="w-fit rounded-full border-white/10 bg-white/5">View all</Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {blogPreview.map((post, index) => (
            <Card key={post.title} className="overflow-hidden border-white/10 bg-white/[0.03]">
              <div className={cn("h-44 bg-gradient-to-br", index === 0 && "from-blue-950 via-zinc-900 to-amber-900", index === 1 && "from-zinc-800 via-black to-amber-800", index === 2 && "from-amber-900 via-zinc-950 to-zinc-800")} />
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground">// {post.category}</p>
                <h3 className="mt-3 text-lg font-medium leading-tight text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.description}</p>
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
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Questions before we begin?
          </h2>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Send us your idea, current workflow, or website goal and we will help shape the first practical next step.
          </p>
          <Button asChild variant="creamPill" size="pill" className="mt-7">
            <a href="#contact">Contact Teknopact</a>
          </Button>
        </div>
        <Accordion type="single" collapsible className="rounded-3xl border border-white/10 px-5">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`} className="border-white/10">
              <AccordionTrigger className="text-left text-white">{faq.question}</AccordionTrigger>
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
