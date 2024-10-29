"use client";
import React, { useState } from "react";

import { cn } from "./../../lib/utils";
import { AnimatedList } from "../ui/animated-list";
import SparklesText from "../ui/sparkles-text";
import GithubButton from "./githubButton";
let notifications = [
  {
    name: "suilo_team_main",
    description: "suilo_team_des",
    time: "suilo_team_sub",

    icon: "👥",
    color: "#00C9A7",
  },
  {
    name: "suilo_front_main",
    description: "suilo_front_des",
    time: "suilo_front_sub",
    icon: "💻",
    color: "#FFB800",
  },
  {
    name: "suilo_back_main",
    description: "suilo_back_des",
    time: "suilo_back_sub",
    icon: "🏢",
    color: "#FF3D71",
  },
  {
    name: "suilo_student_main",
    description: "suilo_student_des",
    time: "suilo_student_sub",
    icon: "🧑‍🎓",
    color: "#1E86FF",
  },
  {
    name: "suilo_gov_main",
    description: "suilo_gov_des",
    time: "suilo_gov_sub",
    icon: "🤴",
    color: "#f7702d",
  },
];

const Notification = ({ name, description, icon, color, time, languageProvider }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[500px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{languageProvider.getText(name)}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{languageProvider.getText(time)}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">{languageProvider.getText(description)}</p>
        </div>
      </div>
    </figure>
  );
};

const SuiloDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);

  return (
    <div className="relative flex h-full w-full flex-col p-6 overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <SparklesText
        className="text-center p-6"
        colors={{ first: "#7953db", second: "#ed641f" }}
        text={languageProvider.getText("suilo_title")}
      />
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} languageProvider={languageProvider} />
        ))}
      </AnimatedList>
      <GithubButton languageProvider={languageProvider} url={"https://github.com/reqill/suilo-website-v2"} />
    </div>
  );
};

export default SuiloDescription;
