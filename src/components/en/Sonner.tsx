"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

// If you remove this style import, the toast will work as expected in one page, after going to another page, the toast style will be lost
import "node_modules/sonner/dist/styles.css"

interface SonnerProps {
  iconBtn?: React.ReactNode | undefined;
}

const hour = new Date().toLocaleTimeString();

export default function Sonner(props: SonnerProps) {
  return (
    <Button
      variant="ghost"
      className="triggerBtn transition-colors hover:bg-accent hover:cursor-(--cursorPointer) hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md p-2"
      aria-label="Copy email to clipboard button"
      onClick={() => {
        navigator.clipboard.writeText("eslavi_jonhas@hotmail.com");
        toast("Email copied to clipboard!", {
          description: hour.toString(),
        });
      }}
    >
      {props.iconBtn}
    </Button>
  )
}