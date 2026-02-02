"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HEART_EMOJIS = ["💕", "💗", "💖", "💘", "❤️", "💓", "🌸"];

const FLOW_ROWS = [
  { top: 12, delay: 0, dir: "ltr" as const },
  { top: 28, delay: 3, dir: "rtl" as const },
  { top: 44, delay: 6, dir: "ltr" as const },
  { top: 60, delay: 2, dir: "rtl" as const },
  { top: 76, delay: 5, dir: "ltr" as const },
  { top: 92, delay: 1, dir: "rtl" as const },
  { top: 20, delay: 4, dir: "rtl" as const },
  { top: 36, delay: 7, dir: "ltr" as const },
  { top: 52, delay: 2.5, dir: "rtl" as const },
  { top: 68, delay: 5.5, dir: "ltr" as const },
  { top: 84, delay: 1.5, dir: "rtl" as const },
];

function FlowingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {FLOW_ROWS.map((row, i) => (
        <span
          key={i}
          className={`heart-flow heart-flow-${row.dir} absolute text-2xl opacity-90 sm:text-3xl md:text-4xl`}
          style={{
            top: `${row.top}%`,
            animationDelay: `${row.delay}s`,
          }}
        >
          {HEART_EMOJIS[i % HEART_EMOJIS.length]}
        </span>
      ))}
    </div>
  );
}

const FLOAT_HEART_COUNT = 28;

function FloatingHearts() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {Array.from({ length: FLOAT_HEART_COUNT }).map((_, i) => (
        <span
          key={i}
          className="heart-float absolute text-xl opacity-80 sm:text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
          }}
        >
          {HEART_EMOJIS[i % HEART_EMOJIS.length]}
        </span>
      ))}
    </div>
  );
}

function HeartBgPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]" aria-hidden>
      <div className="heart-pattern" />
    </div>
  );
}

const FLEE_RADIUS = 220;
const FLEE_SPEED = 6;
const MIN_SCALE_NE = 0.5;

const YES_LABELS = [
  "DA",
  "NARAVNO",
  "NAJLjEPŠA JE",
  "PRELIJEPA",
  "DOBRICA",
  "NAJBOLJA",
  "LJUBAV",
  "NAJLjEPŠA!",
  "SUPER JE",
  "PREKRASNA",
  "DOBRA DJEVOJKA",
  "NAJBOLJA!",
  "DA!",
  "NARAVNO DA",
  "NAJLjEPŠA NA SVIJETU",
  "VOLIM JE",
  "PREPRELIJEPA",
  "SLAŽEM SE",
  "TAČNO!",
  "JESTE NAJLjEPŠA",
  "I NAJBOLJA",
  "DOBRA JE",
  "LJUBAV!",
  "NAJBOLJA DJEVOJKA",
  "NARAVNO!",
  "100%",
  "UVJEK DA",
  "NAJLjEPŠA I NAJBOLJA",
  "DOBRICA SI",
  "PREKRASNA JE",
  "VOLIM",
  "NAJBOLJA NA SVIJETU",
  "DA DA",
  "NAJLjEPŠA",
  "I DOBRA",
  "SVE NAJBOLJE",
  "NAJBOLJA!",
  "LJUBAV NAJBOLJA",
  "PRELIJEPA I DOBRA",
  "DA VOLIM",
];

const YES_BUTTON_POSITIONS: { left: number; top: number; size: "sm" | "md" | "lg" }[] = [
  { left: 8, top: 28, size: "lg" },
  { left: 22, top: 45, size: "md" },
  { left: 15, top: 62, size: "sm" },
  { left: 35, top: 32, size: "md" },
  { left: 48, top: 25, size: "lg" },
  { left: 62, top: 38, size: "sm" },
  { left: 75, top: 28, size: "md" },
  { left: 88, top: 42, size: "lg" },
  { left: 92, top: 58, size: "sm" },
  { left: 78, top: 52, size: "md" },
  { left: 55, top: 48, size: "lg" },
  { left: 42, top: 55, size: "sm" },
  { left: 28, top: 72, size: "md" },
  { left: 12, top: 78, size: "lg" },
  { left: 38, top: 78, size: "sm" },
  { left: 52, top: 72, size: "md" },
  { left: 68, top: 65, size: "lg" },
  { left: 82, top: 72, size: "sm" },
  { left: 5, top: 48, size: "md" },
  { left: 95, top: 68, size: "md" },
  { left: 18, top: 35, size: "sm" },
  { left: 72, top: 45, size: "lg" },
  { left: 45, top: 38, size: "sm" },
  { left: 58, top: 62, size: "md" },
  { left: 8, top: 55, size: "md" },
  { left: 85, top: 35, size: "sm" },
  { left: 32, top: 62, size: "lg" },
  { left: 65, top: 52, size: "sm" },
  { left: 48, top: 68, size: "md" },
  { left: 22, top: 82, size: "sm" },
  { left: 78, top: 82, size: "lg" },
  { left: 55, top: 35, size: "md" },
  { left: 35, top: 48, size: "lg" },
  { left: 62, top: 78, size: "sm" },
  { left: 15, top: 42, size: "md" },
  { left: 88, top: 78, size: "md" },
  { left: 42, top: 42, size: "sm" },
  { left: 72, top: 58, size: "lg" },
  { left: 28, top: 55, size: "md" },
  { left: 92, top: 48, size: "sm" },
];

export default function Home() {
  const [celebration, setCelebration] = useState(false);
  const [nePosition, setNePosition] = useState({ x: 50, y: 55 });
  const [fleeing, setFleeing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const neButtonRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (celebration) return;
    let rafId: number;
    const tick = () => {
      const ne = neButtonRef.current;
      const container = containerRef.current;
      if (!ne || !container) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const rect = ne.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const cur = cursorRef.current;
      const dx = cx - cur.x;
      const dy = cy - cur.y;
      const dist = Math.hypot(dx, dy);
      if (dist < FLEE_RADIUS && dist > 2) {
        setFleeing(true);
        const dirX = dx / dist;
        const dirY = dy / dist;
        const cRect = container.getBoundingClientRect();
        const padding = 60;
        let newCx = cx + dirX * FLEE_SPEED;
        let newCy = cy + dirY * FLEE_SPEED;
        newCx = Math.max(cRect.left + padding, Math.min(cRect.right - padding, newCx));
        newCy = Math.max(cRect.top + padding, Math.min(cRect.bottom - padding, newCy));
        const pctX = ((newCx - cRect.left) / cRect.width) * 100;
        const pctY = ((newCy - cRect.top) / cRect.height) * 100;
        setNePosition({ x: pctX, y: pctY });
      } else {
        setFleeing(false);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [celebration]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200"
    >
      <HeartBgPattern />
      {!celebration && (
        <>
          <FlowingHearts />
          <FloatingHearts />
        </>
      )}

      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 py-8 pt-12">
        {!celebration ? (
          <>
            <h1 className="mb-2 text-center text-4xl font-black tracking-tight text-rose-800 drop-shadow-sm sm:text-5xl md:text-6xl">
              Da li je Ilma najljepša na svijetu?
            </h1>
            <p className="mb-6 text-center text-lg font-medium text-rose-600 sm:text-xl">
              Lijepo je što je dobra djevojka 💕
            </p>
            <div className="relative min-h-[calc(100vh-10rem)] w-full">
              {YES_BUTTON_POSITIONS.map((pos, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCelebration(true)}
                  className="yes-button absolute rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 font-bold text-white shadow-lg transition-all hover:from-rose-500 hover:to-pink-600 active:scale-95"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    transform: "translate(-50%, -50%)",
                    padding: pos.size === "lg" ? "0.75rem 1.5rem" : pos.size === "md" ? "0.5rem 1rem" : "0.35rem 0.75rem",
                    fontSize: pos.size === "lg" ? "1.125rem" : pos.size === "md" ? "0.9375rem" : "0.8125rem",
                  }}
                >
                  {YES_LABELS[i % YES_LABELS.length]}
                </button>
              ))}
              <button
                ref={neButtonRef}
                className="no-button absolute rounded-xl border-2 border-rose-300 bg-white/80 px-4 py-2 text-sm font-medium text-rose-600 transition-all duration-200 hover:bg-rose-100"
                style={{
                  left: `${nePosition.x}%`,
                  top: `${nePosition.y}%`,
                  transform: `translate(-50%, -50%) scale(${fleeing ? MIN_SCALE_NE : 1})`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                ne
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 px-6">
            <HeartBgPattern />
            <FlowingHearts />
            <FloatingHearts />
            <div className="relative z-10 text-center">
              <p className="cute-title mb-4 text-4xl font-black text-rose-700 sm:text-5xl md:text-6xl">
                Najljepša si na svijetu! 💖
              </p>
              <p className="cute-subtitle mb-8 text-2xl font-semibold text-rose-600 sm:text-3xl">
                I najbolja djevojka! 💕
              </p>
              <div className="flex justify-center gap-3 text-4xl sm:gap-4 sm:text-5xl">
                <span className="heart-bounce" style={{ animationDelay: "0s" }}>💗</span>
                <span className="heart-bounce" style={{ animationDelay: "0.1s" }}>💖</span>
                <span className="heart-bounce" style={{ animationDelay: "0.2s" }}>💕</span>
                <span className="heart-bounce" style={{ animationDelay: "0.3s" }}>💘</span>
                <span className="heart-bounce" style={{ animationDelay: "0.4s" }}>❤️</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
