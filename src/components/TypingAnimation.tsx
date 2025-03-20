import { TypingAnimation } from "@/components/magicui/typing-animation";

interface TypingAnimation {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
    as?: React.ElementType;
    startOnView?: boolean;
}

export function TypingAnimationComponent(props: TypingAnimation) {
    return <TypingAnimation className={props.className} duration={props.duration} delay={props.delay} as={props.as} startOnView={props.startOnView}>{props.text}</TypingAnimation>;
}