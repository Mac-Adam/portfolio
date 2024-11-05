"use client";
import React, { useState } from "react";

import { cn } from "./../../lib/utils";

const OrigamiDescription = ({ languageProvider }) => {
  const [language, setLanguage] = useState(languageProvider.language);
  languageProvider.addCallback(setLanguage);
  return <div className="space-y-6 bg-background p-6 h-full flex flex-col"></div>;
};

export default OrigamiDescription;
