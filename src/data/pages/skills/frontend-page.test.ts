import { describe, expect, it } from "vitest";
import {
	flatStackItems,
	frontendPageEn,
	frontendPageEs,
	type FrontendPageContent,
} from "./frontend-page";

function makeContent(
	groups: FrontendPageContent["stack"]["groups"],
): FrontendPageContent {
	return {
		...frontendPageEn,
		stack: { ...frontendPageEn.stack, groups },
	};
}

describe("flatStackItems", () => {
	it("flattens stack groups in order", () => {
		const content = makeContent([
			{
				name: "A",
				items: [
					{ title: "React", icon: "react" },
					{ title: "Svelte", icon: "svelte" },
				],
			},
			{ name: "B", items: [{ title: "Astro", icon: "astro" }] },
		]);

		expect(flatStackItems(content)).toEqual([
			{ title: "React", icon: "react" },
			{ title: "Svelte", icon: "svelte" },
			{ title: "Astro", icon: "astro" },
		]);
	});

	it("returns an empty list when there are no groups", () => {
		expect(flatStackItems(makeContent([]))).toEqual([]);
	});

	it("preserves every production stack icon for the marquee loop", () => {
		const icons = flatStackItems(frontendPageEn).map((item) => item.icon);
		expect(icons.length).toBeGreaterThan(0);
		expect(new Set(icons).size).toBe(icons.length);
		expect(icons.every((icon) => icon.length > 0)).toBe(true);
	});

	it("keeps the same stack item count across locales", () => {
		expect(flatStackItems(frontendPageEs).length).toBe(
			flatStackItems(frontendPageEn).length,
		);
	});
});
