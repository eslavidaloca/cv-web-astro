export type QueryCountInput = {
	cached: boolean;
	batched: boolean;
};

export const QUERY_MAX = 700;

export const LAB_CHART_XS = [56, 180, 304] as const;
export const LAB_REFERENCE_COUNTS = [700, 120, 0] as const;
export const LAB_PLOT_TOP = 18;
export const LAB_PLOT_BOTTOM = 158;

/** CV numbers: 700 unbatched, 120 batched. A cache hit skips Postgres. */
export function queryCount({ cached, batched }: QueryCountInput): number {
	if (cached) return 0;
	return batched ? 120 : 700;
}

export function labStepIndex({ cached, batched }: QueryCountInput): 0 | 1 | 2 {
	if (cached) return 2;
	if (batched) return 1;
	return 0;
}

export function queryShare(count: number, max = QUERY_MAX): number {
	if (max <= 0) return 0;
	return Math.min(1, Math.max(0, count / max));
}

export function queryChartY(
	count: number,
	max = QUERY_MAX,
	top = LAB_PLOT_TOP,
	bottom = LAB_PLOT_BOTTOM,
): number {
	return bottom - queryShare(count, max) * (bottom - top);
}

export function labChartPoints(
	counts: readonly number[] = LAB_REFERENCE_COUNTS,
	xs: readonly number[] = LAB_CHART_XS,
	max = QUERY_MAX,
	top = LAB_PLOT_TOP,
	bottom = LAB_PLOT_BOTTOM,
): string[] {
	return counts.map(
		(count, i) => `${xs[i]},${queryChartY(count, max, top, bottom)}`,
	);
}

/** Full reference curve for the systems lab chart. */
export function labStoryPath(points: string[]): string {
	return `M ${points.join(" L ")}`;
}

/** Progressive curve shown as the user toggles batching and cache. */
export function labLivePath(step: number, points: string[]): string {
	return step === 0 ? `M ${points[0]}` : `M ${points.slice(0, step + 1).join(" L ")}`;
}
