"use client";
import React, { useState } from "react";

import { cn } from "./../../lib/utils";
import BlurFade from "../ui/blur-fade";
import AnimatedGridPattern from "../ui/animated-grid-pattern";
import GithubButton from "./githubButton";
import { NeonGradientCard } from "../ui/neon-gradient-card";

const FractalDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);

  const images = Array.from({ length: 16 }, (_, i) => {
    return `/fractals/fractal_${i + 1}.jpg`;
  });

  return (
    <div className="bg-background p-3 h-full flex flex-col">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
      <div className="flex flex-row justify-center">
        <NeonGradientCard className="w-full items-center justify-center text-center">
          <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            {languageProvider.getText("fractal_title")}
          </span>
          <div className="pt-3">{languageProvider.getText("fractal_description")}</div>
        </NeonGradientCard>
      </div>
      <div className="h-4" />
      <div className="overflow-y-scroll rounded-xl z-20 pt-3 relative size-full">
        <div className="columns-2 gap-4 sm:columns-3">
          {images.map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.02} inView>
              <img className="z-20 mb-4 size-full rounded-xl object-contain" src={imageUrl} alt={`Fractal Render ${idx + 1}`} />
            </BlurFade>
          ))}
        </div>
      </div>

      <GithubButton languageProvider={languageProvider} url={"https://github.com/Mac-Adam/Infinite_Fractal_Unity"} />
    </div>
  );
};

export default FractalDescription;
