import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { ProductsShowcase } from "@/components/sections/ProductsShowcase"

export function ServicesPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SiteHeader />
      <main className="w-full">
        <ProductsShowcase mode="services" />
      </main>
      <SiteFooter />
    </div>
  )
}
