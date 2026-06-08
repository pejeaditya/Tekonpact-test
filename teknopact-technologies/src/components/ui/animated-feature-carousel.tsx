"use client"

import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "framer-motion"
import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { CatalogCategory, CatalogItem } from "@/lib/products"
import { cn } from "@/lib/utils"

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
}

const placeholderImage = (text = "Image") =>
  `https://placehold.co/600x400/1a1a1a/ffffff?text=${encodeURIComponent(text)}`

function useNumberCycler(totalSteps: number, interval = 8000) {
  const [currentNumber, setCurrentNumber] = useState(0)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
    }, interval)

    return () => clearTimeout(timerId)
  }, [currentNumber, totalSteps, interval])

  const setStep = useCallback(
    (stepIndex: number) => {
      setCurrentNumber(stepIndex % totalSteps)
    },
    [totalSteps]
  )

  return { currentNumber, setStep }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])
  return isMobile
}

function ProductMiniCard({
  item,
  isActive,
  onSelect,
}: {
  item: CatalogItem
  isActive: boolean
  onSelect: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        y: isHovered ? [0, -7, 0] : isActive ? -2 : 0,
        scale: isHovered ? 1.05 : isActive ? 1.02 : 1,
      }}
      transition={{
        y: {
          repeat: isHovered ? Infinity : 0,
          duration: 1.6,
          ease: "easeInOut",
        },
        scale: { type: "spring", stiffness: 320, damping: 22 },
      }}
      className={cn(
        "flex min-w-[9.5rem] flex-1 flex-col gap-2 rounded-xl border p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive
          ? "border-primary bg-primary/10 shadow-md shadow-primary/20"
          : "border-border bg-card",
        isHovered && "border-primary/50 bg-muted/60 shadow-lg shadow-primary/15"
      )}
    >
      <motion.div
        animate={{ y: isHovered ? [0, -3, 0] : 0 }}
        transition={{
          repeat: isHovered ? Infinity : 0,
          duration: 1.6,
          ease: "easeInOut",
          delay: 0.1,
        }}
        className="overflow-hidden rounded-lg"
      >
        <motion.img
          src={item.image}
          alt={item.name}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="aspect-[4/3] w-full rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.src = placeholderImage(item.name)
          }}
        />
      </motion.div>
      <div>
        <p className="line-clamp-1 text-xs font-semibold text-foreground">{item.name}</p>
      </div>
    </motion.button>
  )
}

function FeatureCard({
  category,
  selectedItem,
  itemsLabel,
  items,
  selectedItemId,
  onSelectItem,
}: {
  category: CatalogCategory
  selectedItem: CatalogItem
  itemsLabel: string
  items: CatalogItem[]
  selectedItemId: string
  onSelectItem: (id: string) => void
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className="group relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300">
        <div className="flex w-full flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-start lg:gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${category.id}-${selectedItem.id}`}
              className="flex w-full flex-col gap-4 lg:flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="text-sm font-semibold uppercase tracking-wider text-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {category.name}
              </motion.div>
              <motion.h2
                className="text-2xl font-bold tracking-tight text-foreground md:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {selectedItem.name}
              </motion.h2>
              <motion.div
                className="flex flex-wrap items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Badge variant="outline">{selectedItem.subcategory}</Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-base leading-relaxed text-muted-foreground">
                  {selectedItem.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="relative flex w-full shrink-0 flex-col gap-4 lg:w-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                {...ANIMATION_PRESETS.fadeInScale}
                whileHover={{
                  y: [0, -6, 0],
                  transition: { y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" } },
                }}
                className="group/image relative mx-auto aspect-[4/3] h-40 w-56 overflow-hidden rounded-2xl border border-border shadow-xl shadow-black/10 transition-shadow duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 sm:h-44 sm:w-64 md:h-48 md:w-72 lg:mx-0"
              >
                <motion.img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="size-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  onError={(e) => {
                    e.currentTarget.src = placeholderImage(selectedItem.name)
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="border-t border-border bg-muted/20 px-6 py-5 md:px-10 md:py-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
            {itemsLabel} in {category.name}
          </p>
          <div className="teknopact-scrollbar flex w-full gap-3 overflow-x-auto overflow-y-visible px-1 pb-3 pt-2">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-w-[9.5rem] flex-1"
              >
                <ProductMiniCard
                  item={item}
                  isActive={item.id === selectedItemId}
                  onSelect={() => onSelectItem(item.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CategoryNav({
  categories,
  current,
  onChange,
}: {
  categories: readonly CatalogCategory[]
  current: number
  onChange: (index: number) => void
}) {
  return (
    <nav aria-label="Categories" className="flex justify-center px-4">
      <ol className="flex w-full flex-wrap items-center justify-center gap-2" role="list">
        {categories.map((category, categoryIdx) => {
          const isCompleted = current > categoryIdx
          const isCurrent = current === categoryIdx
          const Icon = category.icon

          return (
            <motion.li
              key={category.id}
              initial="inactive"
              animate={isCurrent ? "active" : "inactive"}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <button
                type="button"
                className={cn(
                  "group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                  isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
                onClick={() => onChange(categoryIdx)}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-background text-muted-foreground group-hover:bg-background/80"
                  )}
                >
                  {isCompleted ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Icon className="size-3" />
                  )}
                </span>
                <span className="hidden sm:inline-block">{category.name}</span>
              </button>
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

export interface CategoryShowcaseProps {
  categories: CatalogCategory[]
  title?: string
  subtitle?: string
  itemsLabel?: string
  autoCycleInterval?: number
}

export function CategoryShowcase({
  categories,
  title,
  subtitle,
  itemsLabel = "Products",
  autoCycleInterval = 8000,
}: CategoryShowcaseProps) {
  const { currentNumber: categoryIndex, setStep: setCategory } = useNumberCycler(
    categories.length,
    autoCycleInterval
  )
  const activeCategory = categories[categoryIndex]
  const [selectedItemId, setSelectedItemId] = useState(activeCategory.items[0]?.id ?? "")

  useEffect(() => {
    setSelectedItemId(activeCategory.items[0]?.id ?? "")
  }, [activeCategory.id, activeCategory.items])

  const selectedItem =
    activeCategory.items.find((item) => item.id === selectedItemId) ?? activeCategory.items[0]

  const handleCategoryChange = (index: number) => {
    setCategory(index)
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {(title || subtitle) && (
        <div className="mx-auto max-w-3xl text-center">
          {title ? (
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          ) : null}
          {subtitle ? (
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      )}

      <FeatureCard
        category={activeCategory}
        selectedItem={selectedItem}
        itemsLabel={itemsLabel}
        items={activeCategory.items}
        selectedItemId={selectedItem.id}
        onSelectItem={setSelectedItemId}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <CategoryNav
          categories={categories}
          current={categoryIndex}
          onChange={handleCategoryChange}
        />
      </motion.div>
    </div>
  )
}
