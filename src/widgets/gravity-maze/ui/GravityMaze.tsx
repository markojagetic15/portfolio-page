import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReveal } from "../../../shared/lib/hooks/useReveal";
import styles from "./GravityMaze.module.css";

const MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const ROWS = MAZE.length;
const COLS = MAZE[0].length;
const CELL = 1.2;
const WALL_H = 0.6;
const BALL_R = 0.22;
const START = { row: 1, col: 1 };
const END = { row: 13, col: 13 };
const MAX_TILT = Math.PI / 10;
const GRAVITY = 40;
const FRICTION = 0.980;
const RESTITUTION = 0.28;
const MAX_SPEED = 18;

function cellToWorld(row: number, col: number) {
  return {
    x: (col - COLS / 2 + 0.5) * CELL,
    z: (row - ROWS / 2 + 0.5) * CELL,
  };
}

export default function GravityMaze() {
  const headerRef = useReveal();
  const wrapRef = useReveal(0.05);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const activeRef = useRef(false);

  const [active, setActive] = useState(false);
  const [won, setWon] = useState(false);
  const [solveTime, setSolveTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(() => {
    const s = localStorage.getItem("maze-best");
    return s ? parseInt(s) : null;
  });

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getSize = () => ({ w: canvas.clientWidth, h: canvas.clientHeight });
    const { w, h } = getSize();

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a14);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 20, 9);
    camera.lookAt(0, 0, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0x1a2a4a, 2.8));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(8, 14, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -14;
    sun.shadow.camera.right = 14;
    sun.shadow.camera.top = 14;
    sun.shadow.camera.bottom = -14;
    scene.add(sun);
    scene.add(new THREE.DirectionalLight(0x2a4a8a, 0.5).translateX(-8).translateY(4).translateZ(-6));

    const ballLight = new THREE.PointLight(0x58a6ff, 5, 4);
    scene.add(ballLight);

    // Board group
    const board = new THREE.Group();
    scene.add(board);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(COLS * CELL + 1.5, ROWS * CELL + 1.5),
      new THREE.MeshStandardMaterial({ color: 0x070d1a, roughness: 0.9, metalness: 0.1 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    board.add(floor);

    // Subtle grid
    const grid = new THREE.GridHelper(COLS * CELL, COLS, 0x0c2040, 0x091830);
    grid.position.y = 0.004;
    board.add(grid);

    // Walls
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0b1626,
      roughness: 0.55,
      metalness: 0.55,
      emissive: 0x07101e,
      emissiveIntensity: 0.5,
    });
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x1e4878 });

    MAZE.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell !== 1) return;
        const { x, z } = cellToWorld(r, c);
        const geo = new THREE.BoxGeometry(CELL, WALL_H, CELL);
        const mesh = new THREE.Mesh(geo, wallMat);
        mesh.position.set(x, WALL_H / 2, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        board.add(mesh);
        const lines = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
        lines.position.copy(mesh.position);
        board.add(lines);
      });
    });

    // Start marker
    const sp = cellToWorld(START.row, START.col);
    const startMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.06, 24),
      new THREE.MeshStandardMaterial({ color: 0x3fb950, emissive: 0x3fb950, emissiveIntensity: 0.7, roughness: 0.3 })
    );
    startMesh.position.set(sp.x, 0.03, sp.z);
    board.add(startMesh);
    const startLight = new THREE.PointLight(0x3fb950, 1.5, 2);
    startLight.position.set(sp.x, 0.6, sp.z);
    board.add(startLight);

    // End marker
    const ep = cellToWorld(END.row, END.col);
    const endMat = new THREE.MeshStandardMaterial({ color: 0x58a6ff, emissive: 0x58a6ff, emissiveIntensity: 1.0, roughness: 0.3 });
    const endMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.06, 24), endMat);
    endMesh.position.set(ep.x, 0.03, ep.z);
    board.add(endMesh);
    const endLight = new THREE.PointLight(0x58a6ff, 3, 3);
    endLight.position.set(ep.x, 0.8, ep.z);
    board.add(endLight);

    // Ball
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xe0e8ff, metalness: 0.92, roughness: 0.08,
      emissive: 0x1a3a80, emissiveIntensity: 0.4,
    });
    const ball = new THREE.Mesh(new THREE.SphereGeometry(BALL_R, 28, 28), ballMat);
    ball.castShadow = true;
    board.add(ball);

    // Physics
    const startWorld = cellToWorld(START.row, START.col);
    const pos = { x: startWorld.x, z: startWorld.z };
    const vel = { x: 0, z: 0 };
    let tiltX = 0, tiltZ = 0;
    let targetTiltX = 0, targetTiltZ = 0;
    let finished = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!activeRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetTiltX = ny * MAX_TILT;
      targetTiltZ = -nx * MAX_TILT;
    };
    const onMouseLeave = () => { targetTiltX = 0; targetTiltZ = 0; };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const onTouchMove = (e: TouchEvent) => {
      if (!activeRef.current) return;
      e.preventDefault();
      const t = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const nx = ((t.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((t.clientY - rect.top) / rect.height) * 2 - 1;
      targetTiltX = ny * MAX_TILT;
      targetTiltZ = -nx * MAX_TILT;
    };
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });

    startTimeRef.current = performance.now();
    let lastTime = performance.now();
    let wonLocal = false;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth tilt
      tiltX += (targetTiltX - tiltX) * 0.1;
      tiltZ += (targetTiltZ - tiltZ) * 0.1;
      board.rotation.x = tiltX;
      board.rotation.z = tiltZ;

      if (!wonLocal && activeRef.current) {
        const ax = -GRAVITY * Math.sin(tiltZ);
        const az = GRAVITY * Math.sin(tiltX);
        vel.x += ax * dt;
        vel.z += az * dt;
        vel.x *= FRICTION;
        vel.z *= FRICTION;

        const spd = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
        if (spd > MAX_SPEED) { vel.x = vel.x / spd * MAX_SPEED; vel.z = vel.z / spd * MAX_SPEED; }

        pos.x += vel.x * dt;
        pos.z += vel.z * dt;

        for (let pass = 0; pass < 3; pass++) {
          MAZE.forEach((row, r) => {
            row.forEach((cell, c) => {
              if (cell !== 1) return;
              const { x: wx, z: wz } = cellToWorld(r, c);
              if (Math.abs(pos.x - wx) > CELL || Math.abs(pos.z - wz) > CELL) return;
              const cx = Math.max(wx - CELL / 2, Math.min(pos.x, wx + CELL / 2));
              const cz = Math.max(wz - CELL / 2, Math.min(pos.z, wz + CELL / 2));
              const dx = pos.x - cx, dz = pos.z - cz;
              const dist = Math.sqrt(dx * dx + dz * dz);
              if (dist < BALL_R + 0.005 && dist > 0.0001) {
                const nx = dx / dist, nz = dz / dist;
                const pen = BALL_R + 0.005 - dist;
                pos.x += nx * pen; pos.z += nz * pen;
                const dot = vel.x * nx + vel.z * nz;
                if (dot < 0) { vel.x -= (1 + RESTITUTION) * dot * nx; vel.z -= (1 + RESTITUTION) * dot * nz; }
              }
            });
          });
        }

        ball.position.set(pos.x, BALL_R, pos.z);
        ballLight.position.set(pos.x, BALL_R + 1, pos.z);
        if (spd > 0.01) {
          ball.rotation.z -= vel.x * dt / BALL_R;
          ball.rotation.x += vel.z * dt / BALL_R;
        }

        const dx = pos.x - ep.x, dz = pos.z - ep.z;
        if (Math.sqrt(dx * dx + dz * dz) < CELL * 0.4) {
          wonLocal = true;
          finished = true;
          const elapsed = Math.floor((now - startTimeRef.current) / 1000);
          ballMat.emissive.set(0x3fb950);
          ballLight.color.set(0x3fb950);
          setSolveTime(elapsed);
          setWon(true);
          setBestTime(prev => {
            const best = prev === null || elapsed < prev ? elapsed : prev;
            localStorage.setItem("maze-best", String(best));
            return best;
          });
        }
      }

      // End marker pulse
      endMesh.position.y = 0.03 + Math.sin(now * 0.003) * 0.05;
      endMat.emissiveIntensity = 0.8 + Math.sin(now * 0.003) * 0.4;
      endLight.intensity = 2.5 + Math.sin(now * 0.003) * 1.0;

      renderer.render(scene, camera);
      void finished;
    };

    animate();

    const onResize = () => {
      const { w, h } = getSize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  const handlePlayAgain = () => {
    setWon(false);
    setActive(false);
    setTimeout(() => {
      window.location.hash = "";
      window.dispatchEvent(new CustomEvent("maze:reset"));
    }, 50);
  };

  useEffect(() => {
    const reset = () => {
      setWon(false);
      setActive(false);
    };
    window.addEventListener("maze:reset", reset);
    return () => window.removeEventListener("maze:reset", reset);
  }, []);

  return (
    <section id="game" className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal`} ref={headerRef}>
          <span className={styles.sectionLabel}>Mini Game</span>
          <h2 className={styles.sectionTitle}>Gravity Maze</h2>
          <p className={styles.sectionSub}>
            Tilt the board to guide the ball from <span className={styles.green}>green</span> to <span className={styles.blue}>blue</span>.
            {bestTime !== null && <span className={styles.best}> Best: {bestTime}s</span>}
          </p>
        </div>

        <div className={`${styles.gameWrap} reveal`} ref={wrapRef}>
          <canvas ref={canvasRef} className={styles.canvas} />

          {!active && !won && (
            <div className={styles.idleOverlay} onClick={() => { setActive(true); startTimeRef.current = performance.now(); }}>
              <div className={styles.idleCard}>
                <div className={styles.idleIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <p className={styles.idleText}>Click to play</p>
                <p className={styles.idleHint}>move your mouse to tilt the board</p>
              </div>
            </div>
          )}

          {won && (
            <div className={styles.winOverlay}>
              <div className={styles.winCard}>
                <div className={styles.trophy}>🏆</div>
                <h3 className={styles.winTitle}>You made it!</h3>
                <p className={styles.winTime}>Solved in <span>{solveTime}s</span>
                  {bestTime !== null && bestTime === solveTime && <span className={styles.newBest}> · new best!</span>}
                </p>
                <div className={styles.winActions}>
                  <button className={styles.winBtn} onClick={handlePlayAgain}>Play again</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <span className={styles.legendItem}><span className={styles.dot} style={{ background: "#3fb950" }} />start</span>
          <span className={styles.legendItem}><span className={styles.dot} style={{ background: "#58a6ff" }} />goal</span>
          <span className={styles.legendDivider} />
          <span className={styles.hint}>move mouse over board to tilt · reach the blue marker</span>
        </div>
      </div>
    </section>
  );
}
