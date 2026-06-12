import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import { PageLoader } from "@/components/page-loader"
import { RoutePrefetch } from "@/components/route-prefetch"
import { ScrollToHash } from "@/components/scroll-to-hash"

const HomePage = lazy(() => import("@/pages/HomePage").then((m) => ({ default: m.HomePage })))
const ProductsPage = lazy(() => import("@/pages/ProductsPage").then((m) => ({ default: m.ProductsPage })))
const CaseStudiesPage = lazy(() =>
  import("@/pages/CaseStudiesPage").then((m) => ({ default: m.CaseStudiesPage }))
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
          <Route path="/case-studies" element={<CaseStudiesPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
