import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { PageLoader } from "@/components/page-loader"
import { RoutePrefetch } from "@/components/route-prefetch"
import { ScrollToHash } from "@/components/scroll-to-hash"

const HomePage = lazy(() => import("@/pages/HomePage").then((m) => ({ default: m.HomePage })))
const ProductsPage = lazy(() => import("@/pages/ProductsPage").then((m) => ({ default: m.ProductsPage })))
const ServicesPage = lazy(() => import("@/pages/ServicesPage").then((m) => ({ default: m.ServicesPage })))
const CaseStudiesPage = lazy(() =>
  import("@/pages/CaseStudiesPage").then((m) => ({ default: m.CaseStudiesPage }))
)

const CaseStudyDetailPage = lazy(() =>
  import("@/pages/CaseStudyDetailPage").then((m) => ({ default: m.CaseStudyDetailPage }))
)
const TeamPage = lazy(() => import("@/pages/TeamPage").then((m) => ({ default: m.TeamPage })))

import { PageParticles } from "@/components/ui/page-particles"

/** Mount a single global IntersectionObserver that fires text animations
 *  on every [data-animate] element across all pages.
 *  A MutationObserver watches for new elements added by lazy-loaded routes.
 */
function useTextAnimations() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            io.unobserve(entry.target) // fire once
          }
        })
      },
      { threshold: 0.12 }
    )

    const observe = () => {
      document.querySelectorAll("[data-animate]:not(.is-visible)").forEach((el) => io.observe(el))
    }

    observe()

    // Watch for DOM additions (lazy-loaded page content)
    const mo = new MutationObserver(observe)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

function App() {
  useTextAnimations()

  return (
    <>
      <ScrollToHash />
      <RoutePrefetch />
      <div className="pointer-events-none fixed inset-0 z-0">
        <PageParticles />
      </div>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:studyId" element={<CaseStudyDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
