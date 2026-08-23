export type QueryCountInput = {
	cached: boolean;
	batched: boolean;
};

export const QUERY_MAX = 700;

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
	top = 18,
	bottom = 158,
): number {
	return bottom - queryShare(count, max) * (bottom - top);
}
