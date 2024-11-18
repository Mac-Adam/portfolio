"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "./../lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";

const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const LoadingScreen = ({ languageProvider, landscape }) => {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black" ref={containerRef}>
      <AnimatedShinyText className="p-6 text-6xl inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
        <span>{languageProvider?.getText("loading")}</span>
      </AnimatedShinyText>

      <div className="w-5/6 flex flex-col items-stretch justify-between gap-10">
        <div className="flex justify-between w-full">
          <div ref={div1Ref}></div>
          <div ref={div2Ref}></div>
        </div>
      </div>
      <AnimatedBeam duration={3} containerRef={containerRef} fromRef={div1Ref} toRef={div2Ref} />
      {landscape ? (
        ""
      ) : (
        <AnimatedShinyText className="w-5/6 p-6 text-4xl inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>{languageProvider?.getText("flip_phone")}</span>
        </AnimatedShinyText>
      )}
    </div>
  );
};

export default LoadingScreen;
