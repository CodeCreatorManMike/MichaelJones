'use client';
import { useEffect, useRef } from 'react';

const WIDTH = 84;
const HEIGHT = 26;
const LUMINANCE_CHARS = '.,-~:;=!*#$@';

export default function AsciiDonut() {
  const preRef = useRef(null);

  useEffect(() => {
    const output = preRef.current;
    if (!output) return;

    let rotationX = 0;
    let rotationZ = 0;
    let previousTime = 0;
    let animationFrame;

    function createDonutFrame() {
      const screen = new Array(WIDTH * HEIGHT).fill(' ');
      const depthBuffer = new Array(WIDTH * HEIGHT).fill(0);

      const sinX = Math.sin(rotationX);
      const cosX = Math.cos(rotationX);
      const sinZ = Math.sin(rotationZ);
      const cosZ = Math.cos(rotationZ);

      for (let theta = 0; theta < Math.PI * 2; theta += 0.07) {
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let phi = 0; phi < Math.PI * 2; phi += 0.02) {
          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);

          const circleX = cosTheta + 2;
          const circleY = sinTheta;

          const depth = sinPhi * circleX * sinX + circleY * cosX + 5;
          const inverseDepth = 1 / depth;

          const transformedX =
            cosPhi * circleX * cosZ -
            (sinPhi * circleX * cosX - circleY * sinX) * sinZ;

          const transformedY =
            cosPhi * circleX * sinZ +
            (sinPhi * circleX * cosX - circleY * sinX) * cosZ;

          const screenX = Math.floor(WIDTH / 2 + 30 * inverseDepth * transformedX);
          const screenY = Math.floor(HEIGHT / 2 + 15 * inverseDepth * transformedY);

          const luminance =
            cosPhi * cosTheta * sinZ -
            cosX * cosTheta * sinPhi -
            sinX * sinTheta +
            cosZ * (cosX * sinTheta - cosTheta * sinX * sinPhi);

          const index = screenX + WIDTH * screenY;

          if (
            screenY >= 0 &&
            screenY < HEIGHT &&
            screenX >= 0 &&
            screenX < WIDTH &&
            inverseDepth > depthBuffer[index]
          ) {
            depthBuffer[index] = inverseDepth;
            const brightness = Math.max(0, Math.floor(luminance * 8));
            screen[index] = LUMINANCE_CHARS[Math.min(brightness, LUMINANCE_CHARS.length - 1)];
          }
        }
      }

      let frame = '';
      for (let row = 0; row < HEIGHT; row++) {
        frame += screen.slice(row * WIDTH, (row + 1) * WIDTH).join('');
        frame += '\n';
      }
      output.textContent = frame;
    }

    function animate(currentTime) {
      if (currentTime - previousTime >= 33) {
        createDonutFrame();
        rotationX += 0.04;
        rotationZ += 0.02;
        previousTime = currentTime;
      }
      animationFrame = requestAnimationFrame(animate);
    }

    createDonutFrame();
    animationFrame = requestAnimationFrame(animate);

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(animationFrame);
      if (entry.isIntersecting) {
        previousTime = performance.now();
        animationFrame = requestAnimationFrame(animate);
      }
    });
    observer.observe(output);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="ascii-donut-wrapper">
      <pre ref={preRef} aria-label="Rotating ASCII donut" className="ascii-donut" />
    </div>
  );
}
