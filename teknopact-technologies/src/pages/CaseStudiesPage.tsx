import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { CaseStudiesShowcase } from "@/components/sections/CaseStudiesShowcase"

export function CaseStudiesPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SiteHeader />
      <main className="w-full">
        <CaseStudiesShowcase />
      </main>
      <SiteFooter />
    </div>
  )
}
