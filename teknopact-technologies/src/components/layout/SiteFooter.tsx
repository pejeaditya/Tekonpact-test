import { Globe2, Mail, MessageCircle, Send, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { company } from "@/lib/content"

const footerLinks = [
  { label: "About", href: "#features" },
  { label: "Products", href: "#products" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(213,165,86,0.34),transparent_28rem),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-6 py-14 text-center shadow-2xl shadow-black/40 sm:px-10">
          <p className="text-sm text-primary">Ready when your team is.</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Step into the future with custom digital solutions.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70">
            Tell us what you are building, automating, or improving. We will help you sort the tech and move with focus.
          </p>
          <Button asChild className="mt-8 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
            <a href={`mailto:${company.email}`}>Get Started</a>
          </Button>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-2 font-semibold">
              <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              {company.shortName}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              {company.description}
            </p>
            <div className="mt-6 flex gap-2">
              {[Globe2, MessageCircle, Send, Mail].map((Icon, index) => (
                <Button key={index} variant="outline" size="icon" className="rounded-full border-white/10 bg-white/5">
                  <Icon className="size-4" />
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">Quick links</h3>
            <div className="mt-4 grid gap-3">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">Address</h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {company.location}
              <br />
              {company.email}
            </p>
          </div>
        </div>

        <Separator className="bg-white/10" />
        <div className="flex flex-col gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-5">
            <a href="#home">Terms of Service</a>
            <a href="#home">Privacy Policy</a>
          </div>
          <p>© 2026 {company.shortName}. All rights reserved.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -z-0 -translate-x-1/2 text-[12rem] font-black tracking-tighter text-white/[0.025] sm:text-[18rem]">
        Teknopact
      </div>
    </footer>
  )
}
