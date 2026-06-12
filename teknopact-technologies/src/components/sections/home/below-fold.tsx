import { Quote } from "lucide-react"

import { AppLink } from "@/components/app-link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularTestimonials } from "@/components/ui/circular-testimonials"
import { InteractiveImageAccordion } from "@/components/ui/interactive-image-accordion"
import { WorldMap } from "@/components/ui/map"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import {
  customerTestimonials,
  expertisePillars,
  faqs,
  presenceMapDots,
  teamCircularTestimonials,
  testimonial,
  whyTeknopactAccordionItems,
} from "@/lib/content"
import { cn } from "@/lib/utils"

export function HomeBelowFold() {
  const firstColumn = customerTestimonials.slice(0, 3)
  const secondColumn = customerTestimonials.slice(3, 6)
  const thirdColumn = customerTestimonials.slice(6, 9)

  return (
    <div className="relative bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-muted/20 to-background sm:h-40"
        aria-hidden
      />
      <section className="relative bg-background py-16 sm:py-24">
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

      <section id="features" className="py-16 sm:py-24">
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

      <section id="presence" className="py-16 sm:py-24">
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

      <section
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
      </section>

      <section className="py-16 sm:py-24">
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
      </section>

      <section className="relative overflow-hidden bg-background py-16 sm:py-24">
        <div className="absolute inset-x-0 top-1/4 h-72 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_42rem)]" />
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
      </section>

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
      </section>
    </div>
  )
}
