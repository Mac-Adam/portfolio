"use client";
import React, { useRef, useState } from "react";

import { cn } from "./../../lib/utils";
import { FadeText } from "../ui/fade-text";
import ShinyButton from "../ui/shiny-button";
import Confetti from "../ui/confetti";
import confetti from "canvas-confetti";

const SmashbotDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);
  const confettiRef = useRef(null);

  const [currDescription, setCurrDescription] = useState("sb_what_is_it_des");

  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <div className="space-y-6 bg-background p-6 h-full flex flex-col items-center">
      <FadeText
        className="text-6xl font-bold text-black dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 0.2 } },
        }}
        text={languageProvider.getText("smashbot_title")}
      />
      <div className="my-12 flex flex-wrap justify-center gap-4 w-3/4">
        <ShinyButton
          onClick={() => {
            setCurrDescription("sb_what_is_it_des");
          }}
        >
          {languageProvider.getText("sb_what_is_it_bn")}
        </ShinyButton>
        <ShinyButton
          onClick={() => {
            setCurrDescription("sb_my_role_des");
          }}
        >
          {languageProvider.getText("sb_my_role_bn")}
        </ShinyButton>
        <ShinyButton
          onClick={() => {
            setCurrDescription("sb_about_project_des");
          }}
        >
          {languageProvider.getText("sb_about_project_bn")}
        </ShinyButton>
        <ShinyButton
          onClick={() => {
            setCurrDescription("sb_robocomp2024_des");
            handleClick();
          }}
        >
          {languageProvider.getText("sb_robocomp2024_bn")}
        </ShinyButton>
        <ShinyButton
          onClick={() => {
            setCurrDescription("sb_xChalange2024_des");
          }}
        >
          {languageProvider.getText("sb_xChalange2024_bn")}
        </ShinyButton>
      </div>
      <div className="shadow-2xl h-1/2 border p-4">{languageProvider.getText(currDescription)}</div>
      <div className="shadow-2xl flex h-[35%]">
        <div className="absolute left-0 pointer-events-none h-full w-1/4 bg-gradient-to-r from-white "></div>
        <div className="absolute right-0 pointer-events-none h-full w-1/4 bg-gradient-to-l from-white "></div>
        <figure className="flex overflow-x-hidden items-center">
          <img className="h-full w-auto object-cover" src="laweciarze.jpg"></img>
        </figure>
      </div>
    </div>
  );
};

export default SmashbotDescription;
