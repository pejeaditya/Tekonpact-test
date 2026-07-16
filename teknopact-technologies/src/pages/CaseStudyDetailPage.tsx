import { Navigate, useParams } from "react-router-dom"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { CaseStudyArticle } from "@/components/sections/case-study-article"
import { PageParticles } from "@/components/ui/page-particles"
import { getCaseStudyById } from "@/lib/case-studies"

export function CaseStudyDetailPage() {
  const { studyId } = useParams<{ studyId: string }>()
  const study = studyId ? getCaseStudyById(studyId) : undefined

  if (!study) {
    return <Navigate to="/case-studies" replace />
  }

  return (
    <div className="relative min-h-screen w-full bg-transparent text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0">
        <PageParticles />
      </div>
      <div className="relative z-10">
        <SiteHeader />
        <main className="w-full">
          <CaseStudyArticle study={study} />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
