import { describe, expect, it } from "vitest";
import {
	LAB_REFERENCE_COUNTS,
	labChartPoints,
	labLivePath,
	labStepIndex,
	labStoryPath,
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

describe("queryShare", () => {
	it("returns 0 when max is zero or negative", () => {
		expect(queryShare(100, 0)).toBe(0);
		expect(queryShare(100, -1)).toBe(0);
	});

	it("clamps counts below zero and above max", () => {
		expect(queryShare(-50)).toBe(0);
		expect(queryShare(900)).toBe(1);
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

	it("treats any cache hit as the cached step regardless of batching", () => {
		expect(labStepIndex({ cached: true, batched: false })).toBe(2);
	});
});

describe("lab chart paths", () => {
	const points = labChartPoints();

	it("builds three reference points aligned with production counts", () => {
		expect(points).toHaveLength(LAB_REFERENCE_COUNTS.length);
		expect(points[0]).toBe(`56,${queryChartY(700)}`);
		expect(points[1]).toBe(`180,${queryChartY(120)}`);
		expect(points[2]).toBe(`304,${queryChartY(0)}`);
	});

	it("draws the full story path across all points", () => {
		expect(labStoryPath(points)).toBe(`M ${points.join(" L ")}`);
	});

	it("reveals the live path progressively from raw to cached", () => {
		expect(labLivePath(0, points)).toBe(`M ${points[0]}`);
		expect(labLivePath(1, points)).toBe(`M ${points[0]} L ${points[1]}`);
		expect(labLivePath(2, points)).toBe(labStoryPath(points));
	});
});
