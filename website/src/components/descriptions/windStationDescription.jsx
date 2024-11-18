import React, { useState } from "react";

import { OpacityIcon, BarChartIcon, EyeOpenIcon, LightningBoltIcon, CubeIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "./../ui/bento-grid";
import { BorderBeam } from "../ui/border-beam";
import { cn } from "./../../lib/utils";
import { AnimatedGridPattern } from "../ui/animated-grid-pattern";
import BlurFade from "../ui/blur-fade";
import GithubButton from "./githubButton";

const features = [
  {
    Icon: OpacityIcon,
    name: "ws_rm_name",
    description: "ws_rm_short_description",
    fullDes: "ws_rm_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "row-start-4 row-end-7 col-start-2 col-end-3",
  },
  {
    Icon: BarChartIcon,
    name: "ws_web_name",
    description: "ws_web_short_description",
    fullDes: "ws_web_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "row-start-1 row-end-4 col-start-2 col-end-3",
  },
  {
    Icon: LightningBoltIcon,
    name: "ws_esp_name",
    description: "none",
    fullDes: "ws_esp_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "col-start-1 col-end-2 row-start-5 row-end-7",
  },
  {
    Icon: PaperPlaneIcon,
    name: "ws_wm_name",
    description: "ws_wm_short_description",
    fullDes: "ws_wm_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "col-start-1 col-end-2 row-start-1 row-end-5",
  },
  {
    Icon: CubeIcon,
    name: "ws_3dp_name",
    description: "none",
    fullDes: "ws_3dp_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "col-start-3 col-end-3 row-start-1 row-end-3",
  },
  {
    Icon: EyeOpenIcon,
    name: "ws_other_name",
    description: "ws_other_short_description",
    fullDes: "ws_other_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "col-start-3 col-end-3 row-start-3 row-end-7",
  },
];

const WindStationDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);
  const [current, setCurrent] = useState("ws_esp_description");
  return (
    <div className="h-full flex flex-col p-4">
      <BentoGrid className="grid-rows-6 pb-4">
        {features.map((feature) => (
          <BentoCard onClick={setCurrent} key={feature.name} languageProvider={languageProvider} {...feature} />
        ))}
      </BentoGrid>
      <div className="p-4 relative flex flex-col flex-1 w-full overflow-hidden rounded-xl border bg-background md:shadow-xl">
        <BlurFade key={current} inView>
          <span className="flex-1 flex-col whitespace-pre-line pointer-events-none bg-gradient-to-b from-black to-slate-800 bg-clip-text text-left text-lg font-semibold leading-none text-transparent dark:from-slate-900 dark:to-slate-900/10">
            {languageProvider.getText(current)}
          </span>
        </BlurFade>
        <GithubButton languageProvider={languageProvider} url="https://github.com/Mac-Adam/weather_station" />
        <BorderBeam size={250} duration={15} delay={9} borderWidth={2} />
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
      </div>
    </div>
  );
};

export default WindStationDescription;
