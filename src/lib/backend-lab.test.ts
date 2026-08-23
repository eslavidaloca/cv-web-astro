import { describe, expect, it } from "vitest";
import {
	labStepIndex,
	queryChartY,
	queryCount,
	queryShare,
} from "./backend-lab";

describe("queryCount", () => {
	it("returns the unbatched production count", () => {
		expect(queryCount({ cached: false, batched: false })).toBe(700);
	});

	it("returns the batched production count", () => {
		expect(queryCount({ cached: false, batched: true })).toBe(120);
	});

	it("skips Postgres on a cache hit even if queries are unbatched", () => {
		expect(queryCount({ cached: true, batched: false })).toBe(0);
		expect(queryCount({ cached: true, batched: true })).toBe(0);
	});
});

describe("query chart mapping", () => {
	it("maps 700 to the top of the plot and 0 to the bottom", () => {
		expect(queryShare(700)).toBe(1);
		expect(queryShare(0)).toBe(0);
		expect(queryChartY(700, 700, 18, 158)).toBe(18);
		expect(queryChartY(0, 700, 18, 158)).toBe(158);
	});

	it("places batched 120 between the extremes", () => {
		const y = queryChartY(120, 700, 18, 158);
		expect(y).toBeGreaterThan(18);
		expect(y).toBeLessThan(158);
	});

	it("steps raw, batched, then cached", () => {
		expect(labStepIndex({ cached: false, batched: false })).toBe(0);
		expect(labStepIndex({ cached: false, batched: true })).toBe(1);
		expect(labStepIndex({ cached: true, batched: true })).toBe(2);
	});
});
