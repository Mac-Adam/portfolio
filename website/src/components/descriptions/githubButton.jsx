import { GitHubLogoIcon } from "@radix-ui/react-icons";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import React from "react";
import { cn } from "./../../lib/utils";

const GithubButton = ({ languageProvider, url }) => {
  return (
    <div
      onClick={() => {
        window.open(url, "_blank");
      }}
      className="z-30 cursor-pointer absolute inset-x-0 bottom-0 py-2 flex w-full items-center justify-center"
    >
      <AnimatedGradientText>
        <GitHubLogoIcon />
        <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          {languageProvider.getText("github")}
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
    </div>
  );
};

export default GithubButton;
