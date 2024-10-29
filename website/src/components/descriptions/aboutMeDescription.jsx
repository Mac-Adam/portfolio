"use client";
import React, { useState } from "react";

import { cn } from "./../../lib/utils";

const AboutMeDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);

  return <div className="bg-background p-3 h-full flex flex-col"></div>;
};

export default AboutMeDescription;
