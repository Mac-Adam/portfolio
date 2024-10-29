"use client";
import React, { useState } from "react";

import { cn } from "./../../lib/utils";
import SparklesText from "../ui/sparkles-text";
import WordRotate from "../ui/word-rotate";
import Particles from "../ui/particles";

const AboutMeDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);

  return (
    <div className="space-y-6 bg-background p-6 h-full flex flex-col">
      <SparklesText className="text-center" text="Adam Maciuga" sparklesCount={15} colors={{ first: "#7953db", second: "#323da1" }} />
      <div className="flex flex-row flex-wrap justify-between px-3">
        <WordRotate className="text-4xl font-bold text-black dark:text-white" words={languageProvider.getText("about_me_tech")} />
        <WordRotate className="text-4xl font-bold text-black dark:text-white" words={languageProvider.getText("about_me_languages")} />
        <WordRotate className="text-4xl font-bold text-black dark:text-white" words={languageProvider.getText("about_me_abilities")} />
      </div>

      <div className="py-10 relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-background md:shadow-xl">
        <Particles className="absolute inset-0" quantity={100} ease={80} color={"#000000"} refresh />
        <span className="p-3 whitespace-pre-line pointer-events-none leading-none dark:from-white dark:to-slate-900/10">
          {languageProvider.getText("about_me_description")}
        </span>
      </div>
    </div>
  );
};

export default AboutMeDescription;
