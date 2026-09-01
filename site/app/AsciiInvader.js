'use client';
import { useEffect, useRef } from 'react';

const W = 80;
const H = 38;
const RAMP = '.,-~:;=!*#$@';

export default function AsciiInvader() {
  const preRef = useRef(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    let yaw = -0.4, pitch = -0.08;
    const pts = [];
    const sprite = [
      '0010000000100',
      '0001000001000',
      '0011111111100',
      '0110111110110',
      '1111111111111',
      '1011111111101',
      '1010000000101',
      '0001100011000',
      '0011000001100',
    ];
    const scale = .54, depth3 = .72;
    const add = (x, y, z, nx, ny, nz) => pts.push({ x, y, z, nx, ny, nz });

    function pixelBox(cx, cy) {
      const s = scale * .92, d = depth3, step = .15;
      for (let x = -s / 2; x <= s / 2; x += step) for (let y = -s / 2; y <= s / 2; y += step) { add(cx + x, cy + y, d / 2, 0, 0, 1); add(cx + x, cy + y, -d / 2, 0, 0, -1); }
      for (let z = -d / 2; z <= d / 2; z += step) for (let y = -s / 2; y <= s / 2; y += step) { add(cx + s / 2, cy + y, z, 1, 0, 0); add(cx - s / 2, cy + y, z, -1, 0, 0); }
      for (let z = -d / 2; z <= d / 2; z += step) for (let x = -s / 2; x <= s / 2; x += step) { add(cx + x, cy + s / 2, z, 0, 1, 0); add(cx + x, cy - s / 2, z, 0, -1, 0); }
    }
    sprite.forEach((row, r) => [...row].forEach((v, c) => { if (v === '1') pixelBox((c - 6) * scale, (4 - r) * scale); }));

    function frame(t) {
      const buf = new Array(W * H).fill(' ');
      const zbuf = new Float32Array(W * H);
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch);
      const bob = Math.sin(t * .0022) * .10;
      for (const p of pts) {
        const x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx + bob, z2 = p.y * sx + z1 * cx;
        const nx1 = p.nx * cy + p.nz * sy, nz1 = -p.nx * sy + p.nz * cy;
        const ny2 = p.ny * cx - nz1 * sx, nz2 = p.ny * sx + nz1 * cx;
        const d = 11 - z2, inv = 1 / d, X = Math.round(W / 2 + x1 * inv * 76), Y = Math.round(H / 2 - y2 * inv * 41);
        if (X < 0 || X >= W || Y < 0 || Y >= H) continue;
        const i = X + Y * W;
        if (inv <= zbuf[i]) continue;
        zbuf[i] = inv;
        let light = Math.max(0, nx1 * (-.42) + ny2 * .38 + nz2 * .82);
        light = Math.max(.06, light);
        buf[i] = RAMP[Math.min(RAMP.length - 1, Math.floor(light * (RAMP.length - 1)))];
      }

      const phase = Math.floor(t / 180) % 16;
      for (let k = 0; k < 5; k++) {
        const y = H - 4 - ((phase + k * 5) % 25), x = 8 + k * 16;
        if (y > 1 && y < H - 1) buf[x + y * W] = k % 2 ? '*' : '+';
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
      <pre ref={preRef} aria-label="Rotating ASCII arcade invader" className="ascii-fx" />
    </div>
  );
}
