"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const videoUrls = [
  "https://www.pexels.com/download/video/7677558/",
  "https://www.pexels.com/download/video/13929843/",
  "https://imagine-public.x.ai/imagine-public/share-videos/c9ca484e-d24d-414b-aeea-82d9940e5ab2.mp4?cache=1",
  "https://imagine-public.x.ai/imagine-public/share-videos/41ea4d11-ce34-40c4-8617-b831d4ee7d27.mp4?cache=1",
  "https://imagine-public.x.ai/imagine-public/share-videos/187a3bcf-3b9f-4094-9631-53a99dc15eb2.mp4?cache=1",
];

export default function MobileDeepInside() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cardWidth = 260;
    const gap = 20;
    const totalItems = 10;
    const totalWidth = (cardWidth + gap) * totalItems;
    const centerX = window.innerWidth / 2;

    const wrap = gsap.utils.wrap(0, totalWidth);
    let rawScrollPosition = 0;

    const update = () => {
      rawScrollPosition -= 4.0;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const linearX = i * (cardWidth + gap) + rawScrollPosition;
        const wrappedX = wrap(linearX) - (cardWidth + gap);

        const cardCenter = wrappedX + cardWidth / 2;
        const distFromCenter = cardCenter - centerX;
        const progress = distFromCenter / (window.innerWidth * 0.5);

        const z = Math.abs(progress) * 300;
        const rotateY = progress * -45;
        const focus = 1 - Math.min(1, Math.abs(progress));
        const scale = 0.5 + focus * 0.5; // Scale Effect

        // 3. Dynamic Z-Index (CRITICAL)
        // We must manually set z-index so the center card is always on top.
        // The further from center (higher absolute progress), the lower the z-index.
        const zIndex = 100 - Math.round(Math.abs(progress) * 100);
        card.style.zIndex = zIndex.toString();

        gsap.set(card, {
          x: wrappedX,
          z: z,
          rotationY: rotateY,
          scale: scale,
          opacity: 1,
        });
      });
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <section className="h-screen w-full flex items-center justify-center bg-[#f0f0f0] overflow-hidden relative">
      <div className="absolute z-[999] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[285px] h-[580px] pointer-events-none">
        <div className="w-full h-full rounded-4xl border-[10px] border-[#222] bg-transparent shadow-2xl overflow-hidden relative">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50"></div>

          <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent pointer-events-none z-40"></div>
        </div>
      </div>

      {/* TRACK */}
      <div
        ref={containerRef}
        className="relative w-full h-full perspective-[1000px] flex items-center"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="absolute left-0  top-1/2 -mt-[280px] w-[260px] h-[560px] rounded-4xl overflow-hidden bg-black shadow-lg border border-gray-800"
          >
            <video
              src={videoUrls[i % videoUrls.length]}
              className="w-full h-full object-cover rounded-4xl"
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 rounded-4xl bg-black/10 pointer-events-none"></div>

            <div className="absolute right-2 bottom-12 flex flex-col gap-4 items-center">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-xs text-white">❤️</span>
              </div>
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-xs text-white">💬</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="text-white text-sm font-bold shadow-black drop-shadow-md">
                @creator_{i + 1}
              </p>
              <p className="text-white/80 text-xs shadow-black drop-shadow-md">
                Cool vibes only ✨
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
