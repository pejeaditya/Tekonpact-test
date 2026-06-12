import { lazy, Suspense } from "react"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { HeroSection } from "@/components/sections/home/hero-section"

const HomeBelowFold = lazy(() =>
  import("@/components/sections/home/below-fold").then((m) => ({ default: m.HomeBelowFold }))
)

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <HeroSection />
        <Suspense fallback={<div className="min-h-[50vh]" aria-hidden />}>
          <HomeBelowFold />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
