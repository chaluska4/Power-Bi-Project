"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { SafeImage } from "@/components/SafeImage";
import { submission } from "@/content/submission";
import { ui } from "@/content/site";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STEP = 0.25;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function MissingDashboard() {
  return (
    <span
      role="img"
      aria-label={submission.alt}
      className="flex h-full w-full items-center justify-center bg-page p-6 text-center text-navy"
    >
      {ui.missingDashboard}
    </span>
  );
}

function ToolButton({
  label,
  onClick,
  disabled = false,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/15 disabled:opacity-50"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
        {children}
      </svg>
    </button>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DashboardViewer({ embedUrl }: { embedUrl: string | null }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
    null,
  );
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [full, setFull] = useState(false);

  const commit = useCallback((nextScale: number, x: number, y: number) => {
    const width = stageRef.current?.clientWidth ?? 0;
    const height = stageRef.current?.clientHeight ?? 0;
    const next = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    let ox = 0;
    let oy = 0;
    if (next > 1 && width > 0 && height > 0) {
      const maxX = ((next - 1) * width) / 2;
      const maxY = ((next - 1) * height) / 2;
      ox = clamp(x, -maxX, maxX);
      oy = clamp(y, -maxY, maxY);
    }
    scaleRef.current = next;
    offsetRef.current = { x: ox, y: oy };
    setScale(next);
    setOffset({ x: ox, y: oy });
  }, []);

  const zoomBy = useCallback(
    (delta: number) =>
      commit(scaleRef.current + delta, offsetRef.current.x, offsetRef.current.y),
    [commit],
  );

  useEffect(() => {
    function onChange() {
      setFull(document.fullscreenElement === frameRef.current);
    }
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node || embedUrl) return;
    function onWheel(event: WheelEvent) {
      // Plain wheel scrolls the page. Trackpad pinch arrives as ctrl + wheel.
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      zoomBy(event.deltaY > 0 ? -STEP : STEP);
    }
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [embedUrl, zoomBy]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (embedUrl || event.button !== 0) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y),
        scale: scaleRef.current,
      };
      dragStart.current = null;
      return;
    }
    if (scaleRef.current > 1) {
      event.currentTarget.setPointerCapture(event.pointerId);
      dragStart.current = {
        x: event.clientX,
        y: event.clientY,
        ox: offsetRef.current.x,
        oy: offsetRef.current.y,
      };
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2 && pinchStart.current && pinchStart.current.distance > 0) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      commit(
        pinchStart.current.scale * (distance / pinchStart.current.distance),
        offsetRef.current.x,
        offsetRef.current.y,
      );
      return;
    }
    if (!dragStart.current || scaleRef.current <= 1) return;
    commit(
      scaleRef.current,
      dragStart.current.ox + (event.clientX - dragStart.current.x),
      dragStart.current.oy + (event.clientY - dragStart.current.y),
    );
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) dragStart.current = null;
  }

  function toggleFullscreen() {
    const node = frameRef.current;
    if (!node) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    void node.requestFullscreen();
  }

  const image = (
    <SafeImage
      src="/dashboard.png"
      alt={submission.alt}
      width={3840}
      height={2179}
      sizes="(min-width: 1600px) 1568px, 100vw"
      draggable={false}
      className="pointer-events-none h-full w-full select-none object-contain"
      fallback={<MissingDashboard />}
    />
  );

  const zoomed = scale > 1;

  return (
    <div ref={frameRef} className="viewer-frame relative bg-white">
      {embedUrl ? (
        <>
          <div className="viewer-stage absolute inset-0 print:hidden">
            <iframe
              src={embedUrl}
              title={submission.alt}
              className="h-full w-full border-0"
              allow="fullscreen"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="viewer-stage absolute inset-0 hidden print:block">{image}</div>
        </>
      ) : (
        <div
          ref={stageRef}
          className={`viewer-stage absolute inset-0 overflow-hidden ${
            zoomed ? "cursor-grab touch-none active:cursor-grabbing" : "touch-pan-x touch-pan-y"
          }`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="h-full w-full"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            }}
          >
            {image}
          </div>
        </div>
      )}
      <div
        role="toolbar"
        aria-label={submission.toolbar}
        className="on-navy no-print absolute right-2 top-2 z-10 flex gap-0.5 rounded-xl bg-navy/85 p-1 shadow-card"
      >
        {embedUrl ? null : (
          <>
            <ToolButton
              label={submission.zoomOut}
              onClick={() => zoomBy(-STEP)}
              disabled={scale <= MIN_SCALE}
            >
              <path d="M5 12h14" {...stroke} />
            </ToolButton>
            <ToolButton
              label={submission.zoomIn}
              onClick={() => zoomBy(STEP)}
              disabled={scale >= MAX_SCALE}
            >
              <path d="M12 5v14M5 12h14" {...stroke} />
            </ToolButton>
            <ToolButton label={submission.fit} onClick={() => commit(1, 0, 0)}>
              <rect x="4" y="6" width="16" height="12" rx="1.5" {...stroke} />
              <path d="M9 10l-2 2 2 2M15 10l2 2-2 2" {...stroke} />
            </ToolButton>
          </>
        )}
        <ToolButton
          label={full ? submission.exitFullscreen : submission.fullscreen}
          onClick={toggleFullscreen}
        >
          {full ? (
            <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" {...stroke} />
          ) : (
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" {...stroke} />
          )}
        </ToolButton>
      </div>
    </div>
  );
}
