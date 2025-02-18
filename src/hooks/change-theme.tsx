import { useEffect } from 'react';
import { type ToasterProps } from "sonner"

export const useChangeTheme = (setTheme: (theme: ToasterProps["theme"]) => void) => {
  useEffect(() => {
    const observer = new MutationObserver(() => {
        const currentTheme = document.body.className as "light" | "dark" | "system";
        setTheme(currentTheme === "light" ? "dark" : "light");
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    setTheme(document.body.className as ToasterProps["theme"] === "light" ? "dark" : "light");

    return () => {
      observer.disconnect();
    };
  }, [setTheme]);
};