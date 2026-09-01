'use client';
import { useEffect, useRef } from 'react';

const W = 80;
const H = 38;
const CHARS = '.,-~:;=!*#$@';

export default function AsciiCRT() {
  const preRef = useRef(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    let ay = -0.48, ax = -0.16;
    const points = [];
    const add = (x, y, z, nx, ny, nz, boost = 0) => points.push({ x, y, z, nx, ny, nz, boost });

    function box(cx, cy, cz, sx, sy, sz, step = 0.18, boost = 0) {
      for (let x = -sx / 2; x <= sx / 2; x += step) for (let y = -sy / 2; y <= sy / 2; y += step) {
        add(cx + x, cy + y, cz + sz / 2, 0, 0, 1, boost); add(cx + x, cy + y, cz - sz / 2, 0, 0, -1, boost);
      }
      for (let z = -sz / 2; z <= sz / 2; z += step) for (let y = -sy / 2; y <= sy / 2; y += step) {
        add(cx + sx / 2, cy + y, cz + z, 1, 0, 0, boost); add(cx - sx / 2, cy + y, cz + z, -1, 0, 0, boost);
      }
      for (let x = -sx / 2; x <= sx / 2; x += step) for (let z = -sz / 2; z <= sz / 2; z += step) {
        add(cx + x, cy + sy / 2, cz + z, 0, 1, 0, boost); add(cx + x, cy - sy / 2, cz + z, 0, -1, 0, boost);
      }
    }

    box(0, .75, -.28, 5.25, 3.75, 2.05, .19);
    box(0, 2.48, .88, 5.42, .38, .28, .15, 1);
    box(0, -.98, .88, 5.42, .38, .28, .15, 1);
    box(-2.52, .75, .88, .38, 3.1, .28, .15, 1);
    box(2.52, .75, .88, .38, 3.1, .28, .15, 1);

    for (let x = -2.22; x <= 2.22; x += .22) for (let y = -.78; y <= 2.34; y += .20) {
      const curve = .96 - .035 * (x * x) - .025 * ((y - .78) * (y - .78));
      if (Math.abs(x) > 2.08 || y > 2.22 || y < -.66 || ((Math.round((x + 2.2) * 10) + Math.round(y * 10)) % 5 === 0))
        add(x, y, curve, 0, 0, 1, -2);
    }

    box(0, -1.45, .05, 1.25, .75, .85, .16, 1);
    box(0, -1.83, .10, 2.65, .30, 1.35, .17, 1);
    box(0, -2.35, 1.18, 5.55, .46, 2.05, .17, 0);
    box(0, -2.48, 2.12, 4.9, .18, 1.35, .16, 1);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 13; c++) {
      const x = -2.16 + c * .36, y = -2.37 - r * .055, z = 2.55 - r * .30;
      box(x, y, z, .22, .055, .18, .11, 2);
    }
    for (let x = .72; x < 1.85; x += .10) add(x, -.91, 1.055, 0, 0, 1, 2);
    for (let t = 0; t < Math.PI * 2; t += .3) add(2.18 + .08 * Math.cos(t), -.88 + .08 * Math.sin(t), 1.06, 0, 0, 1, 4);

    function frame() {
      const buf = new Array(W * H).fill(' ');
      const depth = new Float32Array(W * H);
      const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
      for (const p of points) {
        const x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx, z2 = p.y * sx + z1 * cx;
        const nx1 = p.nx * cy + p.nz * sy, nz1 = -p.nx * sy + p.nz * cy;
        const ny2 = p.ny * cx - nz1 * sx, nz2 = p.ny * sx + nz1 * cx;
        const d = 12 - z2, inv = 1 / d;
        const X = Math.round(W / 2 + x1 * inv * 78), Y = Math.round(H / 2 - y2 * inv * 41);
        if (X < 0 || X >= W || Y < 0 || Y >= H) continue;
        const i = X + Y * W;
        if (inv <= depth[i]) continue;
        depth[i] = inv;
        let light = nx1 * (-.35) + ny2 * (-.62) + nz2 * .70;
        light = Math.max(0, light * .72 + .28) + (p.boost * .055);
        buf[i] = CHARS[Math.min(CHARS.length - 1, Math.max(0, Math.floor(light * (CHARS.length - 1))))];
      }
      let out = '';
      for (let y = 0; y < H; y++) out += buf.slice(y * W, (y + 1) * W).join('') + '\n';
      pre.textContent = out;
    }

    let last = 0, raf;
    function animate(t) {
      if (t - last > 33) { ay += .0065; frame(); last = t; }
      raf = requestAnimationFrame(animate);
    }

    frame();
    raf = requestAnimationFrame(animate);

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(animate);
    });
    observer.observe(pre);

    return () => { cancelAnimationFrame(raf); observer.disconnect(); };
  }, []);

  return (
    <div className="ascii-fx-wrapper">
      <pre ref={preRef} aria-label="Rotating ASCII CRT computer" className="ascii-fx" />
    </div>
  );
}
