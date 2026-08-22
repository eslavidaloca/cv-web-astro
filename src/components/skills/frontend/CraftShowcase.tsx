"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { CraftDemo } from "@/data/pages/skills/frontend-page";

type CraftShowcaseProps = {
	demos: CraftDemo[];
	hydratedLabel: string;
	staticLabel: string;
	toggleOn: string;
	toggleOff: string;
};

export default function CraftShowcase({
	demos,
	hydratedLabel,
	staticLabel,
	toggleOn,
	toggleOff,
}: CraftShowcaseProps) {
	const reduce = useReducedMotion();
	const [islandOn, setIslandOn] = useState(true);
	const [selected, setSelected] = useState(0);

	const byId = Object.fromEntries(demos.map((d) => [d.id, d])) as Record<
		CraftDemo["id"],
		CraftDemo
	>;

	return (
		<div className="grid gap-6 md:grid-cols-3">
			<div className="flex flex-col gap-3 rounded-md border border-slate-200 bg-background/80 p-5 dark:border-slate-700">
				<h3 className="text-lg font-semibold tracking-tight">
					{byId.islands.title}
				</h3>
				<p className="text-sm leading-relaxed text-slate-500 dark:text-mauve-900">
					{byId.islands.body}
				</p>
				<div className="mt-auto flex flex-col gap-3 pt-2">
					<button
						type="button"
						onClick={() => setIslandOn((v) => !v)}
						className="inline-flex h-9 items-center justify-center rounded-md bg-green-700 px-4 text-sm font-medium text-white transition hover:bg-green-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700/40 dark:bg-green-500 dark:text-zinc-950 dark:hover:bg-green-400"
					>
						{islandOn ? toggleOff : toggleOn}
					</button>
					<div
						className="rounded-md border border-slate-200 bg-slate-50 px-3 py-4 text-center text-sm font-medium dark:border-slate-700 dark:bg-slate-900"
						aria-live="polite"
					>
						{islandOn ? (
							reduce ? (
								<span className="text-green-700 dark:text-green-500">
									{hydratedLabel}
								</span>
							) : (
								<motion.span
									key="on"
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									className="inline-block text-green-700 dark:text-green-500"
								>
									{hydratedLabel}
								</motion.span>
							)
						) : (
							<span className="text-slate-500 dark:text-mauve-900">
								{staticLabel}
							</span>
						)}
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-3 rounded-md border border-slate-200 bg-background/80 p-5 dark:border-slate-700">
				<h3 className="text-lg font-semibold tracking-tight">
					{byId.focus.title}
				</h3>
				<p className="text-sm leading-relaxed text-slate-500 dark:text-mauve-900">
					{byId.focus.body}
				</p>
				<div
					className="mt-auto flex flex-wrap gap-2 pt-2"
					role="group"
					aria-label={byId.focus.title}
				>
					{[0, 1, 2].map((i) => (
						<button
							key={i}
							type="button"
							onClick={() => setSelected(i)}
							aria-pressed={selected === i}
							className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-green-500 ${
								selected === i
									? "border-green-700 bg-green-700 text-white dark:border-green-500 dark:bg-green-500 dark:text-zinc-950"
									: "border-slate-300 bg-transparent text-foreground hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
							}`}
						>
							{i + 1}
						</button>
					))}
				</div>
			</div>

			{/* Web frosted-glass approximation (not Apple Liquid Glass) */}
			<div className="frontend-craft-glass relative flex flex-col gap-3 overflow-hidden rounded-md border border-white/40 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:border-white/15">
				<div
					className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/50 to-white/10 dark:from-white/10 dark:to-slate-950/40"
					aria-hidden="true"
				/>
				<h3 className="text-lg font-semibold tracking-tight">
					{byId.glass.title}
				</h3>
				<p className="text-sm leading-relaxed text-slate-600 dark:text-mauve-900">
					{byId.glass.body}
				</p>
				<p className="mt-auto pt-2 text-xs text-slate-500 dark:text-mauve-800">
					backdrop-filter web approximation
				</p>
			</div>
		</div>
	);
}
