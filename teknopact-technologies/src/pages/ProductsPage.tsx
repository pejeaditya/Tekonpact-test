import { useSearchParams } from "react-router-dom"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { ProductsShowcase } from "@/components/sections/ProductsShowcase"

export function ProductsPage() {
  const [searchParams] = useSearchParams()
  const mode = searchParams.get("tab") === "services" ? "services" : "products"

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SiteHeader />
      <main className="w-full">
        <ProductsShowcase mode={mode} />
      </main>
      <SiteFooter />
    </div>
  )
}
