import React, { useEffect, useRef } from 'react';

/**
 * Falling Rays Component (React Bits Pro style)
 * Features dynamic, fanning pulses of light cascading downward.
 *
 * @param {string} color1 - Primary ray color (default: '#051427')
 * @param {string} color2 - Secondary / highlight pulse color (default: '#38bdf8')
 * @param {number} rayCount - Number of falling rays (default: 37)
 * @param {number} rayWidth - Base width of individual rays (default: 0.005)
 * @param {number} pulseSpeed - Speed of falling light pulses (default: 0.4)
 * @param {number} pulseWidth - Length of active light pulses (default: 0.03)
 * @param {number} trailLength - Length of trailing fade effect (default: 0.5)
 * @param {number} motionBlur - Intensity of motion blur smearing (default: 0.3)
 * @param {number} bgGlow - Ambient background glow intensity (default: 1.2)
 * @param {string} className - Additional CSS classes
 */
export default function FallingRays({
  color1 = '#051427',
  color2 = '#38bdf8',
  rayCount = 37,
  rayWidth = 0.005,
  pulseSpeed = 0.4,
  pulseWidth = 0.03,
  trailLength = 0.5,
  motionBlur = 0.3,
  bgGlow = 1.2,
  className = '',
  children,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Helper to parse hex to rgba
    const hexToRgb = (hex) => {
      let c = hex.replace('#', '');
      if (c.length === 3) {
        c = c.split('').map((char) => char + char).join('');
      }
      const num = parseInt(c, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    // Initialize ray parameters
    const rays = [];
    const initRays = () => {
      rays.length = 0;
      for (let i = 0; i < rayCount; i++) {
        // Spread evenly across the bottom with slight organic variation
        const targetXRatio = (i + 0.5) / rayCount + (Math.random() - 0.5) * 0.04;
        rays.push({
          targetXRatio,
          speedMultiplier: 0.7 + Math.random() * 0.6,
          phase: Math.random() * 2 * Math.PI,
          pulseOffset: Math.random(),
          widthFactor: 0.8 + Math.random() * 0.5,
          alphaFactor: 0.6 + Math.random() * 0.6,
        });
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    initRays();
    window.addEventListener('resize', handleResize);

    let startTime = performance.now();

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;

      // Clear or apply subtle trail blur if motionBlur is set
      ctx.clearRect(0, 0, width, height);

      // Origin point (above top center, fanning down)
      const originX = width * 0.5;
      const originY = -height * 0.15;

      // Render ambient background glow at apex
      if (bgGlow > 0) {
        const glowRadius = Math.max(width, height) * 0.7 * (bgGlow * 0.8);
        const glowGrad = ctx.createRadialGradient(
          originX,
          originY + height * 0.1,
          0,
          originX,
          originY + height * 0.1,
          glowRadius
        );
        glowGrad.addColorStop(0, `rgba(${rgb2.r}, ${rgb2.g}, ${rgb2.b}, ${0.12 * bgGlow})`);
        glowGrad.addColorStop(0.4, `rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, ${0.06 * bgGlow})`);
        glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Render each falling ray using source-over for vivid visibility on light backgrounds
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';

      for (let i = 0; i < rays.length; i++) {
        const ray = rays[i];
        const destX = ray.targetXRatio * width;
        const destY = height * 1.1;

        const dx = destX - originX;
        const dy = destY - originY;
        const rayLength = Math.sqrt(dx * dx + dy * dy);

        // Ray unit vectors
        const ux = dx / rayLength;
        const uy = dy / rayLength;

        const effectiveRayWidth = Math.max(1.5, width * rayWidth * ray.widthFactor);

        // Background subtle ray beam guide
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(destX, destY);
        ctx.strokeStyle = `rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, 0.05)`;
        ctx.lineWidth = effectiveRayWidth * 0.8;
        ctx.stroke();

        // Calculate moving pulse position along the ray
        const speed = pulseSpeed * 0.6 * ray.speedMultiplier;
        const pulseCycle = (elapsed * speed + ray.pulseOffset) % 1.0;

        // Position of the pulse center along ray (0 to 1)
        const pulseLength = Math.max(80, rayLength * (pulseWidth + trailLength * 0.25));

        const pulseHeadDist = pulseCycle * (rayLength + pulseLength);
        const pulseTailDist = pulseHeadDist - pulseLength;

        // Clamp to visible segments
        const startDist = Math.max(0, pulseTailDist);
        const endDist = Math.min(rayLength, pulseHeadDist);

        if (endDist > startDist) {
          const startX = originX + ux * startDist;
          const startY = originY + uy * startDist;
          const endX = originX + ux * endDist;
          const endY = originY + uy * endDist;

          // Gradient along the pulse: fading tail to vivid leading head
          const pulseGrad = ctx.createLinearGradient(startX, startY, endX, endY);
          pulseGrad.addColorStop(0, `rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, 0)`);
          pulseGrad.addColorStop(0.4, `rgba(${rgb1.r}, ${rgb1.g}, ${rgb1.b}, ${0.2 * ray.alphaFactor})`);
          pulseGrad.addColorStop(0.8, `rgba(${rgb2.r}, ${rgb2.g}, ${rgb2.b}, ${0.5 * ray.alphaFactor})`);
          pulseGrad.addColorStop(1, `rgba(37, 99, 235, ${0.7 * ray.alphaFactor})`);

          // Draw the beam segment
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = pulseGrad;
          ctx.lineWidth = effectiveRayWidth * (1.2 + (endDist / rayLength) * 1.0);
          ctx.lineCap = 'round';
          ctx.stroke();

          // Bright tip sparkle at the leading head of the pulse
          if (pulseHeadDist <= rayLength && pulseHeadDist >= 0) {
            const headX = originX + ux * pulseHeadDist;
            const headY = originY + uy * pulseHeadDist;

            ctx.beginPath();
            ctx.arc(headX, headY, effectiveRayWidth * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${0.6 * ray.alphaFactor})`;
            ctx.fill();

            // Core glow
            ctx.beginPath();
            ctx.arc(headX, headY, effectiveRayWidth * 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * ray.alphaFactor})`;
            ctx.fill();
          }
        }
      }

      ctx.restore();

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    let isRunning = true;
    animationFrameId = requestAnimationFrame(render);

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else if (!isRunning) {
        isRunning = true;
        startTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color1, color2, rayCount, rayWidth, pulseSpeed, pulseWidth, trailLength, motionBlur, bgGlow]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
