"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface SonnerProps {
  iconBtn?: React.ReactNode | undefined;
}

const hour = new Date().toLocaleTimeString();

export default function Sonner(props: SonnerProps) {
  return (
    <Button
      variant="ghost"
      className="triggerBtn transition-colors hover:bg-accent hover:cursor-(--cursorPointer) hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md p-2"
      onClick={() => {
        navigator.clipboard.writeText("eslavi_jonhas@hotmail.com");
        toast("Se copio el correo al portapapeles!", {
          description: hour.toString(),
        });
      }}
    >
      {props.iconBtn}
    </Button>
  )
}