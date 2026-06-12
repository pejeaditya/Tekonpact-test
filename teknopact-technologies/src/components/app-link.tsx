import type { ReactNode } from "react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

type AppLinkProps = {
  href: string
  className?: string
  children: ReactNode
  onClick?: () => void
}

/** Resolves hash-only links to home-page sections across routes. */
export function resolveAppHref(href: string) {
  if (href.startsWith("/") || href.startsWith("http")) return href
  if (href.startsWith("#")) return `/${href}`
  return href
}

export function isAppRoute(href: string) {
  const resolved = resolveAppHref(href)
  return resolved.startsWith("/")
}

export function AppLink({ href, className, children, onClick }: AppLinkProps) {
  const to = resolveAppHref(href)

  if (to.startsWith("http")) {
    return (
      <a href={to} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={cn(className)} onClick={onClick}>
      {children}
    </Link>
  )
}
