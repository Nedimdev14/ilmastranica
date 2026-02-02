"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

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

const YES_LABELS = [
  "DA",
  "YES",
  "NARAVNO",
  "UVIJEK",
  "SIGURNO",
  "APSOLUTNO",
  "TAČNO",
  "JESTE",
  "NARAVNO DA",
  "UVEK",
  "DA!",
  "SIGURNO DA",
  "NARAVNO!",
  "DA DA",
  "JASNO",
  "SLAŽEM SE",
  "BAŠ TAČNO",
  "DEFINITIVNO",
  "NARAVNO DA!",
  "UVIJEK DA",
  "SVE DA",
  "MA NARAVNO",
  "PA DA",
  "DA SIGURNO",
  "JESTE DA",
  "TAČNO!",
  "APSOLUTNO DA",
  "NARAVNO JESTE",
  "DA NARAVNO",
  "SIGURNO!",
  "UVEK DA",
  "NARAVNO UVEK",
  "JESTE!",
  "100% DA",
  "BAŠ DA",
  "NARAVNO SIGURNO",
  "UVIJEK SIGURNO",
  "DA UVEK",
  "SIGURNO NARAVNO",
  "DA JESTE",
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

      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 py-8 pt-12">
        {!celebration ? (
          <>
            <h1 className="mb-6 text-center text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl">
              Da li Ilma smrdi?
            </h1>
            <div className="relative min-h-[calc(100vh-8rem)] w-full">
              {YES_BUTTON_POSITIONS.map((pos, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                  new Audio("/fart.mp3").play().catch(() => {});
                  setCelebration(true);
                }}
                  className="yes-button absolute rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-bold text-white shadow-lg transition-all hover:from-green-600 hover:to-emerald-700 active:scale-95"
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
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Image
              src="/smrad.png"
              alt="Smrad"
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}
