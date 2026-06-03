import { Menu } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { brand } from "@/lib/brand"
import { company, navLinks, productMenuItems } from "@/lib/content"

function BrandMark() {
  return (
    <a href="#home" className="flex items-center gap-3 font-semibold tracking-tight">
      <img
        src={brand.logo.src}
        alt={brand.logo.alt}
        className="h-7 w-auto max-w-[10rem] object-contain object-left sm:h-8"
      />
      <span className="hidden sm:inline">{company.shortName}</span>
    </a>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <BrandMark />

        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-[28rem] border border-border bg-card/95 p-2 shadow-2xl shadow-black/50">
                    <div className="flex flex-col gap-1">
                      {productMenuItems.map((item) => (
                        <NavigationMenuLink key={item.title} asChild>
                          <a href="#services" className="group flex items-start gap-3 p-3">
                            <span className="mt-0.5 grid size-8 place-items-center rounded-lg bg-muted/60 text-primary">
                              <item.icon className="size-4" />
                            </span>
                            <span>
                              <span className="block text-sm font-medium text-foreground">{item.title}</span>
                              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                {item.description}
                              </span>
                            </span>
                          </a>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink asChild>
                    <a
                      href={link.href}
                      className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90">
            <a href="#contact">Contact Us</a>
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
            <nav className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-4 rounded-full">
                <a href="#contact">Contact Us</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
