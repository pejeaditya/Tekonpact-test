import { useSearchParams } from "react-router-dom"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { ProductsShowcase } from "@/components/sections/ProductsShowcase"
import { PageParticles } from "@/components/ui/page-particles"

export function ServicesPage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category") ?? undefined

  return (
    <div className="relative min-h-screen w-full bg-transparent text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0">
        <PageParticles />
      </div>
      <div className="relative z-10">
        <SiteHeader />
        <main className="w-full">
          <ProductsShowcase mode="services" defaultCategory={category} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
