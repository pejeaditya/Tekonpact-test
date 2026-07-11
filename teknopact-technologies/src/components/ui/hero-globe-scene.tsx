"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

import { cn } from "@/lib/utils"

type HeroGlobeSceneProps = Omit<React.ComponentProps<"div">, "ref">

export function HeroGlobeScene({ className, ...props }: HeroGlobeSceneProps) {
  const { resolvedTheme, theme } = useTheme()
  const activeTheme = resolvedTheme ?? theme
  const containerRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    group: THREE.Group
    arcs: { line: THREE.Line; progress: number; speed: number; phase: number }[]
    animationId: number
    scrollY: number
    targetScrollY: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const isDark = activeTheme === "dark"
    const primary = isDark ? new THREE.Color(0x62b0ff) : new THREE.Color(0x1f5fbf)
    const accent = isDark ? new THREE.Color(0x9fd0ff) : new THREE.Color(0x4a90e2)

    const getSize = () => ({
      width: Math.max(container.clientWidth, 1),
      height: Math.max(container.clientHeight, 1),
    })

    const { width, height } = getSize()

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(isDark ? 0x0c0c14 : 0xffffff, 600, 3000)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000)
    camera.position.set(0.5, 0, 7)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(primary, 0.7))
    const key = new THREE.DirectionalLight(primary, 1.2)
    key.position.set(4, 4, 6)
    scene.add(key)
    const fill = new THREE.DirectionalLight(accent, 0.7)
    fill.position.set(-4, -2, 5)
    scene.add(fill)

    const group = new THREE.Group()
    scene.add(group)

    const globeRadius = 1.8
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 48, 48),
      new THREE.MeshStandardMaterial({
        color: primary,
        emissive: primary,
        emissiveIntensity: 0.25,
        metalness: 0.4,
        roughness: 0.6,
        transparent: true,
        opacity: 0.18,
      })
    )
    group.add(globe)

    const wireGlobe = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.SphereGeometry(globeRadius, 18, 12)),
      new THREE.LineBasicMaterial({ color: primary, transparent: true, opacity: 0.6 })
    )
    group.add(wireGlobe)

    const ringCount = 4
    for (let i = 0; i < ringCount; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(globeRadius + 0.15 + i * 0.18, 0.012, 8, 120),
        new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.5 - i * 0.08 })
      )
      ring.rotation.x = Math.PI / 2 + (i * Math.PI) / 8
      ring.rotation.z = (i * Math.PI) / 5
      group.add(ring)
    }

    const arcCount = 6
    const arcs: { line: THREE.Line; progress: number; speed: number; phase: number }[] = []
    for (let i = 0; i < arcCount; i++) {
      const start = randomPointOnSphere(globeRadius + 0.05)
      const end = randomPointOnSphere(globeRadius + 0.05)
      const positions = new Float32Array(60 * 3)
      for (let p = 0; p < 60; p++) {
        const t = p / 59
        const lift = Math.sin(t * Math.PI) * 0.4
        positions[p * 3] = start.x + (end.x - start.x) * t
        positions[p * 3 + 1] = start.y + (end.y - start.y) * t + lift
        positions[p * 3 + 2] = start.z + (end.z - start.z) * t
      }
      const arcGeo = new THREE.BufferGeometry()
      arcGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      const arcMat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.7 })
      const line = new THREE.Line(arcGeo, arcMat)
      group.add(line)
      arcs.push({ line, progress: Math.random(), speed: 0.0025 + Math.random() * 0.002, phase: Math.random() * Math.PI * 2 })
    }

    function randomPointOnSphere(r: number) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    }

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
      const factor = scrollY * 0.001

      group.rotation.y = factor + performance.now() * 0.00018
      group.rotation.x = Math.sin(factor * 0.4) * 0.3
      wireGlobe.rotation.copy(group.rotation)

      const scale = 1 + Math.min(scrollY * 0.0003, 0.45)
      group.scale.setScalar(scale)

      arcs.forEach(({ line, progress, speed, phase }) => {
        const p = (progress + performance.now() * speed) % 1
        const mat = line.material as THREE.LineBasicMaterial
        mat.opacity = 0.25 + Math.sin(p * Math.PI) * 0.7
        line.scale.setScalar(0.95 + Math.sin(p * Math.PI + phase) * 0.05)
      })

      renderer.render(scene, camera)
    }
    animate()

    stateRef.current = {
      renderer,
      scene,
      camera,
      group,
      arcs,
      animationId,
      scrollY,
      targetScrollY,
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationId)
      scene.traverse((obj) => {
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.Points ||
          obj instanceof THREE.LineSegments ||
          obj instanceof THREE.Line
        ) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
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
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    />
  )
}
