"use client";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";

export default function AnimatedShinyTextDemo(props: {children?: React.ReactNode, className?: string, rounded?: boolean}) {
    return (
        <div className="z-10 flex mt-5 items-center justify-center">
            <div
                className={cn(
                    (props.rounded ? "rounded-full group border border-black/5 bg-neutral-100 dark:border-white/5 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800" : ""),
                    "text-base text-white transition-all ease-in hover:cursor-(--cursorPointer)",
                ) + " " + props.className}
            >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                    <span>{props.children}</span>
                </AnimatedShinyText>
            </div>
        </div>
    );
}
