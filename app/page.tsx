"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLITTER_COUNT = 40;
const CONFETTI_COUNT = 150;
const FIREWORK_PARTICLES = 12;

function Glitter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="glitter-container" aria-hidden />;
  }

  return (
    <div className="glitter-container" aria-hidden>
      {Array.from({ length: GLITTER_COUNT }).map((_, i) => (
        <div
          key={i}
          className="glitter"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${1.5 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function Fireworks({ active }: { active: boolean }) {
  const [bursts, setBursts] = useState<{ x: number; y: number; id: number; color: string }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff85a2", "#a855f7"];
    const interval = setInterval(() => {
      setBursts((prev) => [
        ...prev.slice(-5),
        {
          x: 20 + Math.random() * 60,
          y: 30 + Math.random() * 40,
          id: idRef.current++,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <>
      {bursts.map((b) => (
        <div
          key={b.id}
          className="firework-burst"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            ["--fw-color" as string]: b.color,
          }}
        >
          {Array.from({ length: FIREWORK_PARTICLES }).map((_, i) => (
            <div
              key={i}
              className="firework-particle"
              style={{
                ["--angle" as string]: `${(i / FIREWORK_PARTICLES) * 360}deg`,
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<{ id: number; x: number; delay: number; color: string; rotation: number }[]>([]);

  useEffect(() => {
    if (!trigger) return;
    const colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff85a2", "#a855f7", "#f97316", "#ec4899"];
    setPieces(
      Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 - 10,
        delay: Math.random() * 0.5,
        color: colors[i % colors.length],
        rotation: Math.random() * 720 - 360,
      }))
    );
  }, [trigger]);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            ["--confetti-color" as string]: p.color,
            ["--confetti-rotation" as string]: `${p.rotation}deg`,
          }}
        />
      ))}
    </>
  );
}

const FLEE_RADIUS = 220;
const FLEE_SPEED = 6;
const MIN_SCALE_NE = 0.5;
const MAX_SCALE_DA = 1.35;

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
      className="relative min-h-screen w-full overflow-hidden bg-gray-900"
      style={
        !celebration
          ? {
              backgroundImage: "url('/ilma.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {!celebration && (
        <>
          <div className="absolute inset-0 bg-black/40" aria-hidden />
          <Glitter />
          <Fireworks active={true} />
        </>
      )}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        {!celebration ? (
          <>
            <h1 className="mb-12 text-center text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl">
              Da li Ilma smrdi?
            </h1>
            <div className="flex min-h-[200px] w-full max-w-xl flex-wrap items-center justify-center gap-6 sm:gap-10">
              <button
                onClick={() => setCelebration(true)}
                className="yes-button rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-12 py-6 text-3xl font-bold text-white shadow-xl transition-all duration-300 hover:from-green-600 hover:to-emerald-700 active:scale-95 sm:px-16 sm:py-8 sm:text-4xl"
                style={{
                  transform: `scale(${fleeing ? MAX_SCALE_DA : 1})`,
                  transition: "transform 0.25s ease-out",
                }}
              >
                DA
              </button>
              <button
                ref={neButtonRef}
                className="no-button absolute rounded-xl border-2 border-gray-400 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-300"
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
          <div className="crash-screen absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <div className="crash-glitch mb-6 text-8xl font-black text-red-600 sm:text-9xl">
              404
            </div>
            <p className="crash-message mb-4 max-w-md text-xl font-semibold text-red-400 sm:text-2xl">
              Stranica ne radi više od smrada.
            </p>
            <p className="crash-subtext mb-8 text-sm text-gray-500 sm:text-base">
              Server se srušio. Previše smrada u blizini.
            </p>
            <div className="text-4xl">💨☠️</div>
          </div>
        )}
      </div>
    </div>
  );
}
