import { Globe2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react"
import { Link } from "react-router-dom"

import { AppLink } from "@/components/app-link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { brand } from "@/lib/brand"
import { company } from "@/lib/content"

const footerLinks = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Presence", href: "/#presence" },
  { label: "Team", href: "/#team" },
  { label: "Case Studies", href: "/case-studies" },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-background/85 backdrop-blur-md">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklch,var(--primary)_34%,transparent),transparent_28rem),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/85 to-transparent sm:h-40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background/85 sm:h-40"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 sm:py-20">
          <p className="text-sm text-primary">Thank you for visiting Teknopact</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Step into the future with intelligent IT solutions.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-foreground/70">
            {company.tagline} — let&apos;s discuss advisory, ERP, managed services, or digital transformation for your organization.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              <a href={`mailto:${company.email}`}>Email Us</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-border bg-muted/60">
              <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex flex-col gap-3">
              <img
                src={brand.logo.src}
                alt={brand.logo.alt}
                className="h-8 w-auto max-w-[12rem] object-contain object-left"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{company.description}</p>
            <div className="mt-6 flex gap-2">
              {[Globe2, MessageCircle, Send, Mail].map((Icon, index) => (
                <Button key={index} variant="outline" size="icon" className="rounded-full border-border bg-muted/60">
                  <Icon className="size-4" />
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground">Quick links</h3>
            <div className="mt-4 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <AppLink
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </AppLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground">Contact</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm leading-6 text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-primary" />
                {company.location}
              </span>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 hover:text-foreground">
                <Mail className="size-4 shrink-0 text-primary" />
                {company.email}
              </a>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-foreground">
                <Phone className="size-4 shrink-0 text-primary" />
                {company.phone}
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />
        <div className="flex flex-col gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-5">
            <AppLink href="/">Terms of Service</AppLink>
            <AppLink href="/">Privacy Policy</AppLink>
          </div>
          <p>© 2026 {company.name}. All rights reserved.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -z-0 -translate-x-1/2 text-[12rem] font-black tracking-tighter text-foreground/[0.04] sm:text-[18rem]">
        Teknopact
      </div>
    </footer>
  )
}
