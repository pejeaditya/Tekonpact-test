import { Navigate, useSearchParams } from "react-router-dom"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { ProductsShowcase } from "@/components/sections/ProductsShowcase"

export function ProductsPage() {
  const [searchParams] = useSearchParams()

  if (searchParams.get("tab") === "services") {
    return <Navigate to="/services" replace />
  }

  return (
    <div className="relative min-h-screen w-full bg-transparent text-foreground">
      <div className="relative z-10">
        <SiteHeader />
        <main className="w-full">
          <ProductsShowcase mode="products" />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
