"use client";

import React from "react";
import { useStore } from '@nanostores/react';
import { isDarkMode } from '@/nanostores';

import { useMounted } from "@/hooks/use-mounted";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const SunIcon = () => (
  <>
    <motion.svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: { duration: 0.2, type: "spring", stiffness: 100 },
      }}
      exit={{
        scale: 0.5,
        opacity: 0,
        rotate: 90,
        transition: { duration: 0.2 },
      }}
    >
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </motion.svg>
  </>
);

const MoonIcon = () => (
  <>
    <motion.svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: { duration: 0.2, type: "spring", stiffness: 100 },
      }}
      exit={{
        scale: 0.5,
        opacity: 0,
        rotate: 90,
        transition: { duration: 0.2 },
      }}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </motion.svg>
  </>
);

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState(useStore(isDarkMode) === "dark" ? "dark" : "light");

  const $isDarkMode = useStore(isDarkMode);
  
  const toggleTheme = () => {
    $isDarkMode === "light" ? isDarkMode.set("dark") : isDarkMode.set("light");
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  
  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const mounted = useMounted();
  
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  return mounted ? (
    <button
      role="button"
      onClick={toggleTheme}
      className="triggerBtn min-h-[40px] block focus:outline-none hover:cursor-(--cursorPointer) transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md p-2"
    >
      <span className="sr-only">Toggle mode</span>
      <AnimatePresence initial={false}>
        {theme !== "dark" ? <SunIcon /> : <MoonIcon />}
      </AnimatePresence>
    </button>
  ) : (
    <div />
  );
}