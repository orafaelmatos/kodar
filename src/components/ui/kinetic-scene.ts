import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function roundedRectangle(path: THREE.Path, width: number, height: number, radius: number) {
  const x = -width / 2,
    y = -height / 2;
  path.moveTo(x + radius, y);
  path.lineTo(x + width - radius, y);
  path.quadraticCurveTo(x + width, y, x + width, y + radius);
  path.lineTo(x + width, y + height - radius);
  path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  path.lineTo(x + radius, y + height);
  path.quadraticCurveTo(x, y + height, x, y + height - radius);
  path.lineTo(x, y + radius);
  path.quadraticCurveTo(x, y, x + radius, y);
}

const yieldToBrowser = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

export async function createKineticScene(canvas: HTMLCanvasElement, container: HTMLElement) {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return () => {};
  }
  const palette = getComputedStyle(document.documentElement);
  const mint = palette.getPropertyValue("--menta").trim();
  const paper = palette.getPropertyValue("--papel").trim();
  const night = palette.getPropertyValue("--noite-claro").trim();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.debug.checkShaderErrors = process.env.NODE_ENV !== "production";
  renderer.setClearColor(0, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
  camera.position.set(0, 0, 9.7);
  await yieldToBrowser();
  const environment = new RoomEnvironment();
  await renderer.compileAsync(environment, new THREE.PerspectiveCamera(90, 1, 0.1, 100));
  await yieldToBrowser();
  const generator = new THREE.PMREMGenerator(renderer);
  const texture = generator.fromScene(environment, 0);
  scene.environment = texture.texture;
  environment.dispose();
  generator.dispose();
  await yieldToBrowser();

  const sculpture = new THREE.Group();
  scene.add(sculpture);
  const shape = new THREE.Shape();
  roundedRectangle(shape, 3.35, 3.85, 0.24);
  const hole = new THREE.Path();
  roundedRectangle(hole, 2.78, 3.28, 0.12);
  shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.11,
    bevelEnabled: true,
    bevelSize: 0.055,
    bevelThickness: 0.055,
    bevelSegments: 3,
    steps: 1,
    curveSegments: 12,
  });
  geometry.center();
  const mintMaterial = new THREE.MeshPhysicalMaterial({
    color: mint,
    metalness: 0.82,
    roughness: 0.24,
    clearcoat: 1,
    clearcoatRoughness: 0.18,
    envMapIntensity: 1.7,
  });
  const silverMaterial = new THREE.MeshPhysicalMaterial({
    color: paper,
    metalness: 0.95,
    roughness: 0.19,
    clearcoat: 0.8,
    envMapIntensity: 1.3,
  });
  const edgeMaterial = new THREE.MeshPhysicalMaterial({
    color: night,
    metalness: 0.85,
    roughness: 0.22,
    envMapIntensity: 1.8,
  });
  const frames: THREE.Group[] = [];
  for (let index = 0; index < 5; index++) {
    const frame = new THREE.Group();
    const mesh = new THREE.Mesh(geometry, [index % 2 === 0 ? mintMaterial : silverMaterial, edgeMaterial]);
    const scale = 1 - index * 0.125;
    mesh.scale.setScalar(scale);
    frame.add(mesh);
    frame.position.z = -0.28 * index;
    frame.rotation.z = index * 0.17;
    sculpture.add(frame);
    frames.push(frame);
  }
  const key = new THREE.DirectionalLight(paper, 4);
  key.position.set(-3, 5, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(mint, 2.5);
  fill.position.set(4, -2, 3);
  scene.add(fill);
  scene.add(new THREE.AmbientLight(paper, 0.8));
  await renderer.compileAsync(scene, camera);
  await yieldToBrowser();

  const pointer = new THREE.Vector2();
  let frameId = 0,
    lastDraw = 0,
    visible = true,
    time = 0,
    previous = 0,
    disposed = false;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isPaused = () => media.matches || document.documentElement.dataset.motion === "paused";
  const render = (now: number) => {
    frameId = 0;
    if (disposed) return;
    if (!isPaused() && now - lastDraw < 32) {
      frameId = requestAnimationFrame(render);
      return;
    }
    lastDraw = now;
    const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    if (!isPaused()) time += delta;
    const scroll = window.scrollY / Math.max(window.innerHeight, 1);
    sculpture.rotation.x = -0.16 + Math.sin(time * 0.22) * 0.13 + pointer.y * 0.12;
    sculpture.rotation.y = -0.5 + Math.sin(time * 0.18) * 0.18 + pointer.x * 0.2 + Math.min(scroll, 1) * 0.35;
    sculpture.rotation.z = -0.36 + Math.sin(time * 0.12) * 0.07;
    sculpture.position.y = Math.sin(time * 0.55) * 0.09;
    frames.forEach((frame, index) => {
      frame.rotation.z = index * 0.19 + Math.sin(time * 0.35 - index * 0.45) * 0.16;
      frame.rotation.y = Math.sin(time * 0.28 - index * 0.25) * 0.13;
      frame.position.z = -0.28 * index + Math.sin(time * 0.4 + index * 0.5) * 0.07;
    });
    renderer.render(scene, camera);
    if (visible && !document.hidden && !isPaused()) frameId = requestAnimationFrame(render);
  };
  const start = () => {
    if (!frameId && !disposed && visible && !document.hidden) {
      previous = 0;
      frameId = requestAnimationFrame(render);
    }
  };
  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width < 600 ? 8.1 : 9.7;
    camera.updateProjectionMatrix();
    start();
  };
  const pointerMove = (event: PointerEvent) => {
    if (isPaused() || event.pointerType !== "mouse") return;
    const bounds = container.getBoundingClientRect();
    pointer.set(
      ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
    );
    start();
  };
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }
  });
  visibility.observe(container);
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  const parent = container.closest("section") ?? container;
  parent.addEventListener("pointermove", pointerMove as EventListener);
  window.addEventListener("kodar:motion", start);
  media.addEventListener("change", start);
  document.addEventListener("visibilitychange", start);
  resize();
  container.dataset.ready = "true";
  return () => {
    disposed = true;
    cancelAnimationFrame(frameId);
    visibility.disconnect();
    observer.disconnect();
    parent.removeEventListener("pointermove", pointerMove as EventListener);
    window.removeEventListener("kodar:motion", start);
    media.removeEventListener("change", start);
    document.removeEventListener("visibilitychange", start);
    geometry.dispose();
    mintMaterial.dispose();
    silverMaterial.dispose();
    edgeMaterial.dispose();
    texture.dispose();
    renderer.dispose();
  };
}
