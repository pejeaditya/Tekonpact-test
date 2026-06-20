import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown } from "lucide-react"

import { AppLink } from "@/components/app-link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navLinks, productMenuItems } from "@/lib/content"
import { cn } from "@/lib/utils"

function ServiceCategoryLabel({ title }: { title: string }) {
  return (
    <span className="relative inline-block">
      {title}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-[#62B6CB] transition-transform duration-500 ease-in-out group-hover/service-item:scale-x-100"
      />
    </span>
  )
}

const serviceDropdownLinkClassName =
  "group/service-item block rounded-lg p-3 text-sm font-normal text-foreground/90 no-underline transition-colors hover:bg-muted/60 hover:text-foreground"

type DesktopMainNavProps = {
  menuClassName?: string
  linkClassName?: string
  triggerClassName?: string
}

export function DesktopMainNav({
  menuClassName = "hidden md:flex",
  linkClassName = "rounded-lg px-3 py-2 text-sm font-semibold text-foreground/90 transition hover:bg-muted/60 hover:text-foreground",
  triggerClassName = "bg-transparent font-semibold text-foreground/90 hover:bg-muted/60 hover:text-foreground data-open:text-foreground data-popup-open:text-foreground",
}: DesktopMainNavProps) {
  return (
    <NavigationMenu className={menuClassName} viewport={false}>
      <NavigationMenuList className="gap-1">
        {navLinks.map((link) =>
          link.label === "Services" ? (
            <NavigationMenuItem key={link.label}>
              <NavigationMenuTrigger className={triggerClassName}>Services</NavigationMenuTrigger>
              <NavigationMenuContent className="w-auto min-w-[16rem] border border-border/30 bg-card/95 p-2 shadow-lg shadow-black/[0.06] ring-0">
                <div className="flex flex-col gap-1">
                  {productMenuItems.map((item) => (
                    <NavigationMenuLink key={item.id} asChild>
                      <Link
                        to={`/services?category=${item.id}`}
                        className={serviceDropdownLinkClassName}
                      >
                        <ServiceCategoryLabel title={item.title} />
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={link.label}>
              <NavigationMenuLink asChild>
                <Link to={link.href} className={linkClassName}>
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

type MobileMainNavProps = {
  linkClassName?: string
  serviceLinkClassName?: string
}

export function MobileMainNav({
  linkClassName = "rounded-lg px-3 py-3 text-sm font-semibold text-foreground hover:bg-muted/60 hover:text-foreground",
  serviceLinkClassName = "rounded-lg px-3 py-2.5 pl-6 text-sm font-normal text-foreground/90 no-underline hover:bg-muted/60 hover:text-foreground",
}: MobileMainNavProps) {
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <nav className="flex flex-col gap-2">
      {navLinks.map((link) =>
        link.label === "Services" ? (
          <div key={link.label}>
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={cn(
                linkClassName,
                "flex w-full items-center justify-between"
              )}
            >
              Services
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  servicesOpen ? "rotate-180" : ""
                )}
              />
            </button>
            {servicesOpen ? (
              <div className="mt-1 ml-2 flex flex-col gap-1 border-l-2 border-border/60 pl-2">
                {productMenuItems.map((item) => (
                  <AppLink
                    key={item.id}
                    href={`/services?category=${item.id}`}
                    className={cn(serviceLinkClassName, "group/service-item")}
                  >
                    <ServiceCategoryLabel title={item.title} />
                  </AppLink>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <AppLink key={link.label} href={link.href} className={linkClassName}>
            {link.label}
          </AppLink>
        )
      )}
    </nav>
  )
}
