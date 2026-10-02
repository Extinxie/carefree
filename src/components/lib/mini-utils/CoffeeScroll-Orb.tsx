"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CoffeeScrollOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    const COUNT = 14;

    const geometry = new THREE.SphereGeometry(0.42, 16, 12);

    const material = new THREE.MeshStandardMaterial({
      color: 0x171613,
      roughness: 0.82,
      metalness: 0,
    });

    const beans = new THREE.InstancedMesh(geometry, material, COUNT);

    beans.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    scene.add(beans);

    const items = Array.from({ length: COUNT }, (_, i) => ({
      x: THREE.MathUtils.randFloatSpread(4.8),
      y: THREE.MathUtils.randFloatSpread(5.5),
      z: THREE.MathUtils.randFloat(-1.5, 1.5),
      scale: THREE.MathUtils.randFloat(0.35, 0.75),
      rotation: Math.random() * Math.PI * 2,
      speed: THREE.MathUtils.randFloat(0.15, 0.3),
      phase: Math.random() * Math.PI * 2,
      depth: i,
    }));

    const dummy = new THREE.Object3D();

    const ambient = new THREE.AmbientLight(0xffffff, 1.8);

    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 2.2);

    light.position.set(3, 4, 6);

    scene.add(light);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let targetScroll = window.scrollY;
    let scroll = targetScroll;

    const onScroll = () => {
      targetScroll = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    let frame = 0;
    let lastTime = performance.now();

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);

      if (time - lastTime < 22) return;

      lastTime = time;

      scroll += (targetScroll - scroll) * 0.055;

      const scrollOffset = scroll * 0.0008;

      for (let i = 0; i < COUNT; i++) {
        const item = items[i];

        const t = time * 0.001 * item.speed + item.phase;

        dummy.position.set(
          item.x + Math.sin(t) * 0.18,
          item.y + Math.cos(t * 0.8) * 0.18 - scrollOffset * 4,
          item.z,
        );

        const scale = item.scale * (1 + Math.sin(t * 1.2) * 0.025);

        dummy.scale.setScalar(scale);

        dummy.rotation.set(t * 0.25, t * 0.4, item.rotation);

        dummy.updateMatrix();

        beans.setMatrixAt(i, dummy.matrix);
      }

      beans.instanceMatrix.needsUpdate = true;

      beans.rotation.y = scrollOffset * 1.5;
      beans.rotation.x = scrollOffset * 0.5;

      renderer.render(scene, camera);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();

      geometry.dispose();
      material.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden opacity-[0.16]"
    />
  );
}
