import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Slow gold-dust particle field — a tasteful, low-cost Three.js hero motif.
 * Pauses when offscreen and respects low device pixel ratios.
 */
export default function GoldDust() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    const COUNT = 320
    const positions = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      speeds[i] = 0.002 + Math.random() * 0.006
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const sprite = makeDotTexture()
    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: sprite,
      color: new THREE.Color('#c7a35a'),
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let raf
    let visible = true
    let mouseX = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    }
    window.addEventListener('pointermove', onMouse)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) loop()
      },
      { threshold: 0 }
    )
    io.observe(mount)

    const pos = geometry.attributes.position.array
    function loop() {
      if (!visible) return
      raf = requestAnimationFrame(loop)
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += speeds[i] * 6
        if (pos[i * 3 + 1] > 9) pos[i * 3 + 1] = -9
      }
      geometry.attributes.position.needsUpdate = true
      points.rotation.y += (mouseX * 0.15 - points.rotation.y) * 0.02
      renderer.render(scene, camera)
    }
    loop()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMouse)
      geometry.dispose()
      material.dispose()
      sprite.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="gold-dust" ref={mountRef} aria-hidden="true" />
}

function makeDotTexture() {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  )
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.3, 'rgba(226,199,136,0.9)')
  g.addColorStop(1, 'rgba(199,163,90,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  return tex
}
