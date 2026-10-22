"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { SafeImage } from "@/components/SafeImage";
import { submission } from "@/content/submission";
import { ui } from "@/content/site";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

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
    let ox = x;
    let oy = y;
    if (next <= 1 || width === 0 || height === 0) {
      ox = 0;
      oy = 0;
    } else {
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
      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.25 : 0.25;
      commit(scaleRef.current + delta, offsetRef.current.x, offsetRef.current.y);
    }
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [commit, embedUrl]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (embedUrl || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
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
      sizes="(min-width: 1600px) 1500px, 100vw"
      draggable={false}
      className="pointer-events-none h-full w-full select-none object-contain"
      fallback={<MissingDashboard />}
    />
  );

  return (
    <div
      ref={frameRef}
      className="viewer-frame relative bg-white"
    >
      {embedUrl ? (
        <>
          <div className="viewer-stage relative aspect-video print:hidden">
            <iframe
              src={embedUrl}
              title={submission.alt}
              className="absolute inset-0 h-full w-full border-0"
              allow="fullscreen"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="viewer-stage relative hidden aspect-video print:block">{image}</div>
        </>
      ) : (
        <div
          ref={stageRef}
          className="viewer-stage aspect-video w-full touch-none overflow-hidden"
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
      <div className="no-print flex flex-wrap gap-2 border-t border-line bg-white p-2">
        {embedUrl ? null : (
          <>
            <button
              type="button"
              className="btn bg-navy text-white"
              aria-label={submission.zoomOut}
              onClick={() =>
                commit(scaleRef.current - 0.25, offsetRef.current.x, offsetRef.current.y)
              }
            >
              −
            </button>
            <button
              type="button"
              className="btn bg-navy text-white"
              aria-label={submission.zoomIn}
              onClick={() =>
                commit(scaleRef.current + 0.25, offsetRef.current.x, offsetRef.current.y)
              }
            >
              +
            </button>
            <button
              type="button"
              className="btn bg-navy text-white"
              onClick={() => commit(1, 0, 0)}
            >
              {submission.fit}
            </button>
          </>
        )}
        <button type="button" className="btn bg-navy text-white" onClick={toggleFullscreen}>
          {full ? submission.exitFullscreen : submission.fullscreen}
        </button>
      </div>
    </div>
  );
}
