//I needed some specific functionality which I wasn't sure is implemented in i18n, it was simpler to just implement it.
import websiteText from "./websiteText.js";
export default class LanguageProvider {
  constructor(language) {
    if (language === "pl") {
      this.language = "pl";
    } else {
      this.language = "en";
    }
    this.resources = websiteText;
    this.callbacks = [];
  }
  setLanguage(language) {
    if (language !== "pl" && language !== "en") {
      return;
    }
    if (language === this.language) {
      return;
    }
    this.language = language;
    this.callbacks.forEach((c) => c(language));
  }
  addCallback(callback) {
    this.callbacks.push(callback);
  }
  getText(key) {
    return this.resources[key] ? this.resources[key][this.language] : "";
  }
}
