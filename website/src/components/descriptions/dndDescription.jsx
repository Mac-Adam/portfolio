"use client";
import React, { useState } from "react";

import { cn } from "./../../lib/utils";
import { MagicTweet } from "../ui/tweet-card";
import DotPattern from "../ui/dot-pattern";
import GithubButton from "./githubButton";
import BlurIn from "../ui/blur-in";

const DnDDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);
  const tweet1 = {
    user: {
      screen_name: "HugeDnDFan31",
      name: "Mercer Fan",
      profile_image_url_https: "/d20.jpg",
    },
    entities: [
      {
        type: "text",
        text: languageProvider.getText("dnd_tweet1"),
      },
    ],
  };
  const tweet2 = {
    user: {
      screen_name: "xXxDragonSlayerxXx",
      name: "Bard Bowman",
      profile_image_url_https: "/dragon.png",
    },
    entities: [
      {
        type: "text",
        text: languageProvider.getText("dnd_tweet2"),
      },
    ],
  };
  const tweet3 = {
    user: {
      screen_name: "NerdSlayerWasTaken",
      name: "Charles Johnson",
      profile_image_url_https: "/barbell.jpg",
    },
    entities: [
      {
        type: "text",
        text: languageProvider.getText("dnd_tweet3"),
      },
    ],
  };
  return (
    <div className="p-3 space-y-2 relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <BlurIn className={"z-10"}>
        <MagicTweet tweet={tweet1} />
      </BlurIn>
      <BlurIn className={"z-10"}>
        <MagicTweet tweet={tweet2} />
      </BlurIn>
      <BlurIn className={"z-10"}>
        <MagicTweet tweet={tweet3} />
      </BlurIn>
      <DotPattern className={cn("[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]")} />
      <GithubButton languageProvider={languageProvider} url={"https://github.com/Mac-Adam/DnD-Tracker"} />
    </div>
  );
};

export default DnDDescription;
