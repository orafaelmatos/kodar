import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/**
 * Dente estilizado em 3D (esmalte perolado), com anel e brilhos girando ao redor.
 * As cores vêm das variáveis do tema da demo (--d-accent, --d-accent-soft).
 */

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

function crownGeometry() {
  const geometry = new THREE.SphereGeometry(1, 180, 140);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i);
    const theta = Math.atan2(v.z, v.x);
    const radial = Math.hypot(v.x, v.z);
    // Contorno de quadrado arredondado visto de cima.
    const square =
      1 / Math.pow(Math.pow(Math.abs(Math.cos(theta)), 4) + Math.pow(Math.abs(Math.sin(theta)), 4), 0.25);
    const shape = 1 + 0.22 * (square - 1);
    // Perfil de sino: mais largo em cima, estreito no colo do dente.
    const bell = 1 + 0.07 * v.y - 0.28 * smooth(-0.1, -1, v.y);
    let x = v.x * shape * bell * 0.98;
    let z = v.z * shape * bell * 0.86;
    let y = v.y < 0 ? v.y * 0.7 : v.y * 0.82;
    // Cúspides, sulco central e fissuras em cruz no topo.
    const top = smooth(0.3, 1, v.y);
    const cusps = 0.5 + 0.5 * Math.cos(4 * (theta - Math.PI / 4));
    y += top * 0.15 * cusps;
    y -= top * 0.1 * Math.exp(-(radial * radial) / 0.08);
    y -= top * 0.03 * (Math.exp(-(v.x * v.x) / 0.01) + Math.exp(-(v.z * v.z) / 0.01));
    // Leve irregularidade para parecer orgânico.
    const bulge = 1 + 0.03 * Math.sin(theta * 2 + v.y * 3);
    x *= bulge;
    z *= bulge;
    position.setXYZ(i, x, y, z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** Tronco da raiz: liga a coroa às raízes para o dente parecer uma peça só. */
function trunkGeometry() {
  const points = [
    new THREE.Vector2(0.001, 0.06),
    new THREE.Vector2(0.52, 0.05),
    new THREE.Vector2(0.57, -0.12),
    new THREE.Vector2(0.55, -0.3),
    new THREE.Vector2(0.47, -0.46),
    new THREE.Vector2(0.001, -0.48),
  ];
  return new THREE.LatheGeometry(points, 72);
}

/** Raiz cônica, levemente curvada para fora (side = -1 esquerda, 1 direita). */
function rootGeometry(side: number) {
  const points = [
    new THREE.Vector2(0.001, 0.1),
    new THREE.Vector2(0.35, 0.08),
    new THREE.Vector2(0.35, -0.25),
    new THREE.Vector2(0.31, -0.6),
    new THREE.Vector2(0.24, -0.92),
    new THREE.Vector2(0.14, -1.15),
    new THREE.Vector2(0.001, -1.22),
  ];
  const geometry = new THREE.LatheGeometry(points, 64);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < position.count; i++) {
    const y = position.getY(i);
    position.setX(i, position.getX(i) + side * 0.1 * y * y);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function sparkleGeometry() {
  const shape = new THREE.Shape();
  const outer = 1;
  const inner = 0.22;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.PI / 2;
    const radius = i % 2 === 0 ? outer : inner;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  }).center();
}

export async function createToothScene(canvas: HTMLCanvasElement, container: HTMLElement) {
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
  const style = getComputedStyle(container);
  const accent = style.getPropertyValue("--d-accent").trim() || "#0b7f8c";
  const glow = style.getPropertyValue("--d-glow").trim() || "#5fd4e0";
  const lowTier = window.matchMedia("(pointer: coarse)").matches;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowTier ? 1.5 : 2));
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0.2, 9);

  const generator = new THREE.PMREMGenerator(renderer);
  const environment = new RoomEnvironment();
  const envTexture = generator.fromScene(environment, 0.04).texture;
  scene.environment = envTexture;
  environment.dispose();
  generator.dispose();

  const enamel = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.2,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    sheen: 0.7,
    sheenColor: new THREE.Color(glow),
    sheenRoughness: 0.4,
    iridescence: 0.25,
    envMapIntensity: 1.15,
  });
  const accentMaterial = new THREE.MeshPhysicalMaterial({
    color: accent,
    roughness: 0.25,
    metalness: 0.3,
    clearcoat: 1,
    emissive: new THREE.Color(glow),
    emissiveIntensity: 0.25,
  });
  const ringMaterial = new THREE.MeshBasicMaterial({ color: glow, transparent: true, opacity: 0.45 });

  const crown = crownGeometry();
  const trunk = trunkGeometry();
  const roots = [rootGeometry(-1), rootGeometry(1)];
  const sparkle = sparkleGeometry();
  const ring = new THREE.TorusGeometry(2.25, 0.012, 8, 160);
  const dot = new THREE.SphereGeometry(0.07, 16, 12);

  const tooth = new THREE.Group();
  tooth.add(new THREE.Mesh(crown, enamel));
  const trunkMesh = new THREE.Mesh(trunk, enamel);
  trunkMesh.position.y = -0.4;
  trunkMesh.scale.set(1, 1, 0.88);
  tooth.add(trunkMesh);
  roots.forEach((geometry, index) => {
    const side = index === 0 ? -1 : 1;
    const mesh = new THREE.Mesh(geometry, enamel);
    mesh.position.set(side * 0.29, -0.8, 0);
    mesh.rotation.z = side * 0.06;
    mesh.scale.set(1, 1, 0.85);
    tooth.add(mesh);
  });
  tooth.scale.setScalar(1);
  tooth.position.y = 0.5;

  const orbit = new THREE.Group();
  const ringA = new THREE.Mesh(ring, ringMaterial);
  ringA.rotation.x = Math.PI / 2.3;
  const ringB = new THREE.Mesh(ring, ringMaterial);
  ringB.scale.setScalar(0.82);
  ringB.rotation.set(Math.PI / 2.1, 0.5, 0);
  const satellite = new THREE.Mesh(dot, accentMaterial);
  orbit.add(ringA, ringB, satellite);

  const sparkles = [
    { x: 1.9, y: 1.4, z: 0.4, s: 0.26 },
    { x: -2.0, y: 0.6, z: 0.2, s: 0.18 },
    { x: 1.4, y: -1.5, z: 0.6, s: 0.14 },
    { x: -1.3, y: 1.9, z: -0.4, s: 0.12 },
  ].map((spec, index) => {
    const mesh = new THREE.Mesh(sparkle, index === 0 ? accentMaterial : enamel);
    mesh.position.set(spec.x, spec.y, spec.z);
    mesh.scale.setScalar(spec.s);
    scene.add(mesh);
    return { mesh, spec, phase: index * 1.7 };
  });

  scene.add(tooth, orbit);
  const key = new THREE.DirectionalLight("#ffffff", 2.4);
  key.position.set(-3, 5, 6);
  const rim = new THREE.DirectionalLight(glow, 3);
  rim.position.set(4, 2, -5);
  scene.add(key, rim, new THREE.AmbientLight("#ffffff", 0.35));

  await renderer.compileAsync(scene, camera);

  const pointer = new THREE.Vector2();
  const eased = new THREE.Vector2();
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  let previous = 0;
  let time = 0;
  let intro = media.matches ? 1 : 0;
  let visible = true;
  let disposed = false;

  const render = (now: number) => {
    frame = 0;
    if (disposed) return;
    const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    const still = media.matches;
    if (!still) {
      time += delta;
      intro = Math.min(intro + delta / 1.4, 1);
    }
    eased.lerp(pointer, 0.06);
    const pop = 1 - Math.pow(1 - intro, 3);

    tooth.rotation.y = -0.5 + time * 0.35 + eased.x * 0.5;
    tooth.rotation.x = 0.26 + Math.sin(time * 0.6) * 0.06 + eased.y * 0.2;
    tooth.rotation.z = Math.sin(time * 0.5) * 0.05;
    tooth.position.y = 0.5 + Math.sin(time * 1.1) * 0.08 - (1 - pop) * 0.8;
    tooth.scale.setScalar(0.6 + 0.4 * pop);
    orbit.rotation.y = time * 0.25;
    orbit.rotation.z = Math.sin(time * 0.3) * 0.1;
    satellite.position.set(Math.cos(time * 0.9) * 2.25, 0, Math.sin(time * 0.9) * 2.25);
    satellite.position.applyEuler(ringA.rotation);
    sparkles.forEach(({ mesh, spec, phase }) => {
      const pulse = 0.75 + 0.25 * Math.sin(time * 2 + phase);
      mesh.scale.setScalar(spec.s * pulse * pop);
      mesh.rotation.z = time * 0.6 + phase;
      mesh.position.y = spec.y + Math.sin(time + phase) * 0.12;
    });

    renderer.render(scene, camera);
    if (visible && !document.hidden && !still) frame = requestAnimationFrame(render);
  };
  const start = () => {
    if (!frame && !disposed && visible && !document.hidden) {
      previous = 0;
      frame = requestAnimationFrame(render);
    }
  };
  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 0.9 ? 10.5 : 9;
    camera.updateProjectionMatrix();
    start();
  };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    pointer.set(
      (event.clientX / window.innerWidth - 0.5) * 2,
      (event.clientY / window.innerHeight - 0.5) * 2,
    );
  };
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  });
  io.observe(container);
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  window.addEventListener("pointermove", onPointer);
  document.addEventListener("visibilitychange", start);
  media.addEventListener("change", start);
  resize();
  container.dataset.ready = "true";

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", start);
    media.removeEventListener("change", start);
    [crown, trunk, ...roots, sparkle, ring, dot].forEach((geometry) => geometry.dispose());
    [enamel, accentMaterial, ringMaterial].forEach((material) => material.dispose());
    envTexture.dispose();
    renderer.dispose();
  };
}
