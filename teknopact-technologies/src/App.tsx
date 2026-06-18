import { lazy, Suspense } from "react"
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

function App() {
  return (
    <>
      <ScrollToHash />
      <RoutePrefetch />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:studyId" element={<CaseStudyDetailPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
