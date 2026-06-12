import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const homePageImport = () => import("@/pages/HomePage")
const homeBelowFoldImport = () => import("@/components/sections/home/below-fold")
const productsPageImport = () => import("@/pages/ProductsPage")
const caseStudiesPageImport = () => import("@/pages/CaseStudiesPage")

export function prefetchHomeRoute() {
  void homePageImport()
  void homeBelowFoldImport()
}

function prefetchForPath(pathname: string) {
  if (pathname !== "/") {
    prefetchHomeRoute()
  }
  if (!pathname.startsWith("/products")) {
    void productsPageImport()
  }
  if (pathname !== "/case-studies") {
    void caseStudiesPageImport()
  }
}

export function RoutePrefetch() {
  const { pathname } = useLocation()

  useEffect(() => {
    prefetchForPath(pathname)
  }, [pathname])

  return null
}
