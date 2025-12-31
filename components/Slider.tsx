"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const images = [
  { id: 1, image: "/1.avif", title: "Image 1" },
  { id: 2, image: "/2.avif", title: "Image 2" },
  { id: 3, image: "/3.avif", title: "Image 3" },
  { id: 4, image: "/4.avif", title: "Image 4" },
  { id: 5, image: "/1.avif", title: "Image 5" },
  { id: 6, image: "/2.avif", title: "Image 5" },
  { id: 7, image: "/3.avif", title: "Image 5" },
  { id: 8, image: "/4.avif", title: "Image 5" },
];

const Slider = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      gsap.to(".slider-container", {
        xPercent: -100,
        repeat: -1,
        duration: 10,
        ease: "none",
      });

      const checkIntersection = () => {
        if (!mobileRef.current) return;

        const mobileRect = mobileRef.current.getBoundingClientRect();
        const mobileCenter = mobileRect.left + mobileRect.width / 2;

        itemsRef.current.forEach((item) => {
          if (!item) return;

          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.left + itemRect.width / 2;

          const xDiff = itemCenter - mobileCenter;
          const distFactor = xDiff / 500;

          const z = Math.abs(distFactor) * -500;

          const rotation = xDiff * -0.1;

          const scale = gsap.utils.clamp(
            0.85,
            1.2,
            1.2 - Math.abs(distFactor) * 0.4
          );

          const opacity = gsap.utils.clamp(
            0.5,
            1,
            1 - Math.abs(distFactor) * 0.5
          );

          gsap.to(item, {
            z: z,
            rotateY: rotation,
            scale: scale,
            opacity: opacity,
            backgroundColor:
              Math.abs(xDiff) < mobileRect.width / 2
                ? "blue"
                : "rgb(239 68 68)",
            duration: 0.1,
          });
        });
      };

      gsap.ticker.add(checkIntersection);

      return () => {
        gsap.ticker.remove(checkIntersection);
      };
    },
    { scope: containerRef }
  );

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <div className=" pt-24  overflow-hidden">
      <div
        ref={containerRef}
        className="w-full flex overflow-hidden whitespace-nowrap p-1 relative perspective-[1000px]"
      >
        <div
          ref={mobileRef}
          className="border-4 border-blue-500 z-50 absolute left-1/2 -translate-x-1/2 w-58 aspect-[9/16] pointer-events-none rounded-xl"
        >
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-blue-500 font-bold">
            Mobile View
          </span>
        </div>

        {/* List 1 */}
        <div className="slider-container flex gap-10 pr-10 [transform-style:preserve-3d]">
          {images.map((image, index) => (
            <div
              key={`${index}-1`}
              ref={addToRefs}
              className="h-72 aspect-[9/16] bg-red-500 shrink-0 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
            >
              <Image
                width={1200}
                height={1200}
                src={image.image}
                alt="image"
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* List 2 */}
        <div className="slider-container flex gap-10 pr-10 [transform-style:preserve-3d]">
          {images.map((image, index) => (
            <div
              key={`${index}-2`}
              ref={addToRefs}
              className="h-72 aspect-[9/16] bg-red-500 shrink-0 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
            >
              <Image
                width={1200}
                height={1200}
                src={image.image}
                alt="image"
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
