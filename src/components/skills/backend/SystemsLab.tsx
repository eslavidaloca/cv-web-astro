"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
	LAB_CHART_XS,
	LAB_PLOT_BOTTOM,
	LAB_PLOT_TOP,
	LAB_REFERENCE_COUNTS,
	labChartPoints,
	labLivePath,
	labStepIndex,
	labStoryPath,
	queryChartY,
	queryCount,
} from "@/lib/backend-lab";
import type { LabCopy } from "@/data/pages/skills/backend-page";

type SystemsLabProps = {
	copy: LabCopy;
};

const XS = LAB_CHART_XS;
const COUNTS = LAB_REFERENCE_COUNTS;
const PLOT_TOP = LAB_PLOT_TOP;
const PLOT_BOTTOM = LAB_PLOT_BOTTOM;

function TraceValue({
	value,
	reduce,
}: {
	value: string;
	reduce: boolean | null;
}) {
	if (reduce) return <span>{value}</span>;
	return (
		<motion.span
			key={value}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
			className="inline-block"
		>
			{value}
		</motion.span>
	);
}

export default function SystemsLab({ copy }: SystemsLabProps) {
	const reduce = useReducedMotion();
	const [cached, setCached] = useState(false);
	const [batched, setBatched] = useState(false);
	const queries = queryCount({ cached, batched });
	const step = labStepIndex({ cached, batched });
	const cacheState = cached ? copy.hitLabel : copy.missLabel;
	const postgresState = cached ? copy.skippedLabel : String(queries);
	const axis = [copy.chartRaw, copy.chartBatched, copy.chartCached];
	const points = labChartPoints(COUNTS, XS);
	const storyPath = labStoryPath(points);
	const livePath = labLivePath(step, points);
	const marker = {
		x: XS[step],
		y: queryChartY(COUNTS[step], 700, PLOT_TOP, PLOT_BOTTOM),
	};

	return (
		<div className="skills-backend-lab">
			<div className="skills-backend-lab-controls">
				<button
					type="button"
					aria-pressed={batched}
					onClick={() => setBatched((v) => !v)}
					className="skills-backend-lab-toggle"
				>
					{batched ? copy.batchOn : copy.batchOff}
				</button>
				<button
					type="button"
					aria-pressed={cached}
					onClick={() => setCached((v) => !v)}
					className="skills-backend-lab-toggle"
				>
					{cached ? copy.cacheOn : copy.cacheOff}
				</button>
			</div>

			<div className="skills-backend-lab-chart-wrap">
				<svg
					className="skills-backend-lab-chart"
					viewBox="0 0 360 200"
					role="img"
					aria-label={`${copy.chartCaption}: ${queries} ${copy.queriesLabel}`}
				>
					<title>{`${copy.chartCaption}: ${queries}`}</title>
					<text x="8" y="22" className="skills-backend-lab-axis">
						700
					</text>
					<text
						x="8"
						y={queryChartY(120, 700, PLOT_TOP, PLOT_BOTTOM) + 4}
						className="skills-backend-lab-axis"
					>
						120
					</text>
					<text x="8" y="162" className="skills-backend-lab-axis">
						0
					</text>
					<path
						d={storyPath}
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						className="skills-backend-lab-story"
					/>
					<motion.path
						d={livePath}
						fill="none"
						stroke="var(--green)"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
						initial={false}
					/>
					{COUNTS.map((count, i) => (
						<circle
							key={count}
							cx={XS[i]}
							cy={queryChartY(count, 700, PLOT_TOP, PLOT_BOTTOM)}
							r={i === step ? 0 : 4}
							className="skills-backend-lab-dot"
						/>
					))}
					<motion.circle
						cx={marker.x}
						cy={marker.y}
						r="7"
						fill="var(--green)"
						initial={false}
						animate={{ cx: marker.x, cy: marker.y }}
						transition={
							reduce
								? { duration: 0 }
								: { type: "spring", stiffness: 140, damping: 22 }
						}
					/>
					{axis.map((label, i) => (
						<text
							key={label}
							x={XS[i]}
							y="188"
							textAnchor="middle"
							className="skills-backend-lab-axis"
						>
							{label}
						</text>
					))}
				</svg>
			</div>

			<div className="skills-backend-lab-board" aria-live="polite">
				<div className="skills-backend-lab-metric">
					<div className="skills-backend-lab-metric-value">
						<TraceValue value={String(queries)} reduce={reduce} />
					</div>
					<div className="skills-backend-lab-metric-label">
						{copy.queriesLabel}
					</div>
				</div>
				<ol className="skills-backend-lab-trace">
					<li className="skills-backend-lab-step">
						<span className="skills-backend-lab-step-name">
							{copy.traceRequest}
						</span>
						<span className="skills-backend-lab-step-state">
							{copy.traceRequestState}
						</span>
					</li>
					<li
						className={`skills-backend-lab-step${cached ? " skills-backend-lab-step--skip" : ""}`}
					>
						<span className="skills-backend-lab-step-name">
							{copy.tracePostgres}
						</span>
						<span className="skills-backend-lab-step-state">
							<TraceValue value={postgresState} reduce={reduce} />
						</span>
					</li>
					<li
						className={`skills-backend-lab-step${cached ? " skills-backend-lab-step--hit" : ""}`}
					>
						<span className="skills-backend-lab-step-name">
							{copy.traceCache}
						</span>
						<span className="skills-backend-lab-step-state">
							<TraceValue value={cacheState} reduce={reduce} />
						</span>
					</li>
				</ol>
			</div>
		</div>
	);
}
