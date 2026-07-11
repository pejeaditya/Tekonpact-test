"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

import { cn } from "@/lib/utils"

type PageParticlesProps = Omit<React.ComponentProps<"div">, "ref">

export function PageParticles({ className, ...props }: PageParticlesProps) {
  const { resolvedTheme, theme } = useTheme()
  const activeTheme = resolvedTheme ?? theme
  const containerRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    points: THREE.Points
    animationId: number
    targetScrollY: number
    scrollY: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const isDark = activeTheme === "dark"
    const color = isDark ? new THREE.Color(0xa9c8ff) : new THREE.Color(0x1f5fbf)

    const getSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const { width, height } = getSize()

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const particleCount = 1400
    const positions = new Float32Array(particleCount * 3)
    const baseY = new Float32Array(particleCount)
    const phase = new Float32Array(particleCount)
    const speed = new Float32Array(particleCount)
    const sizeGroup = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 80
      const y = (Math.random() - 0.5) * 60
      const z = (Math.random() - 0.5) * 40
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      baseY[i] = y
      phase[i] = Math.random() * Math.PI * 2
      speed[i] = 0.0006 + Math.random() * 0.0012
      sizeGroup[i] = Math.random()
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color,
      size: 0.07,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const handleResize = () => {
      const next = getSize()
      camera.aspect = next.width / next.height
      camera.updateProjectionMatrix()
      renderer.setSize(next.width, next.height)
    }
    const handleScroll = () => {
      if (stateRef.current) stateRef.current.targetScrollY = window.scrollY
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })

    let animationId = 0
    let scrollY = 0
    let targetScrollY = window.scrollY

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      scrollY += (targetScrollY - scrollY) * 0.08

      const pos = geometry.attributes.position.array as Float32Array
      const t = performance.now()
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] = baseY[i] + Math.sin(t * speed[i] + phase[i]) * 0.6
      }
      geometry.attributes.position.needsUpdate = true

      const factor = scrollY * 0.0005
      points.rotation.y = factor + t * 0.00005
      points.rotation.x = Math.sin(factor * 0.6) * 0.1

      const drift = -scrollY * 0.18
      points.position.y = drift

      renderer.render(scene, camera)
    }
    animate()

    stateRef.current = {
      renderer,
      scene,
      camera,
      points,
      animationId,
      targetScrollY,
      scrollY,
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      stateRef.current = null
    }
  }, [activeTheme])

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
      aria-hidden
      {...props}
    />
  )
}
