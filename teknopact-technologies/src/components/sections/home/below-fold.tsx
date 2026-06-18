import type { ReactNode } from "react"
import { Quote } from "lucide-react"
import { motion } from "motion/react"

import { AppLink } from "@/components/app-link"
import { CaseStudyCard } from "@/components/sections/case-study-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularTestimonials } from "@/components/ui/circular-testimonials"
import { InteractiveImageAccordion } from "@/components/ui/interactive-image-accordion"
import { WorldMap } from "@/components/ui/map"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import { getAllCaseStudies } from "@/lib/case-studies"
import {
  caseStudiesPageIntro,
  customerTestimonials,
  expertisePillars,
  faqs,
  presenceMapDots,
  teamCircularTestimonials,
  testimonial,
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

export function HomeBelowFold() {
  const firstColumn = customerTestimonials.slice(0, 3)
  const secondColumn = customerTestimonials.slice(3, 6)
  const thirdColumn = customerTestimonials.slice(6, 9)

  return (
    <div className="relative -mt-28 bg-background pt-28 sm:-mt-36 sm:pt-36">
      <div
        className="home-content-entry-fade pointer-events-none absolute inset-x-0 -top-28 h-36 sm:-top-36 sm:h-44"
        aria-hidden
      />
      <section className="relative overflow-hidden bg-background py-16 sm:py-24">
        <div className="home-section-bridge sm:h-64" aria-hidden />
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
            {getAllCaseStudies().slice(0, 6).map((study, index) => (
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

      <HomeSectionBand variant="primary">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Quote className="mx-auto size-10 text-primary" />
          <blockquote className="mt-6 text-balance text-2xl font-medium leading-tight text-foreground sm:text-3xl">
            &ldquo;{testimonial.quote}&rdquo;
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
      </HomeSectionBand>

      <HomeSectionBand variant="primary" className="overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto flex max-w-[540px] flex-col items-center justify-center text-center">
            <Badge variant="secondary" className="rounded-full border border-primary/20 bg-primary/10 text-primary">
              Customer testimonials
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Satisfied clients across the region
            </h2>
          </div>

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
          <Accordion type="single" collapsible className="rounded-3xl border border-border px-5">
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
