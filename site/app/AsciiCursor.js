'use client';
import { useEffect, useRef } from 'react';

const W = 80;
const H = 38;
const RAMP = '.,-~:;=!*#$@';

export default function AsciiCursor() {
  const preRef = useRef(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    let yaw = -0.48, pitch = -0.14;
    const pts = [];
    const sprite = [
      '100000000000',
      '110000000000',
      '111000000000',
      '111100000000',
      '111110000000',
      '111111000000',
      '111111100000',
      '111111110000',
      '111111111000',
      '111111111100',
      '111111000000',
      '111011000000',
      '110011000000',
      '100001100000',
      '000001100000',
      '000000110000',
    ];
    const s = .38, deep = .78;
    const add = (x, y, z, nx, ny, nz) => pts.push({ x, y, z, nx, ny, nz });
    function block(cx, cy) {
      const q = s * .92, step = .13;
      for (let x = -q / 2; x <= q / 2; x += step) for (let y = -q / 2; y <= q / 2; y += step) { add(cx + x, cy + y, deep / 2, 0, 0, 1); add(cx + x, cy + y, -deep / 2, 0, 0, -1); }
      for (let z = -deep / 2; z <= deep / 2; z += step) for (let y = -q / 2; y <= q / 2; y += step) { add(cx + q / 2, cy + y, z, 1, 0, 0); add(cx - q / 2, cy + y, z, -1, 0, 0); }
      for (let z = -deep / 2; z <= deep / 2; z += step) for (let x = -q / 2; x <= q / 2; x += step) { add(cx + x, cy + q / 2, z, 0, 1, 0); add(cx + x, cy - q / 2, z, 0, -1, 0); }
    }
    sprite.forEach((row, r) => [...row].forEach((v, c) => { if (v === '1') block((c - 4.6) * s, (7.5 - r) * s); }));

    function frame(t) {
      const buf = new Array(W * H).fill(' ');
      const zbuf = new Float32Array(W * H);
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch), bob = Math.sin(t * .0017) * .08;
      for (const p of pts) {
        const x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx + bob, z2 = p.y * sx + z1 * cx;
        const nx1 = p.nx * cy + p.nz * sy, nz1 = -p.nx * sy + p.nz * cy, ny2 = p.ny * cx - nz1 * sx, nz2 = p.ny * sx + nz1 * cx;
        const d = 11 - z2, inv = 1 / d, X = Math.round(W / 2 + x1 * inv * 82), Y = Math.round(H / 2 - y2 * inv * 43);
        if (X < 0 || X >= W || Y < 0 || Y >= H) continue;
        const i = X + Y * W;
        if (inv <= zbuf[i]) continue;
        zbuf[i] = inv;
        const light = Math.max(.05, Math.max(0, nx1 * (-.42) + ny2 * .40 + nz2 * .82));
        buf[i] = RAMP[Math.min(RAMP.length - 1, Math.floor(light * (RAMP.length - 1)))];
      }
      let out = '';
      for (let y = 0; y < H; y++) out += buf.slice(y * W, (y + 1) * W).join('') + '\n';
      pre.textContent = out;
    }

    let last = 0, raf;
    function animate(t) {
      if (t - last > 33) { yaw += .009; frame(t); last = t; }
      raf = requestAnimationFrame(animate);
    }

    frame(0);
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
      <pre ref={preRef} aria-label="Rotating ASCII 3D cursor" className="ascii-fx" />
    </div>
  );
}
