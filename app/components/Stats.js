"use client";

import { useRef, useEffect, useSyncExternalStore } from "react";
import { useScroll } from "framer-motion";
import { STATS } from "../lib/content";

// ── External store: pointer coarse (touch) detection ─────────────────────────
function subscribePointer(cb) {
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getPointerSnapshot = () => window.matchMedia("(pointer: coarse)").matches;
const getPointerServerSnapshot = () => false;

export default function Stats() {
  const containerRef = useRef(null); // outer 400vh scroll tunnel
  const sectionRef = useRef(null);   // inner sticky viewport
  const videoRef = useRef(null);

  // 4 DOM refs — one per stat wrapper
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const stat4Ref = useRef(null);
  const statRefs = [stat1Ref, stat2Ref, stat3Ref, stat4Ref];

  // tracks which stats are currently visible — needed for asymmetric up/down thresholds
  const shownRef = useRef([false, false, false, false]);

  const isTouch = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getPointerServerSnapshot,
  );

  // ── Scroll progress across the full 400vh container ──────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Desktop: video scrub + stat reveals driven by scroll ─────────────────
  useEffect(() => {
    if (isTouch) return;
    const video = videoRef.current;
    if (video) video.pause();
    return scrollYProgress.on("change", (v) => {
      if (video) {
        const dur = video.duration;
        if (dur && !isNaN(dur)) video.currentTime = Math.max(0, Math.min(v * 2.5, dur));
      }
      // Scrub: v * 2.5 (vs original 3) — 20% more scroll per video frame
      // Thresholds scaled ×1.2 to match — stats appear at identical video frames, more scroll to reach them
      // Scroll DOWN: stats appear spread over 0.18→0.90 (range = 0.72)
      // Scroll UP:   stats disappear spread over 0.90→0.54 (range = 0.36 = exactly half)
      const SHOW = [0.18, 0.42, 0.66, 0.90];
      const HIDE = [0.54, 0.66, 0.78, 0.90];
      [[stat1Ref, 0], [stat2Ref, 1], [stat3Ref, 2], [stat4Ref, 3]].forEach(([ref, i]) => {
        if (!ref.current) return;
        if (!shownRef.current[i] && v >= SHOW[i]) {
          shownRef.current[i] = true;
          ref.current.style.opacity = "1";
          ref.current.style.transform = "translateY(0px)";
        } else if (shownRef.current[i] && v < HIDE[i]) {
          shownRef.current[i] = false;
          ref.current.style.opacity = "0";
          ref.current.style.transform = "translateY(20px)";
        }
      });
    });
  }, [scrollYProgress, isTouch]);

  // ── Mobile: autoplay video + IntersectionObserver stat reveals ───────────
  useEffect(() => {
    if (!isTouch) return;
    const video = videoRef.current;
    if (video) {
      video.loop = true;
      video.play().catch(() => {});
    }
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [stat1Ref, stat2Ref, stat3Ref, stat4Ref].forEach((ref, i) => {
            setTimeout(() => {
              if (!ref.current) return;
              ref.current.style.opacity = "1";
              ref.current.style.transform = "translateY(0px)";
            }, i * 150);
          });
        } else {
          [stat1Ref, stat2Ref, stat3Ref, stat4Ref].forEach((ref) => {
            if (!ref.current) return;
            ref.current.style.opacity = "0";
            ref.current.style.transform = "translateY(20px)";
          });
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [isTouch]);

  return (
    // Outer scroll tunnel — 400vh on desktop (sticky trick), 100svh on mobile
    <div
      ref={containerRef}
      className="burst-reveal"
      style={{
        height: isTouch ? "100svh" : "288vh",
        position: "relative",
      }}
    >
      {/* Inner sticky panel — stays fixed in viewport while outer scrolls */}
      <div
        ref={sectionRef}
        style={{
          position: isTouch ? "relative" : "sticky",
          top: 0,
          height: "100svh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* ── Video background ───────────────────────────────────────────── */}
        <video
          ref={videoRef}
          preload="auto"
          playsInline
          muted
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <source src="/videos/insulation-burst-bg-scrub.mp4" type="video/mp4" />
        </video>

        {/* Light cream scrim — just enough contrast, no glass */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(250,248,245,0.38)",
            zIndex: 1,
          }}
        />

        {/* Edge fades — video bleeds into page on all four sides */}
        {[
          { top: 0, left: 0, right: 0, height: "18%", background: "linear-gradient(to bottom, #faf8f5 0%, transparent 100%)" },
          { bottom: 0, left: 0, right: 0, height: "18%", background: "linear-gradient(to top, #faf8f5 0%, transparent 100%)" },
          { top: 0, left: 0, bottom: 0, width: "18%", background: "linear-gradient(to right, #faf8f5 0%, transparent 100%)" },
          { top: 0, right: 0, bottom: 0, width: "18%", background: "linear-gradient(to left, #faf8f5 0%, transparent 100%)" },
        ].map((edgeStyle, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              ...edgeStyle,
              zIndex: 5,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ── 2×2 floating stats grid ────────────────────────────────────── */}
        <div
          role="region"
          aria-label="Key statistics"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            placeItems: "center",
            paddingBottom: "clamp(48px, 8vh, 72px)",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={statRefs[i]}
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 600ms ease, transform 600ms ease",
                textAlign: "center",
                padding: "clamp(12px, 3vw, 40px)",
                width: "100%",
              }}
            >
              {/* Number — prefix, value, suffix */}
              <div
                aria-label={`${stat.prefix}${stat.countTo}${stat.suffix}`}
                style={{
                  fontFamily: "var(--font-jakarta)",
                  fontWeight: 700,
                  fontSize: "clamp(72px, 12vw, 160px)",
                  lineHeight: 0.9,
                  color: "#1a2b3c",
                  textShadow: "0 1px 4px rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.prefix && (
                  <span
                    style={{
                      fontSize: "0.52em",
                      letterSpacing: "0.04em",
                      marginRight: "2px",
                    }}
                  >
                    {stat.prefix}
                  </span>
                )}
                <span>{stat.countTo}</span>
                {stat.suffix && (
                  <span
                    style={{
                      fontSize: "0.44em",
                      alignSelf: "flex-start",
                      paddingTop: "0.12em",
                      marginLeft: "2px",
                    }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(13px, 1.5vw, 16px)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(26,43,60,0.85)",
                  margin: "clamp(8px, 1vw, 16px) auto 0",
                  lineHeight: 1.5,
                  maxWidth: "18ch",
                }}
              >
                {stat.label}
              </p>

              {/* Source attribution */}
              {stat.source && (
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "clamp(10px, 1vw, 12px)",
                    fontStyle: "italic",
                    color: "rgba(26,43,60,0.5)",
                    margin: "6px 0 0",
                    letterSpacing: "0.04em",
                  }}
                >
                  {stat.source}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
