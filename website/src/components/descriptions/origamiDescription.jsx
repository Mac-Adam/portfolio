"use client";
import React, { useState } from "react";

import { cn } from "./../../lib/utils";
import AnimatedShinyText from "../ui/animated-shiny-text";
import Meteors from "../ui/meteors";
import BoxReveal from "../ui/box-reveal";
import Marquee from "../ui/marquee";
import InstagramButton from "./instagramButton";

const row1 = Array.from({ length: 27 }, (_, i) => i + 1);
const row2 = Array.from({ length: 27 }, (_, i) => i + 28);

const OrigamiImage = ({ idx }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border flex items-center justify-center",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <img className="" alt="" src={`/origami/${idx}.jpg`} />
    </figure>
  );
};

const OrigamiDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);
  return (
    <div className="space-y-6 bg-background p-6 h-full flex flex-col">
      <AnimatedShinyText className="p-6 text-6xl inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
        <span>{languageProvider.getText("origami_title")}</span>
      </AnimatedShinyText>
      <div className="h-1/6 p-4 relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-background md:shadow-xl">
        <Meteors number={30} />
        <BoxReveal key={languageProvider.language} boxColor="#7c3aed" className="text-xl text-black dark:text-white">
          {languageProvider.getText("origami_description")}
        </BoxReveal>
      </div>
      <div className="relative flex h-3/5 w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Marquee pauseOnHover className="[--duration:60s]">
          {row1.map((idx) => (
            <OrigamiImage key={idx} idx={idx} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:60s]">
          {row2.map((idx) => (
            <OrigamiImage key={idx} idx={idx} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
      <InstagramButton languageProvider={languageProvider} url="https://www.instagram.com/adam.origami" />
    </div>
  );
};

export default OrigamiDescription;
