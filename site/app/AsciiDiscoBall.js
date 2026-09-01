'use client';
import { useEffect, useRef } from 'react';

const W = 80;
const H = 38;
const RAMP = '.,-~:;=!*#$@';

export default function AsciiDiscoBall() {
  const preRef = useRef(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    let yaw = -0.35, pitch = -0.12;
    const tiles = [];
    const rows = 25;
    for (let row = 1; row < rows; row++) {
      const theta = Math.PI * row / rows;
      const ringRadius = Math.sin(theta);
      const count = Math.max(8, Math.round(52 * ringRadius));
      for (let col = 0; col < count; col++) {
        const phi = Math.PI * 2 * (col + .5 * (row % 2)) / count;
        const x = 3.45 * ringRadius * Math.cos(phi);
        const y = 3.45 * Math.cos(theta);
        const z = 3.45 * ringRadius * Math.sin(phi);
        tiles.push({ x, y, z, nx: x / 3.45, ny: y / 3.45, nz: z / 3.45, row, col, seed: (row * 47 + col * 83) % 101 });
      }
    }

    function plot(buf, depth, x, y, z, ch) {
      const d = 11 - z, inv = 1 / d;
      const X = Math.round(W / 2 + x * inv * 75), Y = Math.round(H / 2 - y * inv * 38);
      if (X < 0 || X >= W || Y < 0 || Y >= H) return;
      const i = X + Y * W;
      if (inv <= depth[i]) return;
      depth[i] = inv; buf[i] = ch;
    }

    function render(time) {
      const buf = new Array(W * H).fill(' ');
      const depth = new Float32Array(W * H);
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch);
      for (const p of tiles) {
        const x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx, z2 = p.y * sx + z1 * cx;
        const nx1 = p.nx * cy + p.nz * sy, nz1 = -p.nx * sy + p.nz * cy;
        const ny2 = p.ny * cx - nz1 * sx, nz2 = p.ny * sx + nz1 * cx;

        let light = Math.max(0, nx1 * (-.45) + ny2 * .42 + nz2 * .78);
        light = Math.floor(light * 6) / 6;
        const sparkle = Math.sin(time * .004 + p.seed * 1.73 + p.col * .61);
        if (light > .48 && sparkle > .91) light = 1.2;
        else light += ((p.row + p.col) % 3) * .035;
        const ch = RAMP[Math.min(RAMP.length - 1, Math.max(0, Math.floor(light * (RAMP.length - 1))))];
        plot(buf, depth, x1, y2, z2, ch);

        if (light > .72) plot(buf, depth, x1 + .075, y2, z2 - .01, light > 1 ? '@' : '#');
      }

      for (let y = 3.55; y <= 4.18; y += .12) for (let a = 0; a < Math.PI * 2; a += .20) {
        const rad = y < 3.78 ? .72 : .42, x = rad * Math.cos(a), z = rad * Math.sin(a);
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
        plot(buf, depth, x1, y, z1, '#');
      }
      for (let y = 4.2; y <= 6.25; y += .16) {
        const sway = .08 * Math.sin(y * 6 + time * .0015);
        plot(buf, depth, sway, y, .05, '@');
      }

      const pulse = (Math.sin(time * .003) + 1) / 2;
      if (pulse > .68) {
        for (let k = 0; k < 8; k++) {
          plot(buf, depth, -4.0 - k * .23, 1.45 + k * .11, -1, '*');
          plot(buf, depth, 4.0 + k * .23, -.55 - k * .10, -1, '*');
        }
      }
      let out = '';
      for (let y = 0; y < H; y++) out += buf.slice(y * W, (y + 1) * W).join('') + '\n';
      pre.textContent = out;
    }

    let last = 0, raf;
    function animate(t) {
      if (t - last > 33) { yaw += .010; render(t); last = t; }
      raf = requestAnimationFrame(animate);
    }

    render(0);
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
      <pre ref={preRef} aria-label="Rotating ASCII disco ball" className="ascii-fx" />
    </div>
  );
}
