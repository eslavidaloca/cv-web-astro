"use client";

import {
	AnimatedSpan,
	Terminal,
	TypingAnimation,
} from "@/components/magicui/terminal";
import type { TerminalLine } from "@/data/pages/skills/deploy-page";
import { useReducedMotion } from "motion/react";

type DeployTerminalProps = {
	lines: TerminalLine[];
};

function lineClass(kind: TerminalLine["kind"]) {
	if (kind === "ok") return "text-green-700 dark:text-green-500";
	if (kind === "done") return "text-muted-foreground";
	return undefined;
}

export default function DeployTerminal({ lines }: DeployTerminalProps) {
	const reduce = useReducedMotion();

	return (
		<Terminal className="skills-deploy-terminal bg-olive-100 dark:bg-gray-900 max-h-none max-w-none h-auto w-full">
			{lines.map((line) => {
				if (reduce) {
					return (
						<span key={`${line.kind}-${line.delay}`} className={lineClass(line.kind)}>
							{line.text}
						</span>
					);
				}

				if (line.kind === "ok") {
					return (
						<AnimatedSpan
							key={`${line.kind}-${line.delay}`}
							delay={line.delay}
							className={lineClass(line.kind)}
						>
							<span>{line.text}</span>
						</AnimatedSpan>
					);
				}

				return (
					<TypingAnimation
						key={`${line.kind}-${line.delay}`}
						delay={line.delay}
						className={lineClass(line.kind)}
					>
						{line.text}
					</TypingAnimation>
				);
			})}
		</Terminal>
	);
}
