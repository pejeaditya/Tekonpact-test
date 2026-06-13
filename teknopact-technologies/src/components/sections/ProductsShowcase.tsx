import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown, ChevronRight, Search, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { productsPageIntro, servicesPageIntro } from "@/lib/content"
import type { ShowcaseItem } from "@/lib/catalog-showcase"
import {
  buildProductShowcaseItems,
  buildServiceShowcaseItems,
  getProductShowcaseCategories,
  getServiceShowcaseCategories,
} from "@/lib/catalog-showcase"
import { cn } from "@/lib/utils"

type CatalogMode = "products" | "services"

const modeCopy: Record<
  CatalogMode,
  { title: string; searchPlaceholder: string; intro: { headline: string; body: string } }
> = {
  products: {
    title: "Products",
    searchPlaceholder: "Search products, categories, or capabilities...",
    intro: productsPageIntro,
  },
  services: {
    title: "Services",
    searchPlaceholder: "Search services, clusters, or capabilities...",
    intro: servicesPageIntro,
  },
}

const catalogByMode = {
  products: {
    categories: getProductShowcaseCategories(),
    items: buildProductShowcaseItems(),
  },
  services: {
    categories: getServiceShowcaseCategories(),
    items: buildServiceShowcaseItems(),
  },
} as const

function useCatalogData(mode: CatalogMode) {
  return useMemo(() => catalogByMode[mode], [mode])
}

export function ProductsShowcase({ mode }: { mode: CatalogMode }) {
  const { categories, items } = useCatalogData(mode)
  const copy = modeCopy[mode]

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null)
  const [visibleCount, setVisibleCount] = useState(8)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedCategory("all")
    setSearchQuery("")
    setSelectedItem(null)
    setVisibleCount(8)
  }, [mode])

  useEffect(() => {
    setVisibleCount(8)
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedItem])

  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase()
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.categoryName.toLowerCase().includes(query) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      item.features.some((feature) => feature.toLowerCase().includes(query))

    return matchesCategory && matchesSearch
  })

  const visibleItems = filteredItems.slice(0, visibleCount)
  const hasMore = visibleCount < filteredItems.length

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-background">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklch,var(--primary)_34%,transparent),transparent_28rem),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background sm:h-40"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-14 text-center sm:px-10 sm:py-20 lg:px-12">
          <p className="text-sm text-primary">
            {mode === "products" ? "Enterprise product catalog" : "End-to-end service offerings"}
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-foreground/80 sm:text-lg sm:leading-8">
            {copy.intro.headline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            {copy.intro.body}
          </p>

          <div className="group relative mx-auto mt-10 max-w-2xl">
            <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-primary" />
            <Input
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="rounded-2xl border border-border bg-background py-6 pr-6 pl-14 text-base text-foreground shadow-sm transition-all duration-300 focus:ring-2 focus:ring-primary sm:text-lg"
            />
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-6 py-4 sm:px-10 lg:px-12">
          <div className="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "shrink-0 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              All ({items.length})
            </button>

            {categories.map((category) => {
              const Icon = category.icon
              const count = items.filter((item) => item.category === category.id).length

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>
                    {category.name} ({count})
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-12 pb-20 sm:px-10 lg:px-12">
        <p className="mb-8 text-lg text-muted-foreground">
          Showing{" "}
          <span className="text-2xl font-bold text-primary">
            {visibleItems.length}
            {hasMore ? ` of ${filteredItems.length}` : ""}
          </span>{" "}
          {mode}
          {searchQuery ? (
            <span>
              {" "}
              matching &quot;<span className="font-semibold text-primary">{searchQuery}</span>&quot;
            </span>
          ) : null}
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {visibleItems.map((item) => {
            const Icon = item.icon

            return (
              <article
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    setSelectedItem(item)
                  }
                }}
                className="group relative flex cursor-pointer flex-col rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:z-10 hover:-translate-y-0.5 hover:border-border hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              >
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <Badge className="rounded-full border-0 bg-foreground px-2.5 py-0.5 text-[0.65rem] font-medium text-background">
                        {mode === "products" ? "Product" : "Service"}
                      </Badge>
                      <div className="rounded-xl border border-border/60 bg-muted/40 p-2">
                        <Icon className="h-4 w-4 text-foreground/80" />
                      </div>
                    </div>

                    <p className="mt-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Teknopact · {item.categoryName}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-snug text-foreground transition-[color] duration-300 group-hover:line-clamp-none sm:text-[1.35rem]">
                      {item.name}
                    </h3>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground transition-[color] duration-300 group-hover:line-clamp-none">
                      {item.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-all group-hover:gap-2">
                      View details
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
              </article>
            )
          })}
        </div>

        {hasMore ? (
          <div className="mt-10 text-center">
            <Button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="group rounded-full px-8 py-6 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
            >
              Show More
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
          </div>
        ) : null}

        {filteredItems.length === 0 ? (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-6 h-20 w-20 text-primary/30" />
            <h3 className="mb-3 text-3xl font-bold">No {mode} found</h3>
            <p className="mb-8 text-lg text-muted-foreground">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/30"
            >
              Clear Filters
            </Button>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {selectedItem ? (
          <ShowcaseItemDetail item={selectedItem} onClose={() => setSelectedItem(null)} />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function ShowcaseItemDetail({
  item,
  onClose,
}: {
  item: ShowcaseItem
  onClose: () => void
}) {
  const DetailIcon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background"
      role="dialog"
      aria-modal="true"
      aria-labelledby="showcase-detail-title"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/90 px-6 py-4 backdrop-blur-xl sm:px-10 lg:px-12">
        <Button variant="ghost" onClick={onClose} className="gap-2 rounded-full">
          <X className="h-4 w-4" />
          Back to catalog
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close" className="rounded-full">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-[color-mix(in_oklch,var(--chart-3)_70%,var(--primary))] text-primary-foreground">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -right-1/4 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full px-6 py-14 sm:px-10 sm:py-20 lg:px-12"
        >
          <div className="mx-auto flex max-w-7xl items-start gap-6">
            <div className="rounded-2xl bg-primary-foreground/10 p-6 backdrop-blur-sm">
              <DetailIcon className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="max-w-3xl">
              <h2 id="showcase-detail-title" className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                {item.name}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="mb-8 text-2xl font-bold sm:text-3xl">Key Highlights</h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {item.features.map((feature, index) => (
              <motion.div
                key={feature}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 * index, layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                className="group relative flex min-h-[7.5rem] items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 transition-colors duration-300 hover:z-10 hover:border-primary/35 hover:bg-primary/8 hover:shadow-md"
              >
                <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="line-clamp-4 text-base font-medium leading-relaxed transition-[color] duration-300 group-hover:line-clamp-none">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
