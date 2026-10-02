"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

function createBeanGeometry() {
  let g: THREE.BufferGeometry = new THREE.SphereGeometry(1, 64, 48);
  g.deleteAttribute("uv");
  g.deleteAttribute("normal");
  g = mergeVertices(g);
  const pos = g.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    v.y *= 0.62;
    v.z *= 0.72;

    if (v.y > 0) {
      const d = v.z - 0.07 * Math.sin(v.x * 2.4);
      const groove = Math.exp(-(d * d) / (2 * 0.055 * 0.055));
      const fade = THREE.MathUtils.smoothstep(v.y, 0, 0.25);
      v.y -= groove * 0.15 * fade;
      v.y *= 0.92;
    }
    pos.setXYZ(i, v.x, v.y, v.z);
  }

  g.computeVertexNormals();
  return g;
}

export function CoffeeBeans() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = container?.parentElement;
    if (!container || !track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 14 : 30;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const key = new THREE.DirectionalLight(0xffe2b8, 2.2);
    key.position.set(4, 6, 6);
    scene.add(key);

    const geometry = createBeanGeometry();
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x705335,
      roughness: 0.42,
      metalness: 0.05,
      clearcoat: 0.35,
      clearcoatRoughness: 0.45,
      envMapIntensity: 0.9,
    });

    const beans = new THREE.InstancedMesh(geometry, material, COUNT);
    scene.add(beans);

    const data = Array.from({ length: COUNT }, () => {
      const z = THREE.MathUtils.randFloat(-6, 3);
      return {
        nx: THREE.MathUtils.randFloatSpread(2),
        y: THREE.MathUtils.randFloat(-9, 9),
        z,
        scale: THREE.MathUtils.randFloat(0.3, 0.75) * (1 + (z + 6) * 0.05),
        r: [Math.random() * 6, Math.random() * 6, Math.random() * 6],
        s: [
          THREE.MathUtils.randFloat(0.05, 0.22),
          THREE.MathUtils.randFloat(0.05, 0.22),
          THREE.MathUtils.randFloat(0.03, 0.12),
        ],
        phase: Math.random() * Math.PI * 2,
      };
    });

    const color = new THREE.Color();
    data.forEach((_, i) => {
      color.setHSL(
        0.07 + Math.random() * 0.02,
        0.45,
        0.14 + Math.random() * 0.1,
      );
      beans.setColorAt(i, color);
    });
    if (beans.instanceColor) beans.instanceColor.needsUpdate = true;

    const dummy = new THREE.Object3D();
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const mouse = new THREE.Vector2();
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let progress = 0;
    let visible = true;
    let raf = 0;
    const clock = new THREE.Clock();

    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
    );
    io.observe(track);

    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible) return;

      const t = reduceMotion ? 0 : clock.getElapsedTime();

      const rect = track.getBoundingClientRect();
      const target = THREE.MathUtils.clamp(
        -rect.top / Math.max(rect.height - window.innerHeight, 1),
        0,
        1,
      );
      progress += (target - progress) * 0.08;

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 0.3 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      data.forEach((b, i) => {
        const halfW = tanHalf * (camera.position.z - b.z) * camera.aspect;
        const depthSpeed = 1 + b.z * 0.07;
        const y =
          b.y +
          (progress - 0.5) * 16 * depthSpeed +
          Math.sin(t * 0.6 + b.phase) * 0.25;

        dummy.position.set(b.nx * halfW, y, b.z);
        dummy.rotation.set(
          b.r[0] + t * b.s[0] + progress * 2,
          b.r[1] + t * b.s[1],
          b.r[2] + t * b.s[2],
        );
        dummy.scale.setScalar(b.scale);
        dummy.updateMatrix();
        beans.setMatrixAt(i, dummy.matrix);
      });
      beans.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      geometry.dispose();
      material.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none sticky top-0 h-screen w-full"
    />
  );
}
