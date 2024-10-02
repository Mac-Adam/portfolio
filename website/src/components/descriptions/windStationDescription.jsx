import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { GitHubLogoIcon, OpacityIcon, BarChartIcon, EyeOpenIcon, LightningBoltIcon, CubeIcon, PaperPlaneIcon } from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "./../ui/bento-grid";
import { BorderBeam } from "../ui/border-beam";
import { cn } from "./../../lib/utils";
import { AnimatedGridPattern } from "../ui/animated-grid-pattern";
import AnimatedGradientText from "../ui/animated-gradient-text";

const features = [
  {
    Icon: OpacityIcon,
    name: "ws_rm_name",
    description: "ws_rm_short_description",
    fullDes: "ws_rm_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:row-start-4 lg:row-end-7 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: BarChartIcon,
    name: "ws_web_name",
    description: "ws_web_short_description",
    fullDes: "ws_web_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: LightningBoltIcon,
    name: "ws_esp_name",
    description: "none",
    fullDes: "ws_esp_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-5 lg:row-end-7",
  },
  {
    Icon: PaperPlaneIcon,
    name: "ws_wm_name",
    description: "ws_wm_short_description",
    fullDes: "ws_wm_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-5",
  },
  {
    Icon: CubeIcon,
    name: "ws_3dp_name",
    description: "none",
    fullDes: "ws_3dp_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: EyeOpenIcon,
    name: "ws_other_name",
    description: "ws_other_short_description",
    fullDes: "ws_other_description",
    cta: "learn_more",
    background: <img className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-7",
  },
];

const WindStationDescription = ({ children, ...props }) => {
  const [language, setLanguage] = useState(props.languageProvider.language);
  props.languageProvider.addCallback(setLanguage);
  const [current, setCurrent] = useState("ws_esp_description");
  return (
    <div className="h-full flex flex-col p-4">
      <BentoGrid className="lg:grid-rows-6 pb-4">
        {features.map((feature) => (
          <BentoCard onClick={setCurrent} key={feature.name} languageProvider={props.languageProvider} {...feature} />
        ))}
      </BentoGrid>
      <div className="p-3 relative flex flex-col flex-1 w-full overflow-hidden rounded-xl border bg-background md:shadow-xl">
        <span className="flex-1 flex-col whitespace-pre-line pointer-events-none bg-gradient-to-b from-black to-slate-800 bg-clip-text text-left text-lg font-semibold leading-none text-transparent dark:from-slate-900 dark:to-slate-900/10">
          {props.languageProvider.getText(current)}
        </span>
        <div
          onClick={() => {
            window.open("https://github.com/Mac-Adam/weather_station", "_blank");
          }}
          className="cursor-pointer absolute inset-x-0 bottom-0 py-2 flex w-full items-center justify-center"
        >
          <AnimatedGradientText>
            <GitHubLogoIcon />
            <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              {props.languageProvider.getText("github")}
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </div>
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
