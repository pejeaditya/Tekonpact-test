"use client"

import { useState } from "react"
import { Menu, Sparkles, X } from "lucide-react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavigationItem {
  name: string
  href: string
}

interface AnnouncementBanner {
  text: string
  linkText: string
  linkHref: string
}

interface CallToAction {
  text: string
  href: string
  variant: "primary" | "secondary"
}

interface HeroLandingProps {
  logo?: {
    src?: string
    alt: string
    companyName: string
  }
  navigation?: NavigationItem[]
  loginText?: string
  loginHref?: string
  title: string
  description: string
  announcementBanner?: AnnouncementBanner
  callToActions?: CallToAction[]
  titleSize?: "small" | "medium" | "large"
  gradientColors?: {
    from: string
    to: string
  }
  className?: string
}

const defaultProps: Partial<HeroLandingProps> = {
  logo: {
    alt: "Company Logo",
    companyName: "Your Company",
  },
  navigation: [
    { name: "Product", href: "#" },
    { name: "Features", href: "#" },
    { name: "Marketplace", href: "#" },
    { name: "Company", href: "#" },
  ],
  loginText: "Log in",
  loginHref: "#",
  titleSize: "large",
  gradientColors: {
    from: "oklch(0.68 0.11 73)",
    to: "oklch(0.23 0.02 80)",
  },
  callToActions: [
    { text: "Get started", href: "#", variant: "primary" },
    { text: "Learn more", href: "#", variant: "secondary" },
  ],
}

function LogoMark({ logo }: { logo?: HeroLandingProps["logo"] }) {
  return (
    <span className="inline-flex items-center gap-2">
      {logo?.src ? (
        <img alt={logo.alt} src={logo.src} className="h-6 w-auto sm:h-8" />
      ) : (
        <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
      )}
      <span className="font-semibold tracking-tight text-foreground">{logo?.companyName}</span>
    </span>
  )
}

export function HeroLanding(props: HeroLandingProps) {
  const {
    logo,
    navigation,
    loginText,
    loginHref,
    title,
    description,
    announcementBanner,
    callToActions,
    titleSize,
    gradientColors,
    className,
  } = { ...defaultProps, ...props }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getTitleSizeClasses = () => {
    switch (titleSize) {
      case "small":
        return "text-2xl sm:text-3xl md:text-5xl"
      case "medium":
        return "text-2xl sm:text-4xl md:text-6xl"
      case "large":
      default:
        return "text-3xl sm:text-5xl md:text-6xl"
    }
  }

  const creamPillClass = cn(
    buttonVariants({ variant: "creamPill", size: "pill" }),
    "inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
  )

  const renderCallToAction = (cta: CallToAction, index: number) => {
    if (cta.variant === "primary") {
      return (
        <a key={index} href={cta.href} className={creamPillClass}>
          {cta.text}
        </a>
      )
    }

    return (
      <a
        key={index}
        href={cta.href}
        className="text-xs font-semibold text-foreground transition-colors hover:text-muted-foreground sm:text-sm/6"
      >
        {cta.text} <span aria-hidden="true">→</span>
      </a>
    )
  }

  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden bg-background", className)}>
      {/* Stronger bronze wash on small screens — clipped SVG-style blobs read mostly black on narrow viewports */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 sm:hidden"
        style={{
          background: [
            `radial-gradient(ellipse 110% 60% at 50% 8%, color-mix(in oklch, ${gradientColors?.from} 42%, transparent), transparent 58%)`,
            `radial-gradient(ellipse 90% 55% at 50% 92%, color-mix(in oklch, ${gradientColors?.to} 32%, transparent), transparent 55%)`,
          ].join(","),
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-28 -z-0 min-h-screen transform-gpu overflow-hidden blur-2xl sm:-top-80 sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            background: `linear-gradient(to top right, ${gradientColors?.from}, ${gradientColors?.to})`,
          }}
          className="relative left-1/2 aspect-[1155/678] w-[min(44rem,115vw)] max-w-none -translate-x-1/2 rotate-[26deg] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] sm:rotate-[30deg] sm:opacity-30"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[52%] -z-0 min-h-screen transform-gpu overflow-hidden blur-2xl sm:top-[calc(100%-30rem)] sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            background: `linear-gradient(to top right, ${gradientColors?.from}, ${gradientColors?.to})`,
          }}
          className="relative left-1/2 aspect-[1155/678] w-[min(40rem,105vw)] max-w-none -translate-x-1/2 rotate-[26deg] opacity-45 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] sm:rotate-[30deg] sm:opacity-30"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent via-background/70 to-background"
      />

      <header className="absolute inset-x-0 top-0 z-10">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#home" className="-m-1.5 p-1.5">
              <span className="sr-only">{logo?.companyName}</span>
              <LogoMark logo={logo} />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
          {navigation && navigation.length > 0 && (
            <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm/6 font-semibold text-foreground transition-colors hover:text-muted-foreground"
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
          {loginText && loginHref && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a
                href={loginHref}
                className="text-sm/6 font-semibold text-foreground transition-colors hover:text-muted-foreground"
              >
                {loginText} <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </nav>
        <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DialogContent
            showCloseButton={false}
            className="fixed inset-y-0 right-0 left-auto top-0 z-50 h-full w-full max-w-full translate-x-0 translate-y-0 overflow-y-auto rounded-none border-l border-white/10 bg-card px-4 py-4 sm:max-w-sm sm:px-6 sm:py-6 lg:hidden"
          >
            <DialogTitle className="sr-only">Mobile navigation</DialogTitle>
            <div className="flex items-center justify-between">
              <a href="#home" className="-m-1.5 p-1.5">
                <span className="sr-only">{logo?.companyName}</span>
                <LogoMark logo={logo} />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-border">
                {navigation && navigation.length > 0 && (
                  <div className="flex flex-col gap-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
                {loginText && loginHref && (
                  <div className="py-6">
                    <a
                      href={loginHref}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(creamPillClass, "w-full justify-center")}
                    >
                      {loginText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-4">
        <div className="mx-auto max-w-4xl pt-20 sm:pt-25">
          {announcementBanner && (
            <div className="hidden sm:mb-2 sm:flex sm:justify-center">
              <div className="relative rounded-full bg-primary/10 px-3 py-1 text-xs text-muted-foreground ring-1 ring-primary/20 transition-all hover:ring-primary/40 sm:text-sm/6">
                {announcementBanner.text}{" "}
                <a
                  href={announcementBanner.linkHref}
                  className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  {announcementBanner.linkText} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          )}

          <div className="text-center">
            <h1 className={cn(getTitleSizeClasses(), "text-balance font-['Geist_Variable'] font-semibold tracking-tight text-foreground")}>
              {title}
            </h1>
            <p className="mt-6 text-pretty text-base font-medium text-muted-foreground sm:mt-8 sm:text-xl/8">
              {description}
            </p>

            {callToActions && callToActions.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-x-4 sm:mt-10 sm:gap-x-6">
                {callToActions.map((cta, index) => renderCallToAction(cta, index))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export type { HeroLandingProps, NavigationItem, AnnouncementBanner, CallToAction }
