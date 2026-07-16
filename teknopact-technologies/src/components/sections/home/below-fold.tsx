import type { ReactNode } from "react"
import { FileText, Package, Wrench } from "lucide-react"
import { motion } from "motion/react"

import { AppLink } from "@/components/app-link"
import { CaseStudyCard } from "@/components/sections/case-study-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularTestimonials } from "@/components/ui/circular-testimonials"
import { InteractiveImageAccordion } from "@/components/ui/interactive-image-accordion"
import { LogoMarquee } from "@/components/ui/logo-marquee"
import { OfferingsCarousel } from "@/components/ui/offerings-carousel"
import { ProductsShowcaseSlider } from "@/components/ui/products-showcase-slider"
import { WorldMap } from "@/components/ui/map"
import { getAllCaseStudies } from "@/lib/case-studies"
import {
  caseStudiesPageIntro,
  expertisePillars,
  faqs,
  keyClientLogos,
  presenceMapDots,
  serviceClusters,
  teamCircularTestimonials,
  whyTeknopactAccordionItems,
} from "@/lib/content"
import { cn } from "@/lib/utils"

type HomeBandVariant = "primary" | "neutral"

function HomeSectionBand({
  variant,
  id,
  className,
  children,
}: {
  variant: HomeBandVariant
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-24",
        variant === "primary" ? "home-band-primary" : "home-band-neutral",
        className
      )}
    >
      {children}
    </section>
  )
}

const offerings = [
  {
    icon: Package,
    title: "Products",
    description:
      "A curated catalog spanning AI, IoT, cybersecurity, and specialized vertical solutions from leading vendors.",
    highlights: [
      "65+ products across 5 categories — AI & Automation, Enterprise Strategy, IoT, Cyber, Specialized Verticals",
      "Curated catalog of leading vendor technologies ready for deployment",
      "Every product paired with the right implementation path for your constraints",
    ],
    cta: "See details",
    href: "/products",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&h=500&q=80",
    theme: {
      accent: "text-[#00b4d8] group-hover:text-[#0096c7]",
      borderHover: "hover:border-[#00b4d8]/40",
      shadowGlow: "0 20px 40px rgba(0, 180, 216, 0.15)",
      badgeBg: "bg-[#00b4d8]/10 border-[#00b4d8]/30",
      badgeText: "text-[#00b4d8]",
      checkBg: "bg-[#00b4d8]/10 group-hover:bg-[#00b4d8]/20",
      checkText: "text-[#00b4d8]",
    },
  },
  {
    icon: Wrench,
    title: "Services",
    description:
      "End-to-end capability across advisory, ERP, core banking, managed services, blockchain, and BPM.",
    highlights: [
      "6 service clusters covering ERP, Core Banking, Managed Services, Value Added, Blockchain & BPM",
      "33 specialized sub-services from advisory & PMO to implementation, testing, and support",
      "Consultants, architects, and engineers who simplify complexity and accelerate outcomes",
    ],
    cta: "See details",
    href: "/services",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&h=500&q=80",
    theme: {
      accent: "text-[#a2d2ff] group-hover:text-[#bde0fe]",
      borderHover: "hover:border-[#a2d2ff]/40",
      shadowGlow: "0 20px 40px rgba(162, 210, 255, 0.15)",
      badgeBg: "bg-[#a2d2ff]/10 border-[#a2d2ff]/30",
      badgeText: "text-[#a2d2ff]",
      checkBg: "bg-[#a2d2ff]/10 group-hover:bg-[#a2d2ff]/20",
      checkText: "text-[#a2d2ff]",
    },
  },
  {
    icon: FileText,
    title: "Case Studies",
    description:
      "Measurable outcomes across telecom, transportation, e-commerce, manufacturing, and enterprise AI.",
    highlights: [
      "30+ documented engagements with quantified impact — from £135M savings to 98% accuracy gains",
      "Deep coverage across Public Sector, Education, Healthcare, Telecom, Automotive, Manufacturing & Retail",
      "Each case maps a complex challenge → purpose-built solution → measurable result",
    ],
    cta: "See details",
    href: "/case-studies",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500&q=80",
    theme: {
      accent: "text-[#00b4d8] group-hover:text-[#0096c7]",
      borderHover: "hover:border-[#00b4d8]/40",
      shadowGlow: "0 20px 40px rgba(0, 180, 216, 0.15)",
      badgeBg: "bg-[#00b4d8]/10 border-[#00b4d8]/30",
      badgeText: "text-[#00b4d8]",
      checkBg: "bg-[#00b4d8]/10 group-hover:bg-[#00b4d8]/20",
      checkText: "text-[#00b4d8]",
    },
  },
]

export function HomeBelowFold() {
  return (
    <div className="home-below-fold relative">
      <div
        className="home-content-entry-fade pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-20"
        aria-hidden
      />
      <section className="home-why-teknopact-section relative overflow-hidden py-16 sm:pt-12 sm:pb-20 xl:py-24">
        <div className="home-section-bridge sm:h-48 xl:h-64" aria-hidden />
        <div className="relative z-[2] mx-auto max-w-7xl px-5 sm:px-8">
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

      <HomeSectionBand variant="neutral" id="offerings">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary">
            What we offer
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Three pillars of Teknopact
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Explore our product catalog, service capabilities, and real-world case studies—each a doorway into how we deliver impact.
          </p>
        </motion.div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <OfferingsCarousel offerings={offerings} />
        </div>
      </HomeSectionBand>

      <HomeSectionBand variant="primary" id="products-showcase" className="overflow-hidden">
        <ProductsShowcaseSlider
          clusters={serviceClusters}
          ctaLabel="Explore all services"
          ctaHref="/services"
          interval={6000}
        />
      </HomeSectionBand>

      <HomeSectionBand variant="primary" id="features">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="secondary" className="rounded-full border border-border bg-muted/60 text-muted-foreground">
              Our expertise
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Built for complex challenges
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The world economy is transforming through ICT and data—we simplify complexities and deliver intelligent solutions.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {expertisePillars.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="h-full"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <Card
                  className={cn(
                    "group h-full border-border teknopact-card-gradient transition-all duration-300",
                    "hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10",
                    index === 1 && "border-primary/30 bg-primary/10"
                  )}
                >
                  <CardHeader className="gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <feature.icon className="size-5" />
                    </span>
                    <CardTitle className="text-foreground transition-colors duration-300 group-hover:text-primary">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-6 text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    {feature.description}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </HomeSectionBand>

      <HomeSectionBand variant="neutral" id="presence">
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
      </HomeSectionBand>

{/*      <HomeSectionBand variant="neutral" id="industries">
        <IndustriesShowcase
          industries={sectorIndustries}
          badge="Industries"
          heading="Sectors we serve"
          subtitle="Deep domain expertise across government, enterprise, and specialized verticals—delivering measurable impact in every sector."
        />
      </HomeSectionBand>*/}

      <HomeSectionBand
        variant="primary"
        id="team"
        className="py-8 sm:py-16 md:py-24 max-md:max-h-[100dvh] max-md:overflow-hidden"
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
      </HomeSectionBand>

      <HomeSectionBand variant="neutral" id="case-studies">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary">
              Case studies
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Measurable outcomes at scale
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {caseStudiesPageIntro.headline}
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {getAllCaseStudies().slice(0, 9).map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <CaseStudyCard study={study} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" className="rounded-full border-border px-6">
              <AppLink href="/case-studies">Explore all {getAllCaseStudies().length} case studies</AppLink>
            </Button>
          </div>
        </div>
      </HomeSectionBand>

      <HomeSectionBand variant="primary" id="clients" className="overflow-hidden">
        <motion.div
          className="mx-auto mb-10 max-w-2xl px-5 text-center sm:mb-12 sm:px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary">
            Key clients
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Trusted by 200+ organizations
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            From pivotal government agencies to leading private enterprises across the GCC and beyond—a snapshot of the
            public and private sector clients we partner with.
          </p>
        </motion.div>
        <LogoMarquee logos={keyClientLogos} rows={3} />
      </HomeSectionBand>

      <HomeSectionBand variant="neutral" id="faq">
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
              <AppLink href="/#contact">Contact Teknopact</AppLink>
            </Button>
          </div>
          <Accordion type="single" collapsible className="rounded-3xl border border-border pl-7 pr-5 sm:pl-8 sm:pr-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </HomeSectionBand>
    </div>
  )
}
