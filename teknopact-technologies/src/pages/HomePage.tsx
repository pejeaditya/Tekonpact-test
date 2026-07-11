import { lazy, Suspense } from "react"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { HeroSection } from "@/components/sections/home/hero-section"
import { Hero3DScene } from "@/components/ui/hero-3d-scene"

const HomeBelowFold = lazy(() =>
  import("@/components/sections/home/below-fold").then((m) => ({ default: m.HomeBelowFold }))
)

export function HomePage() {
  return (
    <div className="relative min-h-screen bg-transparent text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0">
        <Hero3DScene />
      </div>
      <div className="relative z-10">
        <main>
          <HeroSection />
          <Suspense fallback={<div className="min-h-[50vh]" aria-hidden />}>
            <HomeBelowFold />
          </Suspense>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
