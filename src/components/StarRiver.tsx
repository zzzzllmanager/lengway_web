"use client";

import { useEffect, useRef, useState } from "react";

type GalaxyConfig = {
  starCount: number;
  rotationSpeed: number;
  spiralTightness: number;
  mouseForce: number;
  mouseRadius: number;
  galaxyRadius: number;
  galaxyThickness: number;
  armCount: number;
  armWidth: number;
  randomness: number;
  particleSize: number;
  starBrightness: number;
  denseStarColor: string;
  sparseStarColor: string;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  cloudCount: number;
  cloudSize: number;
  cloudOpacity: number;
  cloudTintColor: string;
};

/**
 * Visuals aligned with https://dgreenheck.github.io/webgpu-galaxy/
 * Clarity needs high star density — sparse counts look soft/blobbed.
 */
const HERO_CONFIG: GalaxyConfig = {
  starCount: 150000,
  rotationSpeed: 0.16,
  spiralTightness: 1.75,
  mouseForce: 16.0,
  mouseRadius: 14.0,
  galaxyRadius: 9.0,
  galaxyThickness: 2.6,
  armCount: 2,
  armWidth: 2.0,
  randomness: 1.8,
  particleSize: 0.055,
  starBrightness: 0.3,
  denseStarColor: "#1885ff",
  sparseStarColor: "#ffb28a",
  bloomStrength: 0.2,
  bloomRadius: 0.2,
  bloomThreshold: 0.1,
  cloudCount: 2500,
  cloudSize: 2.6,
  cloudOpacity: 0.02,
  cloudTintColor: "#ffdace",
};

function supportsWebGPU() {
  return typeof navigator !== "undefined" && !!navigator.gpu;
}

function PhotoFallback() {
  return <div className="starflow-photo" aria-hidden="true" />;
}

/**
 * WebGPU spiral galaxy (vendored from dgreenheck/webgpu-galaxy, MIT).
 * Falls back to black when WebGPU is unavailable.
 */
export function StarRiver() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "webgpu" | "fallback">("pending");

  useEffect(() => {
    if (!supportsWebGPU()) {
      setMode("fallback");
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let raf = 0;
    let renderer: {
      domElement: HTMLCanvasElement;
      setSize: (w: number, h: number) => void;
      setPixelRatio: (r: number) => void;
      init: () => Promise<void>;
      computeAsync: (n: unknown) => Promise<void>;
      render: (s: unknown, c: unknown) => void;
      dispose: () => void;
    } | null = null;
    let visible = true;

    const boot = async () => {
      const THREE = await import("three/webgpu");
      const { pass } = await import("three/tsl");
      const { bloom } = await import("three/addons/tsl/display/BloomNode.js");
      const { GalaxySimulation } = await import("../../vendor/webgpu-galaxy/galaxy.js");

      if (disposed || !hostRef.current) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
      // Slightly farther — smaller cluster in frame
      const orbitR = 17.5;
      camera.position.set(0, 11.5, orbitR);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGPURenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      // Match demo sharpness on Retina — we had capped at 1 which looked soft
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const canvas = renderer.domElement;
      canvas.className = "starflow-galaxy-canvas";
      canvas.setAttribute("aria-hidden", "true");
      host.appendChild(canvas);

      const textureLoader = new THREE.TextureLoader();
      const cloudTexture = await textureLoader.loadAsync("/hero/galaxy-cloud.png");
      if (disposed) return;

      const galaxy = new GalaxySimulation(scene, HERO_CONFIG, cloudTexture);
      galaxy.createGalaxySystem();
      galaxy.createClouds();

      {
        const count = 5000;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const radius = 100 + Math.random() * 100;
          pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          pos[i * 3 + 2] = radius * Math.cos(phi);
          const color = 0.8 + Math.random() * 0.2;
          const tint = Math.random();
          if (tint < 0.1) {
            col[i * 3] = color * 0.8;
            col[i * 3 + 1] = color * 0.9;
            col[i * 3 + 2] = color;
          } else if (tint < 0.2) {
            col[i * 3] = color;
            col[i * 3 + 1] = color * 0.8;
            col[i * 3 + 2] = color * 0.6;
          } else {
            col[i * 3] = color;
            col[i * 3 + 1] = color;
            col[i * 3 + 2] = color;
          }
        }
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        scene.add(
          new THREE.Points(
            geo,
            new THREE.PointsMaterial({
              size: 0.3,
              vertexColors: true,
              transparent: true,
              opacity: 0.8,
              sizeAttenuation: true,
            }),
          ),
        );
      }

      await renderer.init();
      if (disposed) return;

      const postProcessing = new THREE.PostProcessing(renderer);
      const scenePass = pass(scene, camera);
      const scenePassColor = scenePass.getTextureNode();
      const bloomPass = bloom(scenePassColor);
      bloomPass.threshold.value = HERO_CONFIG.bloomThreshold;
      bloomPass.strength.value = HERO_CONFIG.bloomStrength;
      bloomPass.radius.value = HERO_CONFIG.bloomRadius;
      postProcessing.outputNode = scenePassColor.add(bloomPass);

      const resize = () => {
        const parent = hostRef.current;
        if (!parent || !renderer) return;
        const { clientWidth: w, clientHeight: h } = parent;
        if (w < 2 || h < 2) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      resize();

      // Pointer drag + scroll-driven center burst
      const mouse3D = new THREE.Vector3(0, 0, 0);
      const scrollOrigin = new THREE.Vector3(0, 0, 0);
      const raycaster = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      let mousePressed = false;
      let scrollBurst = 0;

      const projectMouse = (clientX: number, clientY: number) => {
        const rect = canvas.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        raycaster.ray.intersectPlane(plane, mouse3D);
      };

      const readScrollBurst = () => {
        const range = Math.max(window.innerHeight * 0.85, 1);
        return Math.min(1, Math.max(0, window.scrollY / range));
      };

      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        mousePressed = true;
        canvas.setPointerCapture(e.pointerId);
        projectMouse(e.clientX, e.clientY);
      };
      const onPointerUp = (e: PointerEvent) => {
        mousePressed = false;
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      };
      const onPointerMove = (e: PointerEvent) => {
        projectMouse(e.clientX, e.clientY);
      };
      const onPointerLeave = () => {
        mousePressed = false;
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);

      let last = performance.now();
      let spin = 0;

      const frame = async (now: number) => {
        if (disposed || !renderer) return;
        raf = requestAnimationFrame((t) => {
          void frame(t);
        });

        const targetBurst = readScrollBurst();
        const dt = Math.min((now - last) / 1000, 0.033);
        last = now;
        scrollBurst += (targetBurst - scrollBurst) * Math.min(1, dt * 5);

        // Keep simulating while bursting even if hero is nearly off-screen
        if (!visible && scrollBurst < 0.01 && !mousePressed) return;

        // Slow orbit; pause while dragging so force feels local
        if (!mousePressed) {
          spin += dt * 0.04;
        }
        camera.position.x = Math.sin(spin) * orbitR;
        camera.position.z = Math.cos(spin) * orbitR;
        camera.position.y = 11.5;
        camera.lookAt(0, -1, 0);

        const bursting = scrollBurst > 0.02;
        if (mousePressed) {
          galaxy.updateUniforms({
            mouseForce: HERO_CONFIG.mouseForce,
            mouseRadius: HERO_CONFIG.mouseRadius,
          });
        } else if (bursting) {
          mouse3D.copy(scrollOrigin);
          galaxy.updateUniforms({
            mouseForce: 10 + scrollBurst * 42,
            mouseRadius: 10 + scrollBurst * 32,
          });
        } else {
          galaxy.updateUniforms({
            mouseForce: HERO_CONFIG.mouseForce,
            mouseRadius: HERO_CONFIG.mouseRadius,
          });
        }

        await galaxy.update(renderer, dt, mouse3D, mousePressed || bursting);
        postProcessing.render();
      };

      const io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting;
        },
        { threshold: 0.05 },
      );
      io.observe(host);

      const onResize = () => resize();
      window.addEventListener("resize", onResize);

      setMode("webgpu");
      raf = requestAnimationFrame((t) => {
        void frame(t);
      });

      (host as HTMLDivElement & { __galaxyCleanup?: () => void }).__galaxyCleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", onResize);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        try {
          renderer?.dispose();
        } catch {
          /* ignore */
        }
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    };

    boot().catch((err) => {
      console.warn("[StarRiver] WebGPU galaxy failed, using photo fallback", err);
      if (!disposed) setMode("fallback");
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      const cleanup = (host as HTMLDivElement & { __galaxyCleanup?: () => void }).__galaxyCleanup;
      cleanup?.();
    };
  }, []);

  if (mode === "fallback") return <PhotoFallback />;

  return (
    <>
      {mode === "pending" && <div className="starflow-fallback" aria-hidden="true" />}
      <div ref={hostRef} className="starflow-galaxy-host" aria-hidden="true" />
    </>
  );
}
