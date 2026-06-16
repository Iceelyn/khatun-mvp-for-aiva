import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Renders /src/assets/brand/crown.glb: slow auto-rotation (~7s/turn), gentle
// vertical float, subtle mouse-parallax, warm gold material + rim light.
export default function Crown3D({ src }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || !src) return

    const w = mount.clientWidth || 280
    const h = mount.clientHeight || 280

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100)
    camera.position.set(0, 0.2, 5)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    // Warm key (above-left) + soft fill + wine-tinted rim.
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.DirectionalLight(0xfff0d0, 2.4)
    key.position.set(-3, 4, 3)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x7a0f1c, 1.6)
    rim.position.set(2, -1, -3)
    scene.add(rim)
    const gold = new THREE.PointLight(0xc7a35a, 1.2, 20)
    gold.position.set(2, 2, 2)
    scene.add(gold)

    const group = new THREE.Group()
    scene.add(group)

    let model
    const loader = new GLTFLoader()
    loader.load(
      src,
      (gltf) => {
        model = gltf.scene
        model.traverse((o) => {
          if (o.isMesh) {
            o.material = new THREE.MeshStandardMaterial({
              color: 0xc7a35a,
              metalness: 1,
              roughness: 0.28,
              emissive: 0x3a2a0e,
              emissiveIntensity: 0.2,
            })
          }
        })
        // center + scale to fit
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)
        const maxDim = Math.max(size.x, size.y, size.z) || 1
        model.scale.setScalar(2.6 / maxDim)
        group.add(model)
      },
      undefined,
      () => {}
    )

    let raf
    let visible = true
    let mx = 0
    let my = 0
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) loop()
      },
      { threshold: 0 }
    )
    io.observe(mount)

    const start = performance.now()
    function loop() {
      if (!visible) return
      raf = requestAnimationFrame(loop)
      const t = (performance.now() - start) / 1000
      group.rotation.y = (t / 7) * Math.PI * 2 // ~7s per turn
      group.position.y = Math.sin(t * 1.1) * 0.12 // gentle float
      group.rotation.x += (my * 0.18 - group.rotation.x) * 0.05
      group.rotation.z += (mx * 0.12 - group.rotation.z) * 0.05
      renderer.render(scene, camera)
    }
    loop()

    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (renderer.domElement.parentNode) mount.removeChild(renderer.domElement)
    }
  }, [src])

  return <div className="crown__canvas" ref={mountRef} aria-hidden="true" />
}
