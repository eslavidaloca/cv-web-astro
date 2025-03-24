"use client";

import { useState, useEffect } from "react";

import { TypingAnimation } from "@/components/magicui/typing-animation";

interface TypingAnimation {
    className?: string;
    duration?: number;
    delay?: number;
    as?: React.ElementType;
    startOnView?: boolean;
}

export function TypingAnimationComponent(props: TypingAnimation) {

    const [year, setYear] = useState("2025");

    useEffect(() => {
        const buttons = document.querySelectorAll("button.year-button");

        const handleClick = (event: Event) => {
            const button = event.currentTarget as HTMLButtonElement;
            const parent = button.parentElement;
            const newYear = parent?.getAttribute("data-year") || "2025";
            setYear(newYear);
        };

        buttons.forEach((button) => {
            button.addEventListener("click", handleClick);
        });

        // Cleanup: Eliminar los event listeners cuando el componente se desmonta
        return () => {
            buttons.forEach((button) => {
                button.removeEventListener("click", handleClick);
            });
        };
    }, []);

    return <TypingAnimation className={props.className} duration={props.duration} delay={props.delay} as={props.as} startOnView={props.startOnView}>{year}</TypingAnimation>;
}