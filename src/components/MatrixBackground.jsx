import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const color = "#f97316";
  const fontSize = 14;
  const speed = 0.8;
  const density = 0.95;

  const charList = "ｱｲｳｴｵｶｷｸｹｺｻシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let drops = [];

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, (_, i) => ({
        x: i * fontSize,
        y: Math.random() * -canvas.height,
        speed: (Math.random() * 2 + 1) * speed,
      }));
    };

    resize();

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        const char = charList[Math.floor(Math.random() * charList.length)];

        // head — أبيض مع glow برتقالي
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fillText(char, drop.x, drop.y);

        // trail — برتقالي
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.shadowBlur = 0;
        ctx.fillText(char, drop.x, drop.y - fontSize);

        drop.y += drop.speed * 4;

        if (drop.y > canvas.height && Math.random() > density) {
          drop.y = -fontSize;
          drop.speed = (Math.random() * 2 + 1) * speed;
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* matrix canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.35]" />

      {/* CRT scanlines */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.3) 50%), linear-gradient(90deg, rgba(255,100,0,0.04), rgba(255,160,0,0.02), rgba(255,100,0,0.04))",
          backgroundSize: "100% 2px, 3px 100%",
        }}
      />

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.75)_100%)]" />

      {/* orange center glow */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_30%_50%,rgba(255,106,0,0.06),transparent_55%)]" />
    </div>
  );
}