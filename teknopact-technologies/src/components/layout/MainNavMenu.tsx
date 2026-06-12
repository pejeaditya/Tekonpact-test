import { Link } from "react-router-dom"

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

type DesktopMainNavProps = {
  menuClassName?: string
  linkClassName?: string
  triggerClassName?: string
}

export function DesktopMainNav({
  menuClassName = "hidden md:flex",
  linkClassName = "rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted/60 hover:text-foreground",
  triggerClassName = "bg-transparent text-muted-foreground hover:text-foreground",
}: DesktopMainNavProps) {
  return (
    <NavigationMenu className={menuClassName} viewport={false}>
      <NavigationMenuList className="gap-1">
        {navLinks.map((link) =>
          link.label === "Services" ? (
            <NavigationMenuItem key={link.label}>
              <NavigationMenuTrigger className={triggerClassName}>Services</NavigationMenuTrigger>
              <NavigationMenuContent className="w-auto min-w-[16rem] border border-border bg-card/95 p-2 shadow-2xl shadow-black/50">
                <div className="flex flex-col gap-1">
                  {productMenuItems.map((item) => (
                    <NavigationMenuLink key={item.title} asChild>
                      <Link
                        to="/services"
                        className="group flex items-center gap-3 rounded-lg p-3 text-sm font-medium text-foreground transition hover:bg-muted/60"
                      >
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted/60 text-primary">
                          <item.icon className="size-4" />
                        </span>
                        <span>{item.title}</span>
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
  linkClassName = "rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground",
  serviceLinkClassName = "rounded-lg px-3 py-2.5 pl-6 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground",
}: MobileMainNavProps) {
  return (
    <nav className="flex flex-col gap-2">
      {navLinks.map((link) =>
        link.label === "Services" ? (
          <div key={link.label} className="flex flex-col gap-1">
            <AppLink href="/services" className={cn(linkClassName, "font-medium text-foreground")}>
              Services
            </AppLink>
            {productMenuItems.map((item) => (
              <AppLink key={item.title} href="/services" className={serviceLinkClassName}>
                {item.title}
              </AppLink>
            ))}
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
