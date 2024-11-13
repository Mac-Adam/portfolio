"use client";
import React, { useState } from "react";

import { cn } from "./../../lib/utils";
import { FadeText } from "../ui/fade-text";
import ShinyButton from "../ui/shiny-button";

const SmashbotDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);
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
        <ShinyButton>{languageProvider.getText("sb_what_is_it_bn")}</ShinyButton>
        <ShinyButton>{languageProvider.getText("sb_my_role_bn")}</ShinyButton>
        <ShinyButton>{languageProvider.getText("sb_about_project_bn")}</ShinyButton>
        <ShinyButton>{languageProvider.getText("sb_robocomp2024_bn")}</ShinyButton>
        <ShinyButton>{languageProvider.getText("sb_xChalange2024_bn")}</ShinyButton>
      </div>
    </div>
  );
};

export default SmashbotDescription;
