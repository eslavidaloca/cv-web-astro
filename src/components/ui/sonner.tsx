import { Toaster as Sonner, type ToasterProps } from "sonner"
import { useState } from "react"

import { useMounted } from "@/hooks/use-mounted";
import { useChangeTheme } from "@/hooks/change-theme";

import { useStore } from '@nanostores/react';
import { isDarkMode} from '@/themeToggle.ts';

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<ToasterProps["theme"]>(useStore(isDarkMode) ? "light" : "dark");

  useChangeTheme(setTheme);

  const mounted = useMounted();

  return mounted ? (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  ) : (
    <div />
  );
}

export { Toaster }
