import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

import { AppLink } from "@/components/app-link"
import { prefetchHomeRoute } from "@/components/route-prefetch"
import { DesktopMainNav, MobileMainNav } from "@/components/layout/MainNavMenu"
import { Button } from "@/components/ui/button"
import { HeroParallax, HeroParallaxHeader } from "@/components/ui/hero-parallax"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { brand } from "@/lib/brand"
import { company, heroParallaxProducts } from "@/lib/content"

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
          <ThemeToggle />
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

export function HeroSection() {
  return (
    <section id="home" className="relative bg-background">
      <HeroParallaxNav />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-background sm:h-52"
        aria-hidden
      />
      <HeroParallax
        products={heroParallaxProducts}
        header={
          <HeroParallaxHeader
            badge={company.tagline}
            title={company.heroTitle}
            subtitle={company.heroSubtitle}
            className="!pb-2 pt-24 md:!pb-4 md:pt-28"
            actions={
              <>
                <Button asChild className="rounded-full">
                  <AppLink href="/#contact">Contact Us</AppLink>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-border bg-muted/60">
                  <AppLink href="/products?tab=services">Our Services</AppLink>
                </Button>
              </>
            }
          />
        }
      />
    </section>
  )
}
