import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Escena WebGL del hero: icosaedro wireframe (estética "red neuronal")
 * con vértices luminosos y un halo de partículas orbitando. Rota lentamente
 * y reacciona con parallax al ratón. Con prefers-reduced-motion renderiza
 * un único fotograma estático.
 *
 * Se carga en lazy desde Hero.tsx para que three.js viva en su propio chunk
 * y no penalice la carga inicial.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 7;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // sin WebGL disponible, el hero funciona igual sin la escena
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Núcleo: icosaedro wireframe
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Vértices luminosos sobre el mismo icosaedro
    const nodesMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.07,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const nodes = new THREE.Points(coreGeo, nodesMat);
    group.add(nodes);

    // Halo exterior de partículas en corona esférica
    const COUNT = 700;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 2.9 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const haloGeo = new THREE.BufferGeometry();
    haloGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const haloMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const halo = new THREE.Points(haloGeo, haloMat);
    group.add(halo);

    // Parallax suave siguiendo al ratón
    const target = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      target.y = (e.clientX / window.innerWidth - 0.5) * 0.7;
      target.x = (e.clientY / window.innerHeight - 0.5) * 0.45;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let rafId = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      core.rotation.y = t * 0.16;
      core.rotation.x = t * 0.06;
      nodes.rotation.copy(core.rotation);
      halo.rotation.y = -t * 0.05;
      halo.rotation.z = t * 0.02;
      group.rotation.x += (target.x - group.rotation.x) * 0.04;
      group.rotation.y += (target.y - group.rotation.y) * 0.04;
      renderer.render(scene, camera);
    };

    const animate = () => {
      renderFrame();
      rafId = requestAnimationFrame(animate);
    };

    if (reduceMotion) {
      renderFrame();
    } else {
      animate();
    }

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reduceMotion) renderFrame();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      coreGeo.dispose();
      coreMat.dispose();
      nodesMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_78%)]"
    />
  );
}
