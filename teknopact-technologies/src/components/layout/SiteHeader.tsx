import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

import { AppLink } from "@/components/app-link"
import { DesktopMainNav, MobileMainNav } from "@/components/layout/MainNavMenu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { prefetchHomeRoute } from "@/components/route-prefetch"
import { brand } from "@/lib/brand"

function BrandMark() {
  return (
    <Link
      to="/"
      className="flex items-center font-semibold tracking-tight"
      onMouseEnter={prefetchHomeRoute}
      onFocus={prefetchHomeRoute}
    >
      <img
        src={brand.logo.src}
        alt={brand.logo.alt}
        className="h-7 w-auto max-w-[10rem] object-contain object-left sm:h-8"
      />
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <BrandMark />
        <DesktopMainNav />
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90">
            <AppLink href="/#contact">Contact Us</AppLink>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-border bg-background">
            <SheetHeader>
              <SheetTitle>
                <BrandMark />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8">
              <MobileMainNav />
              <Button asChild className="mt-4 w-full rounded-full">
                <AppLink href="/#contact">Contact Us</AppLink>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
