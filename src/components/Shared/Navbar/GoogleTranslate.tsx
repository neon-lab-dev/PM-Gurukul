/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

const GoogleTranslate = ({pathname} : any) => {
  useEffect(() => {
    // Prevent loading the script multiple times
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      // Remove any existing widget first (avoids duplicates)
      const existing = document.querySelector(".goog-te-gadget");
      if (existing) existing.remove();

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "as,bn,gu,hi,kn,ml,mr,ne,or,pa,sa,sd,ta,te,ur",
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        },
        "google_translate_element"
      );
    };
  }, [pathname]);

  return <div id="google_translate_element" className="w-fit"></div>;
};

export default GoogleTranslate;
