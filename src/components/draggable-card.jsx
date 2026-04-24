import { useRef } from "react";

export function DraggableCardContainer({ className = "", children, containerRef }) {
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
    </div>
  );
}

export function DraggableCardBody({ className = "", children, onClick, constraintsRef }) {
  const elRef = useRef(null);
  const state = useRef({
    dragging: false,
    startX: 0, startY: 0,
    origX: 0, origY: 0,
    currentX: 0, currentY: 0,
    moved: false,
  });

  function onPointerDown(e) {
    // ما نبداوش drag من buttons أو links
    if (e.target.closest("button, a")) return;

    const s = state.current;
    const el = elRef.current;
    const rect = el.getBoundingClientRect();

    s.startX = e.clientX;
    s.startY = e.clientY;
    s.origX = s.currentX;
    s.origY = s.currentY;
    s.moved = false;
    s.dragging = true;

    el.setPointerCapture(e.pointerId);
    el.style.transition = "none";
    el.style.zIndex = "999";
    el.style.scale = "1.05";

    e.preventDefault();
  }

  function onPointerMove(e) {
    const s = state.current;
    if (!s.dragging) return;

    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;

    // اعتبر moved بعد 5px
    if (!s.moved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      s.moved = true;
    }

    if (!s.moved) return;

    const el = elRef.current;
    const container = constraintsRef?.current;

    let newX = s.origX + dx;
    let newY = s.origY + dy;

    // Constrain داخل الـ container
    if (container) {
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      const eW = eRect.width;
      const eH = eRect.height;
      // حدود: ما يخرجش من container
      const minX = -(el.offsetLeft);
      const maxX = cRect.width - el.offsetLeft - eW;
      const minY = -(el.offsetTop);
      const maxY = cRect.height - el.offsetTop - eH;

      newX = Math.min(Math.max(newX, minX), maxX);
      newY = Math.min(Math.max(newY, minY), maxY);
    }

    s.currentX = newX;
    s.currentY = newY;
    el.style.transform = `translate(${newX}px, ${newY}px) rotate(var(--card-rotate, 0deg))`;
  }

  function onPointerUp(e) {
    const s = state.current;
    if (!s.dragging) return;
    s.dragging = false;

    const el = elRef.current;
    el.style.transition = "scale 0.2s ease, box-shadow 0.2s ease";
    el.style.zIndex = "";
    el.style.scale = "1";

    // Click إلا ما تحركش
    if (!s.moved) {
      onClick?.();
    }
  }

  return (
    <div
      ref={elRef}
      className={`absolute select-none ${className}`}
      style={{
        touchAction: "none",
        cursor: "grab",
        willChange: "transform",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {children}
    </div>
  );
}