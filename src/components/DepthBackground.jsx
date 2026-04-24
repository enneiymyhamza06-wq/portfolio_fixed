import { useRef, useEffect, useCallback } from "react";

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function project(x3, y3, z3, fov, cx, cy) {
  const perspective = fov / (fov + z3);
  return [cx + x3 * perspective, cy + y3 * perspective, perspective];
}

export default function DepthBackground({
  gridColor    = "#f97316",
  gridDensity  = 12,
  driftSpeed   = 0.4,
  fov          = 400,
  tiltStrength = 0.35,
}) {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const mouseRef     = useRef({ nx: 0, ny: 0 });
  const tiltRef      = useRef({ x: 0, y: 0 });
  const sizeRef      = useRef({ w: 0, h: 0 });
  const zOffsetRef   = useRef(0);
  const lastMoveRef  = useRef(0);

  const resizeCanvas = useCallback(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const w   = container.clientWidth;
    const h   = container.clientHeight;
    canvas.width        = w * dpr;
    canvas.height       = h * dpr;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    sizeRef.current = { w, h };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener("resize", onResize);

    const [r, g, b] = hexToRgb(gridColor);
    const DEPTH     = 600;
    const NEAR_CLIP = 10;

    const animate = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const { nx, ny } = mouseRef.current;
      tiltRef.current.x += (ny * tiltStrength * 60 - tiltRef.current.x) * 0.06;
      tiltRef.current.y += (nx * tiltStrength * 60 - tiltRef.current.y) * 0.06;

      zOffsetRef.current = (zOffsetRef.current + driftSpeed) % (DEPTH / gridDensity);

      const cx  = w / 2;
      const cy  = h / 2;
      const tX  = tiltRef.current.x;
      const tY  = tiltRef.current.y;
      const halfW = w * 1.8;
      const halfH = h * 1.8;
      const stepZ = DEPTH / gridDensity;

      ctx.lineCap = "round";

      for (let zi = 0; zi <= gridDensity; zi++) {
        let z = zi * stepZ + zOffsetRef.current;
        if (z < NEAR_CLIP) z += DEPTH;

        const depth01 = 1 - z / DEPTH;
        const alpha   = Math.pow(depth01, 2.2) * 0.9;
        const lineW   = depth01 * 1.6;
        if (alpha < 0.01) continue;

        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
        ctx.lineWidth   = lineW;

        const rows = gridDensity + 1;
        for (let ri = 0; ri <= rows; ri++) {
          const wy = -halfH + (ri / rows) * halfH * 2;
          const [x0, y0] = project(-halfW + tY * z * 0.003, wy + tX * z * 0.003, z, fov, cx, cy);
          const [x1, y1] = project( halfW + tY * z * 0.003, wy + tX * z * 0.003, z, fov, cx, cy);
          if (x1 < 0 && x0 < 0) continue;
          if (x0 > w && x1 > w) continue;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }

        const cols = gridDensity + 1;
        for (let ci = 0; ci <= cols; ci++) {
          const wx = -halfW + (ci / cols) * halfW * 2;
          const [x0, y0] = project(wx + tY * z * 0.003, -halfH + tX * z * 0.003, z, fov, cx, cy);
          const [x1, y1] = project(wx + tY * z * 0.003,  halfH + tX * z * 0.003, z, fov, cx, cy);
          if (y1 < 0 && y0 < 0) continue;
          if (y0 > h && y1 > h) continue;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
      }

      // center glow
      const vpX = cx + tY * 4;
      const vpY = cy + tX * 4;
      const grd = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, w * 0.35);
      grd.addColorStop(0,   `rgba(${r},${g},${b},0.18)`);
      grd.addColorStop(0.4, `rgba(${r},${g},${b},0.04)`);
      grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gridColor, gridDensity, driftSpeed, fov, tiltStrength, resizeCanvas]);

  const handleMouseMove = useCallback((e) => {
    const now = performance.now();
    if (now - lastMoveRef.current < 16) return;
    lastMoveRef.current = now;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      nx: (e.clientX - rect.left) / rect.width  * 2 - 1,
      ny: (e.clientY - rect.top)  / rect.height * 2 - 1,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { nx: 0, ny: 0 };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.92) 100%)" }}
      />

      {/* top + bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent" />

      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}