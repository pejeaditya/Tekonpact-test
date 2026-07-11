"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

import { cn } from "@/lib/utils"

type Hero3DSceneProps = Omit<React.ComponentProps<"div">, "ref">

type ScenePalette = {
  baseColor: THREE.Color
  accentColor: THREE.Color
  wireColor: THREE.Color
  particleColor: THREE.Color
  meshOpacity: number
  wireOpacity: number
  particleOpacity: number
  particleSize: number
  particleCount: number
  particleSpread: { x: number; y: number; z: number }
  emissiveIntensity: number
  ambientIntensity: number
  keyIntensity: number
  fillIntensity: number
}

function getPalette(isDark: boolean): ScenePalette {
  if (isDark) {
    return {
      baseColor: new THREE.Color(0x62b0ff),
      accentColor: new THREE.Color(0x9fd0ff),
      wireColor: new THREE.Color(0x9fd0ff),
      particleColor: new THREE.Color(0xc8defb),
      meshOpacity: 0.55,
      wireOpacity: 0.9,
      particleOpacity: 0.85,
      particleSize: 0.12,
      particleCount: 3000,
      particleSpread: { x: 80, y: 60, z: 35 },
      emissiveIntensity: 0.45,
      ambientIntensity: 0.7,
      keyIntensity: 1.3,
      fillIntensity: 0.8,
    }
  }

  // Darker, denser particles for contrast on the light background
  return {
    baseColor: new THREE.Color(0x5a9fd4),
    accentColor: new THREE.Color(0x89c8f0),
    wireColor: new THREE.Color(0x3d85c6),
    particleColor: new THREE.Color(0x1a4f8a),
    meshOpacity: 0.42,
    wireOpacity: 0.88,
    particleOpacity: 0.78,
    particleSize: 0.15,
    particleCount: 5500,
    particleSpread: { x: 68, y: 50, z: 30 },
    emissiveIntensity: 0.12,
    ambientIntensity: 0.5,
    keyIntensity: 1.05,
    fillIntensity: 0.7,
  }
}

function applyLayout(width: number, group: THREE.Group, camera: THREE.PerspectiveCamera) {
  const isMobile = width < 640
  const isTablet = width < 1024

  if (isMobile) {
    group.position.set(2.8, -0.8, 0)
    group.scale.setScalar(0.72)
    camera.position.z = 13.5
    return
  }

  if (isTablet) {
    group.position.set(4.2, -0.2, 0)
    group.scale.setScalar(1)
    camera.position.z = 12
    return
  }

  group.position.set(5.4, 0, 0)
  group.scale.setScalar(1.3)
  camera.position.z = 11
}

function createOrbitRing(
  radius: number,
  tube: number,
  color: THREE.Color,
  opacity: number
) {
  const pivot = new THREE.Group()
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube, 16, 140),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
    })
  )
  pivot.add(ring)
  return { pivot, ring }
}

export function Hero3DScene({ className, ...props }: Hero3DSceneProps) {
  const { resolvedTheme, theme } = useTheme()
  const activeTheme = resolvedTheme ?? theme
  const containerRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    group: THREE.Group
    globeCore: THREE.Group
    ring1Pivot: THREE.Group
    ring2Pivot: THREE.Group
    particles: THREE.Points
    baseParticleY: Float32Array
    baseParticleX: Float32Array
    particlePhase: Float32Array
    particleSpeed: Float32Array
    animationId: number
    scrollY: number
    targetScrollY: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const isDark = activeTheme === "dark"
    const palette = getPalette(isDark)

    const getSize = () => ({
      width: Math.max(container.clientWidth, 1),
      height: Math.max(container.clientHeight, 1),
    })

    const { width, height } = getSize()

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000)
    camera.position.set(0, 0, 11)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(palette.baseColor, palette.ambientIntensity))
    const key = new THREE.DirectionalLight(palette.baseColor, palette.keyIntensity)
    key.position.set(4, 4, 6)
    scene.add(key)
    const fill = new THREE.DirectionalLight(palette.accentColor, palette.fillIntensity)
    fill.position.set(-4, -2, 5)
    scene.add(fill)

    const group = new THREE.Group()
    scene.add(group)
    applyLayout(width, group, camera)

    const globeCore = new THREE.Group()
    group.add(globeCore)

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.2, 1),
      new THREE.MeshStandardMaterial({
        color: palette.baseColor,
        emissive: palette.baseColor,
        emissiveIntensity: palette.emissiveIntensity,
        metalness: isDark ? 0.7 : 0.4,
        roughness: isDark ? 0.25 : 0.45,
        wireframe: false,
        transparent: true,
        opacity: palette.meshOpacity,
        depthWrite: false,
      })
    )
    globeCore.add(ico)

    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.2, 1)),
      new THREE.LineBasicMaterial({
        color: palette.wireColor,
        transparent: true,
        opacity: palette.wireOpacity,
      })
    )
    globeCore.add(wire)

    const { pivot: ring1Pivot } = createOrbitRing(
      3.4,
      0.06,
      palette.accentColor,
      isDark ? 0.7 : 0.75
    )
    ring1Pivot.rotation.x = Math.PI / 2
    ring1Pivot.rotation.z = Math.PI / 6
    group.add(ring1Pivot)

    const { pivot: ring2Pivot } = createOrbitRing(
      4.0,
      0.04,
      palette.accentColor,
      isDark ? 0.45 : 0.55
    )
    ring2Pivot.rotation.x = Math.PI / 2.35
    ring2Pivot.rotation.y = Math.PI / 5
    group.add(ring2Pivot)

    const particleCount = 2000
    const { x: spreadX, y: spreadY, z: spreadZ } = palette.particleSpread
    const positions = new Float32Array(particleCount * 3)
    const baseParticleX = new Float32Array(particleCount)
    const baseParticleY = new Float32Array(particleCount)
    const particlePhase = new Float32Array(particleCount)
    const particleSpeed = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * spreadX
      const y = (Math.random() - 0.5) * spreadY
      const z = (Math.random() - 0.5) * spreadZ
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      baseParticleX[i] = x
      baseParticleY[i] = y
      particlePhase[i] = Math.random() * Math.PI * 2
      particleSpeed[i] = 0.0005 + Math.random() * 0.0014
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: palette.particleColor,
        size: palette.particleSize,
        sizeAttenuation: true,
        transparent: true,
        opacity: palette.particleOpacity,
        depthWrite: false,
      })
    )
    scene.add(particles)

    const handleResize = () => {
      const next = getSize()
      camera.aspect = next.width / next.height
      camera.updateProjectionMatrix()
      renderer.setSize(next.width, next.height)
      applyLayout(next.width, group, camera)
    }
    const handleScroll = () => {
      if (stateRef.current) stateRef.current.targetScrollY = window.scrollY
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let animationId = 0
    let scrollY = 0
    let targetScrollY = window.scrollY

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      scrollY += (targetScrollY - scrollY) * 0.08
      const scrollFactor = scrollY * 0.001
      const t = performance.now()
      const time = prefersReducedMotion ? 0 : t

      const pos = particleGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const drift = prefersReducedMotion ? 0 : Math.sin(time * particleSpeed[i] + particlePhase[i]) * 0.5
        pos[i * 3] = baseParticleX[i] + drift
        pos[i * 3 + 1] =
          baseParticleY[i] +
          (prefersReducedMotion ? 0 : Math.cos(time * particleSpeed[i] * 1.3 + particlePhase[i]) * 0.5)
      }
      particleGeometry.attributes.position.needsUpdate = true

      group.rotation.y = scrollFactor + (prefersReducedMotion ? 0 : time * 0.00012)
      group.rotation.x = Math.sin(scrollFactor * 0.5) * 0.12

      globeCore.rotation.y = scrollFactor * 0.3 + (prefersReducedMotion ? 0 : time * 0.0002)
      globeCore.rotation.x = scrollFactor * 0.2 + (prefersReducedMotion ? 0 : time * 0.00012)

      ring1Pivot.rotation.y = scrollFactor * 0.4 + (prefersReducedMotion ? 0 : time * 0.00055)
      ring2Pivot.rotation.y = scrollFactor * 0.25 + (prefersReducedMotion ? 0 : -time * 0.00045)

      particles.rotation.y = scrollFactor * 0.05
      particles.rotation.x = scrollFactor * 0.03

      renderer.render(scene, camera)
    }
    animate()

    stateRef.current = {
      scene,
      camera,
      renderer,
      group,
      globeCore,
      ring1Pivot,
      ring2Pivot,
      particles,
      baseParticleY,
      baseParticleX,
      particlePhase,
      particleSpeed,
      animationId,
      scrollY,
      targetScrollY,
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationId)
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
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
