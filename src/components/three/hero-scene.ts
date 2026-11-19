import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/**
 * Cena 3D do hero: um arco de objetos em cromado, vidro e menta (o que a Kodar constrói:
 * conversa, clique, site, o colchete da marca, resultado, dados e automação), ligados por
 * uma linha de luz que corre de um lado ao outro, sobre um fluido de luz menta ao fundo.
 * Todas as cores vêm das variáveis da marca (src/styles/tokens.css).
 */

type Palette = Record<"surface" | "noite" | "menta" | "papel" | "coral", string>;

function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement);
  const read = (name: string) => style.getPropertyValue(`--${name}`).trim();
  return {
    surface: read("surface"),
    noite: read("noite"),
    menta: read("menta"),
    papel: read("papel"),
    coral: read("coral"),
  };
}

/* ---------- Fundo: fluido de luz ---------- */

const fluidVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fluidFragment = (octaves: number) => /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform vec2 uResolution;
  uniform vec2 uFocus;
  uniform vec2 uPointer;
  uniform vec3 uBase;
  uniform vec3 uDeep;
  uniform vec3 uGlow;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < ${octaves}; i++) {
      value += amplitude * noise(p);
      p = mat2(1.6, 1.2, -1.2, 1.6) * p;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = uv * 1.8 + uPointer * 0.08;
    float t = uTime * 0.06;
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 3.0 * q + vec2(8.3, 2.8) - t));
    float n = fbm(p + 2.6 * r);

    vec2 d = (uv - uFocus) * vec2(0.62, 1.15);
    float mask = smoothstep(0.85, 0.0, length(d)) * uIntro;

    vec3 color = uBase;
    color = mix(color, uDeep, smoothstep(0.4, 0.9, n) * mask * 0.6);
    color += uGlow * pow(smoothstep(0.55, 1.0, n), 2.4) * mask * 0.42;
    color += uGlow * pow(max(0.0, 1.0 - length(d) * 1.6), 3.0) * 0.08 * uIntro;
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

/* ---------- Linha de luz ---------- */

const flowVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const flowFragment = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float x = vUv.x;
    float edge = smoothstep(0.0, 0.12, x) * smoothstep(1.0, 0.88, x);
    float pulse = pow(smoothstep(0.75, 1.0, fract(x * 2.5 - uTime * 0.18)), 3.0);
    float alpha = (0.16 + pulse * 0.9) * edge * step(x, uProgress);
    gl_FragColor = vec4(uColor * (1.0 + pulse * 1.5), alpha);
    #include <colorspace_fragment>
  }
`;

/* ---------- Objetos ---------- */

type Materials = {
  chrome: THREE.MeshPhysicalMaterial;
  glass: THREE.MeshPhysicalMaterial;
  mint: THREE.MeshPhysicalMaterial;
  coral: THREE.MeshPhysicalMaterial;
};

type Keep = <T extends THREE.BufferGeometry>(geometry: T) => T;

function createBuilders(keep: Keep) {
  const extrude = (shape: THREE.Shape, depth: number, bevel = 0.05) =>
    keep(
      new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelSize: bevel,
        bevelThickness: bevel,
        bevelSegments: 5,
        curveSegments: 24,
      }).center(),
    );

  const roundedRect = (w: number, h: number, r: number) => {
    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;
    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  };

  function chatBubble(m: Materials) {
    const group = new THREE.Group();
    const s = new THREE.Shape();
    const w = 1.15;
    const h = 0.8;
    const r = 0.3;
    const x = -w / 2;
    const y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + 0.05);
    s.lineTo(x - 0.12, y - 0.22);
    s.lineTo(x + 0.28, y);
    s.lineTo(x + r, y);
    group.add(new THREE.Mesh(extrude(s, 0.16, 0.06), m.chrome));
    const dot = keep(new THREE.SphereGeometry(0.075, 24, 16));
    [-0.26, 0, 0.26].forEach((offset) => {
      const mesh = new THREE.Mesh(dot, m.mint);
      mesh.position.set(offset, 0.02, 0.17);
      group.add(mesh);
    });
    return group;
  }

  function cursor(m: Materials) {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0, -1.05);
    s.lineTo(0.27, -0.79);
    s.lineTo(0.47, -1.2);
    s.lineTo(0.64, -1.12);
    s.lineTo(0.45, -0.72);
    s.lineTo(0.82, -0.72);
    s.closePath();
    const group = new THREE.Group();
    group.add(new THREE.Mesh(extrude(s, 0.14, 0.05), m.chrome));
    return group;
  }

  function browserWindow(m: Materials) {
    const group = new THREE.Group();
    group.add(new THREE.Mesh(extrude(roundedRect(1.45, 1.05, 0.16), 0.08, 0.04), m.glass));
    const dot = keep(new THREE.SphereGeometry(0.05, 20, 12));
    [m.coral, m.chrome, m.mint].forEach((material, index) => {
      const mesh = new THREE.Mesh(dot, material);
      mesh.position.set(-0.56 + index * 0.15, 0.37, 0.1);
      group.add(mesh);
    });
    const headline = new THREE.Mesh(keep(new RoundedBoxGeometry(0.8, 0.12, 0.06, 3, 0.03)), m.chrome);
    headline.position.set(-0.2, 0.12, 0.1);
    const sub = new THREE.Mesh(keep(new RoundedBoxGeometry(0.55, 0.08, 0.05, 3, 0.03)), m.chrome);
    sub.position.set(-0.32, -0.06, 0.1);
    const cta = new THREE.Mesh(keep(new RoundedBoxGeometry(0.38, 0.14, 0.07, 3, 0.06)), m.mint);
    cta.position.set(-0.4, -0.28, 0.11);
    group.add(headline, sub, cta);
    return group;
  }

  function chevron(m: Materials) {
    const group = new THREE.Group();
    const size = 0.8;
    const capsule = keep(new THREE.CapsuleGeometry(0.17, size * Math.SQRT2, 12, 32));
    const build = (material: THREE.Material, x: number, z: number) => {
      const upper = new THREE.Mesh(capsule, material);
      upper.rotation.z = -Math.PI / 4;
      upper.position.set(x, size / 2, z);
      const lower = new THREE.Mesh(capsule, material);
      lower.rotation.z = Math.PI / 4;
      lower.position.set(x, -size / 2, z);
      group.add(upper, lower);
    };
    build(m.chrome, 0.55, -0.35);
    build(m.mint, -0.05, 0);
    return group;
  }

  function chart(m: Materials) {
    const group = new THREE.Group();
    const base = new THREE.Mesh(keep(new RoundedBoxGeometry(1.25, 0.1, 0.55, 3, 0.04)), m.chrome);
    base.position.y = -0.55;
    group.add(base);
    [0.42, 0.72, 1.08].forEach((height, index) => {
      const bar = new THREE.Mesh(
        keep(new RoundedBoxGeometry(0.28, height, 0.32, 4, 0.07)),
        index === 2 ? m.mint : m.glass,
      );
      bar.position.set(-0.38 + index * 0.38, -0.5 + height / 2, 0);
      group.add(bar);
    });
    return group;
  }

  function database(m: Materials) {
    const group = new THREE.Group();
    const disk = keep(new THREE.CylinderGeometry(0.46, 0.46, 0.24, 48, 1));
    const ring = keep(new THREE.TorusGeometry(0.46, 0.022, 12, 64));
    [-0.32, 0, 0.32].forEach((y, index) => {
      const mesh = new THREE.Mesh(disk, index === 1 ? m.glass : m.chrome);
      mesh.position.y = y;
      group.add(mesh);
      const glow = new THREE.Mesh(ring, m.mint);
      glow.rotation.x = Math.PI / 2;
      glow.position.y = y + 0.13;
      group.add(glow);
    });
    const tilted = new THREE.Group();
    tilted.add(group);
    group.rotation.x = 0.35;
    return tilted;
  }

  function toggle(m: Materials) {
    const group = new THREE.Group();
    const track = new THREE.Mesh(keep(new THREE.CapsuleGeometry(0.27, 0.6, 12, 32)), m.glass);
    track.rotation.z = Math.PI / 2;
    const knob = new THREE.Mesh(keep(new THREE.SphereGeometry(0.22, 32, 24)), m.mint);
    knob.position.set(0.3, 0, 0.04);
    knob.name = "knob";
    group.add(track, knob);
    return group;
  }

  return { chatBubble, cursor, browserWindow, chevron, chart, database, toggle };
}

type Piece = {
  object: THREE.Group;
  angle: number;
  z: number;
  scale: number;
  order: number;
  phase: number;
  yaw: number;
  knob?: THREE.Object3D;
};

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const easeOutBack = (x: number) => {
  const t = clamp01(x);
  return 1 + 2.5 * Math.pow(t - 1, 3) + 1.5 * Math.pow(t - 1, 2);
};
const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
const yieldToBrowser = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

export async function createHeroScene(canvas: HTMLCanvasElement, container: HTMLElement, art: HTMLElement) {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const lowTier = coarse || (navigator.hardwareConcurrency ?? 4) <= 4;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !lowTier,
      powerPreference: lowTier ? "low-power" : "high-performance",
    });
  } catch {
    return () => {};
  }

  const geometries: THREE.BufferGeometry[] = [];
  const keep: Keep = (geometry) => {
    geometries.push(geometry);
    return geometry;
  };
  const build = createBuilders(keep);

  const p = readPalette();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowTier ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.autoClear = false;

  /* Fundo */
  const background = new THREE.Scene();
  const fluidUniforms = {
    uTime: { value: 0 },
    uIntro: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uFocus: { value: new THREE.Vector2(0, 0.1) },
    uPointer: { value: new THREE.Vector2() },
    uBase: { value: new THREE.Color(p.surface) },
    uDeep: { value: new THREE.Color(p.noite) },
    uGlow: { value: new THREE.Color(p.menta) },
  };
  const fluidMaterial = new THREE.ShaderMaterial({
    vertexShader: fluidVertex,
    fragmentShader: fluidFragment(lowTier ? 3 : 5),
    uniforms: fluidUniforms,
    depthWrite: false,
    depthTest: false,
  });
  background.add(new THREE.Mesh(keep(new THREE.PlaneGeometry(2, 2)), fluidMaterial));
  const backgroundCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  /* Cena principal */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);
  camera.position.set(0, 0, 16);

  await yieldToBrowser();
  const environment = new RoomEnvironment();
  const generator = new THREE.PMREMGenerator(renderer);
  const envTexture = generator.fromScene(environment, 0.03).texture;
  scene.environment = envTexture;
  environment.dispose();
  generator.dispose();
  await yieldToBrowser();

  const materials: Materials = {
    chrome: new THREE.MeshPhysicalMaterial({
      color: p.papel,
      metalness: 1,
      roughness: 0.14,
      envMapIntensity: 1.25,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(p.papel).lerp(new THREE.Color(p.menta), 0.35),
      metalness: 0.25,
      roughness: 0.12,
      transparent: true,
      opacity: 0.62,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      iridescence: lowTier ? 0 : 0.5,
      envMapIntensity: 2.2,
    }),
    mint: new THREE.MeshPhysicalMaterial({
      color: p.menta,
      metalness: 0.55,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      emissive: new THREE.Color(p.menta),
      emissiveIntensity: 0.12,
      envMapIntensity: 1.5,
    }),
    coral: new THREE.MeshPhysicalMaterial({ color: p.coral, metalness: 0.4, roughness: 0.25, clearcoat: 1 }),
  };

  const rig = new THREE.Group();
  scene.add(rig);

  /* Arco de objetos (da esquerda para a direita). */
  // Arco aberto: raio grande, de 152° a 28°.
  const radius = 6.4;
  const arcY = -radius * 0.74;
  const lowest = Math.sin(THREE.MathUtils.degToRad(28));
  const specs = [
    { make: build.chatBubble, angle: 152, z: -0.2, scale: 0.92, yaw: 0.45 },
    { make: build.cursor, angle: 133, z: 0.25, scale: 0.95, yaw: 0.3 },
    { make: build.browserWindow, angle: 112, z: -0.1, scale: 1.05, yaw: 0.22 },
    { make: build.chevron, angle: 90, z: 0.3, scale: 1.12, yaw: 0 },
    { make: build.chart, angle: 68, z: -0.1, scale: 1.0, yaw: -0.25 },
    { make: build.database, angle: 47, z: 0.2, scale: 0.92, yaw: -0.3 },
    { make: build.toggle, angle: 28, z: -0.2, scale: 1.05, yaw: -0.45 },
  ];
  const pieces: Piece[] = specs.map((spec, index) => {
    const object = spec.make(materials);
    rig.add(object);
    return {
      object,
      angle: THREE.MathUtils.degToRad(spec.angle),
      z: spec.z,
      scale: spec.scale,
      order: Math.abs(index - 3),
      phase: index * 0.9,
      yaw: spec.yaw,
      knob: object.getObjectByName("knob"),
    };
  });
  const arcPoint = (angle: number, spread = 1) =>
    new THREE.Vector3(Math.cos(angle) * radius * spread, Math.sin(angle) * radius + arcY, 0);

  /* Linha de luz passando pelo arco, entrando e saindo da tela. */
  const flowPoints = [
    new THREE.Vector3(-12, arcY + radius * lowest - 0.6, -1.6),
    ...pieces.map((piece) => {
      const point = arcPoint(piece.angle);
      point.z = -0.7;
      return point;
    }),
    new THREE.Vector3(12, arcY + radius * lowest - 0.6, -1.6),
  ];
  const flowUniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uColor: { value: new THREE.Color(p.menta) },
  };
  const flowMaterial = new THREE.ShaderMaterial({
    vertexShader: flowVertex,
    fragmentShader: flowFragment,
    uniforms: flowUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const flowCurve = new THREE.CatmullRomCurve3(flowPoints, false, "centripetal");
  rig.add(new THREE.Mesh(keep(new THREE.TubeGeometry(flowCurve, 260, 0.014, 8)), flowMaterial));

  /* Partículas finas. */
  const count = lowTier ? 70 : 140;
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index++) {
    positions[index * 3] = (Math.random() - 0.5) * 18;
    positions[index * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[index * 3 + 2] = (Math.random() - 0.5) * 6 - 1.5;
  }
  const dustGeometry = keep(new THREE.BufferGeometry());
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dustMaterial = new THREE.PointsMaterial({
    color: p.papel,
    size: 0.025,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });
  const dust = new THREE.Points(dustGeometry, dustMaterial);
  rig.add(dust);

  /* Luz de estúdio com recorte menta. */
  const key = new THREE.DirectionalLight(p.papel, 2.2);
  key.position.set(-3, 6, 7);
  const rimLeft = new THREE.DirectionalLight(p.menta, 3.5);
  rimLeft.position.set(-7, 1, -4);
  const rimRight = new THREE.DirectionalLight(p.menta, 3.5);
  rimRight.position.set(7, 1, -4);
  scene.add(key, rimLeft, rimRight, new THREE.AmbientLight(p.papel, 0.2));

  await renderer.compileAsync(scene, camera);
  await yieldToBrowser();

  /* ---------- Loop ---------- */
  const pointer = new THREE.Vector2();
  const smooth = new THREE.Vector2();
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isPaused = () => media.matches || document.documentElement.dataset.motion === "paused";
  const frameBudget = lowTier ? 32 : 15;
  const layout = { y: 0, scale: 1 };
  let frameId = 0;
  let lastDraw = 0;
  let previous = 0;
  let time = 0;
  let intro = isPaused() ? 10 : 0;
  let visible = true;
  let disposed = false;

  const render = (now: number) => {
    frameId = 0;
    if (disposed) return;
    const paused = isPaused();
    if (!paused && now - lastDraw < frameBudget) {
      frameId = requestAnimationFrame(render);
      return;
    }
    lastDraw = now;
    const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    if (paused) intro = Math.max(intro, 10);
    else {
      time += delta;
      intro += delta;
    }

    const bounds = container.getBoundingClientRect();
    const scroll = clamp01(-bounds.top / Math.max(bounds.height, 1));
    smooth.lerp(pointer, paused ? 1 : 0.05);

    rig.position.set(smooth.x * 0.15, layout.y + scroll * 1.6 * layout.scale, 0);
    rig.scale.setScalar(layout.scale);
    rig.rotation.y = smooth.x * 0.08;
    rig.rotation.x = -smooth.y * 0.05;

    const spread = 1 + scroll * 0.35;
    pieces.forEach((piece) => {
      const local = (intro - 0.25 - piece.order * 0.12) / 1.1;
      const point = arcPoint(piece.angle, spread);
      piece.object.position.set(
        point.x,
        point.y + Math.sin(time * 0.9 + piece.phase) * 0.07 - (1 - easeOut(local)) * 0.8,
        piece.z + Math.cos(time * 0.6 + piece.phase) * 0.06,
      );
      piece.object.scale.setScalar(piece.scale * Math.max(easeOutBack(local), 0.0001));
      piece.object.rotation.set(
        Math.sin(time * 0.5 + piece.phase) * 0.08 + smooth.y * 0.15,
        piece.yaw + Math.sin(time * 0.4 + piece.phase) * 0.22 + smooth.x * 0.3,
        Math.sin(time * 0.35 + piece.phase) * 0.05,
      );
      if (piece.knob) {
        const wave = Math.sin(time * 0.6);
        piece.knob.position.x = 0.3 * Math.sign(wave) * Math.min(1, Math.abs(wave) * 5);
      }
    });

    flowUniforms.uTime.value = time;
    flowUniforms.uProgress.value = easeOut((intro - 0.6) / 1.6) * 1.001;
    dust.rotation.y = time * 0.015;
    fluidUniforms.uTime.value = time;
    fluidUniforms.uIntro.value = easeOut(intro / 2);
    fluidUniforms.uPointer.value.copy(smooth);

    renderer.clear();
    renderer.render(background, backgroundCamera);
    renderer.render(scene, camera);
    if (visible && !document.hidden && !paused) frameId = requestAnimationFrame(render);
  };

  const start = () => {
    if (!frameId && !disposed && visible && !document.hidden) {
      previous = 0;
      frameId = requestAnimationFrame(render);
    }
  };

  const resize = () => {
    const { width, height, top } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    fluidUniforms.uResolution.value.set(width, height);

    // Encaixa o arco na área de arte (acima do texto).
    const artBox = art.getBoundingClientRect();
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const visibleWidth = visibleHeight * camera.aspect;
    const artHeight = (artBox.height / height) * visibleHeight;
    const arcWidth = 2 * radius * Math.cos(THREE.MathUtils.degToRad(28)) + 2;
    const arcHeight = radius * (1 - lowest) + 1.8;
    const widthFit = camera.aspect < 0.8 ? 1.22 : 0.84; // no celular o arco sangra pelas laterais
    layout.scale = Math.min((visibleWidth * widthFit) / arcWidth, (artHeight * 0.8) / arcHeight, 1.1);
    const artCenter = artBox.top - top + artBox.height * 0.6;
    const centerWorld = (0.5 - artCenter / height) * visibleHeight;
    layout.y = centerWorld - (arcY + (radius * (1 + lowest)) / 2) * layout.scale;
    fluidUniforms.uFocus.value.set(0, 0.5 - (artBox.top - top + artBox.height * 0.7) / height);
    start();
  };

  const pointerMove = (event: PointerEvent) => {
    if (isPaused() || event.pointerType !== "mouse") return;
    pointer.set(
      (event.clientX / window.innerWidth - 0.5) * 2,
      (event.clientY / window.innerHeight - 0.5) * 2,
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
  window.addEventListener("pointermove", pointerMove);
  window.addEventListener("scroll", start, { passive: true });
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
    window.removeEventListener("pointermove", pointerMove);
    window.removeEventListener("scroll", start);
    window.removeEventListener("kodar:motion", start);
    media.removeEventListener("change", start);
    document.removeEventListener("visibilitychange", start);
    geometries.forEach((geometry) => geometry.dispose());
    Object.values(materials).forEach((material) => material.dispose());
    fluidMaterial.dispose();
    flowMaterial.dispose();
    dustMaterial.dispose();
    envTexture.dispose();
    renderer.dispose();
  };
}
