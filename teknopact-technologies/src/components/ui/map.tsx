"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTheme } from "next-themes"

import { brand } from "@/lib/brand"
import { offices } from "@/lib/content"
import { createDottedMap } from "@/lib/dotted-map"
import { cn } from "@/lib/utils"

export type OfficeTooltipDetails = {
  address: string
  tel?: string
  mob?: string
  fax?: string
}

const MAP_LABEL_TO_COUNTRY: Record<string, string> = {
  UAE: "United Arab Emirates",
}

function officeForMapLabel(label: string): OfficeTooltipDetails | undefined {
  const country = MAP_LABEL_TO_COUNTRY[label] ?? label
  const office = offices.find((o) => o.country === country)
  if (!office) return undefined
  return {
    address: office.address,
    tel: office.tel,
    mob: office.mob,
    fax: office.fax,
  }
}

export type MapDot = {
  start: { lat: number; lng: number; label?: string }
  end: { lat: number; lng: number; label?: string }
}

type MapMarker = {
  lat: number
  lng: number
  label: string
  placement: "above" | "below"
  offsetX?: number
  details?: OfficeTooltipDetails
}

/** Per-country placement so nearby GCC labels do not overlap */
const LABEL_CONFIG: Record<string, { placement: "above" | "below"; offsetX?: number }> = {
  Bahrain: { placement: "above", offsetX: -52 },
  Qatar: { placement: "below", offsetX: 28 },
  UAE: { placement: "above", offsetX: 22 },
  "Saudi Arabia": { placement: "below", offsetX: -42 },
  Oman: { placement: "above", offsetX: 36 },
  India: { placement: "below", offsetX: 0 },
  Canada: { placement: "above", offsetX: 0 },
}

const LABEL_WIDTH = 108
const LABEL_HEIGHT = 26

function buildUniqueMarkers(dots: MapDot[]): MapMarker[] {
  const seen = new Set<string>()
  const markers: MapMarker[] = []

  const add = (lat: number, lng: number, label?: string) => {
    if (!label) return
    const key = `${label}-${lat.toFixed(2)}-${lng.toFixed(2)}`
    if (seen.has(key)) return
    seen.add(key)
    const config = LABEL_CONFIG[label]
    markers.push({
      lat,
      lng,
      label,
      placement: config?.placement ?? (markers.length % 2 === 0 ? "above" : "below"),
      offsetX: config?.offsetX ?? 0,
      details: officeForMapLabel(label),
    })
  }

  dots.forEach((dot) => {
    add(dot.start.lat, dot.start.lng, dot.start.label)
    add(dot.end.lat, dot.end.lng, dot.end.label)
  })

  return markers
}

function getLabelPosition(
  point: { x: number; y: number },
  placement: "above" | "below",
  label: string,
  offsetX = 0
) {
  const width = label.length > 10 ? LABEL_WIDTH + 20 : LABEL_WIDTH
  const x = Math.min(Math.max(point.x - width / 2 + offsetX, 4), 800 - width - 4)
  const y = placement === "above" ? point.y - LABEL_HEIGHT - 16 : point.y + 14
  return { x, y, width, height: LABEL_HEIGHT }
}

function MapLabel({
  point,
  label,
  placement,
  offsetX = 0,
  labelClassName,
  delay = 0,
  onPointerEnter,
  onPointerLeave,
}: {
  point: { x: number; y: number }
  label: string
  placement: "above" | "below"
  offsetX?: number
  labelClassName?: string
  delay?: number
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}) {
  const box = getLabelPosition(point, placement, label, offsetX)

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="pointer-events-auto"
    >
      <foreignObject x={box.x} y={box.y} width={box.width} height={box.height} className="overflow-visible">
        <div
          className={cn(
            "flex h-full items-center justify-center",
            placement === "above" ? "items-end pb-0.5" : "items-start pt-0.5"
          )}
        >
          <span
            role="button"
            tabIndex={0}
            onMouseEnter={onPointerEnter}
            onMouseLeave={onPointerLeave}
            onFocus={onPointerEnter}
            onBlur={onPointerLeave}
            className={cn(
              "cursor-pointer whitespace-nowrap rounded-md border border-border bg-card px-2 py-0.5 text-xs font-medium leading-none text-foreground shadow-sm transition-colors hover:border-primary/40 hover:bg-secondary",
              labelClassName
            )}
          >
            {label}
          </span>
        </div>
      </foreignObject>
    </motion.g>
  )
}

function MapAddressTooltip({
  marker,
  anchor,
}: {
  marker: MapMarker
  anchor: { x: number; y: number }
}) {
  const box = getLabelPosition(anchor, marker.placement, marker.label, marker.offsetX ?? 0)
  const centerX = ((box.x + box.width / 2) / 800) * 100
  const anchorY =
    marker.placement === "above"
      ? (box.y / 400) * 100
      : ((box.y + box.height) / 400) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: marker.placement === "above" ? 4 : -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: marker.placement === "above" ? 4 : -4 }}
      transition={{ duration: 0.15 }}
      className="pointer-events-none absolute z-20 w-56 max-w-[min(16rem,70vw)] rounded-lg border border-border bg-card px-3 py-2.5 text-left shadow-lg"
      style={{
        left: `${centerX}%`,
        top: `${anchorY}%`,
        transform:
          marker.placement === "above"
            ? "translate(-50%, calc(-100% - 8px))"
            : "translate(-50%, 8px)",
      }}
    >
      <p className="text-sm font-semibold text-foreground">{marker.label}</p>
      {marker.details ? (
        <>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{marker.details.address}</p>
          {marker.details.tel ? (
            <p className="mt-1 text-xs text-muted-foreground">Tel: {marker.details.tel}</p>
          ) : null}
          {marker.details.mob ? (
            <p className="text-xs text-muted-foreground">Mob: {marker.details.mob}</p>
          ) : null}
          {marker.details.fax ? (
            <p className="text-xs text-muted-foreground">Fax: {marker.details.fax}</p>
          ) : null}
        </>
      ) : (
        <p className="mt-1 text-xs text-muted-foreground">Office details unavailable</p>
      )}
    </motion.div>
  )
}

export interface WorldMapProps {
  dots?: MapDot[]
  lineColor?: string
  showLabels?: boolean
  labelClassName?: string
  animationDuration?: number
  loop?: boolean
  className?: string
}

export function WorldMap({
  dots = [],
  lineColor = brand.colors.primary,
  showLabels = true,
  labelClassName,
  animationDuration = 2,
  loop = true,
  className,
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredMarker, setHoveredMarker] = useState<{
    marker: MapMarker
    point: { x: number; y: number }
  } | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  const map = useMemo(() => createDottedMap({ height: 100, grid: "diagonal" }), [])

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)",
        shape: "circle",
        backgroundColor: "transparent",
      }),
    [map, isDark]
  )

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360)
    const y = (90 - lat) * (400 / 180)
    return { x, y }
  }

  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 50
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  const markers = useMemo(() => buildUniqueMarkers(dots), [dots])

  const staggerDelay = 0.3
  const totalAnimationTime = dots.length * staggerDelay + animationDuration
  const pauseTime = 2
  const fullCycleDuration = totalAnimationTime + pauseTime

  return (
    <div
      className={cn(
        "relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-border bg-card font-sans md:aspect-[2.5/1] lg:aspect-[2/1]",
        className
      )}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none object-cover [mask-image:linear-gradient(to_bottom,transparent,white_8%,white_92%,transparent)]"
        alt=""
        aria-hidden
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="pointer-events-auto absolute inset-0 h-full w-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)
          const startTime = (i * staggerDelay) / fullCycleDuration
          const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration
          const resetTime = totalAnimationTime / fullCycleDuration
          const pathD = createCurvedPath(startPoint, endPoint)

          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={
                  loop
                    ? { pathLength: [0, 0, 1, 1, 0] }
                    : { pathLength: 1 }
                }
                transition={
                  loop
                    ? {
                        duration: fullCycleDuration,
                        times: [0, startTime, endTime, resetTime, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0,
                      }
                    : {
                        duration: animationDuration,
                        delay: i * staggerDelay,
                        ease: "easeInOut",
                      }
                }
              />
              {loop ? (
                <motion.circle
                  r="4"
                  fill={lineColor}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    offsetDistance: [null, "0%", "100%", "100%", "100%"],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{ offsetPath: `path('${pathD}')` }}
                />
              ) : null}
            </g>
          )
        })}

        {markers.map((marker, i) => {
          const point = projectPoint(marker.lat, marker.lng)
          const showTooltip = () => setHoveredMarker({ marker, point })
          const hideTooltip = () => setHoveredMarker(null)

          return (
            <g key={`marker-${marker.label}`}>
              <motion.g
                onHoverStart={showTooltip}
                onHoverEnd={hideTooltip}
                className="cursor-pointer"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <circle cx={point.x} cy={point.y} r="3" fill={lineColor} filter="url(#glow)" />
                <circle cx={point.x} cy={point.y} r="3" fill={lineColor} opacity="0.5">
                  <animate
                    attributeName="r"
                    from="3"
                    to="10"
                    dur="2s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="2s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </motion.g>
              {showLabels ? (
                <MapLabel
                  point={point}
                  label={marker.label}
                  placement={marker.placement}
                  offsetX={marker.offsetX}
                  labelClassName={labelClassName}
                  delay={0.15 * i}
                  onPointerEnter={showTooltip}
                  onPointerLeave={hideTooltip}
                />
              ) : null}
            </g>
          )
        })}
      </svg>

      <AnimatePresence>
        {hoveredMarker ? (
          <MapAddressTooltip marker={hoveredMarker.marker} anchor={hoveredMarker.point} />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
