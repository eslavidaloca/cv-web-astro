"use client"
 
import { toast } from "sonner"
 
import { Button } from "@/components/ui/button"

interface SonnerProps {
  iconBtn?: React.ReactNode | undefined;
}

// get the now time
const hour = new Date().toLocaleTimeString();

export default function Sonner(props: SonnerProps) {
  return (
    <Button
      variant="ghost"
      className="transition-colors hover:bg-accent hover:cursor-pointer hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md p-2"
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