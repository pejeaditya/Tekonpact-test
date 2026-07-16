import { useSearchParams } from "react-router-dom"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { CaseStudiesShowcase } from "@/components/sections/CaseStudiesShowcase"

export function CaseStudiesPage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category") ?? undefined
  const study = searchParams.get("study") ?? undefined

  return (
    <div className="relative min-h-screen w-full bg-transparent text-foreground">
      <div className="relative z-10">
        <SiteHeader />
        <main className="w-full">
          <CaseStudiesShowcase defaultCategory={category} defaultStudy={study} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
