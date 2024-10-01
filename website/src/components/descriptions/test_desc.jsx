import React, { useState } from "react";

import { RainbowButton } from "../ui/rainbow-button";

const TestDescription = ({ children, ...props }) => {
  const [language, setLanguage] = useState(props.languageProvider.language);
  props.languageProvider.addCallback(setLanguage);
  return <RainbowButton>{props.languageProvider.getText("test")}</RainbowButton>;
};

export default TestDescription;
