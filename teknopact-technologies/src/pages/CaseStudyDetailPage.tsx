import { Navigate, useParams } from "react-router-dom"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import { CaseStudyArticle } from "@/components/sections/case-study-article"
import { getCaseStudyById } from "@/lib/case-studies"

export function CaseStudyDetailPage() {
  const { studyId } = useParams<{ studyId: string }>()
  const study = studyId ? getCaseStudyById(studyId) : undefined

  if (!study) {
    return <Navigate to="/case-studies" replace />
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <SiteHeader />
      <main className="w-full">
        <CaseStudyArticle study={study} />
      </main>
      <SiteFooter />
    </div>
  )
}
