import { describe, expect, it } from "vitest";
import {
	backendPageEn,
	backendPageEs,
	type BackendPageContent,
} from "./backend-page";

function isPageRouteHref(href: string): boolean {
	return !href.endsWith(".pdf");
}

function internalHrefs(content: BackendPageContent): string[] {
	const { hero, cta } = content;
	return [
		hero.primaryCta.href,
		hero.secondaryCta.href,
		cta.primary.href,
		...cta.links.map((link) => link.href),
	].filter((href) => href.startsWith("/"));
}

describe("backend page content", () => {
	it("keeps matching case ids across locales", () => {
		const enIds = backendPageEn.cases.items.map((item) => item.id);
		const esIds = backendPageEs.cases.items.map((item) => item.id);
		expect(esIds).toEqual(enIds);
		expect(enIds).toEqual(["oficios", "ibm", "cfe"]);
	});

	it("aligns hero cost figures with the interactive lab reference counts", () => {
		expect(backendPageEn.cost.before.value).toBe("700");
		expect(backendPageEn.cost.after.value).toBe("120");
		expect(backendPageEs.cost.before.value).toBe("700");
		expect(backendPageEs.cost.after.value).toBe("120");
	});

	it("prefixes Spanish page routes with /es/", () => {
		for (const href of internalHrefs(backendPageEs)) {
			if (!isPageRouteHref(href)) continue;
			expect(href.startsWith("/es/")).toBe(true);
		}
	});

	it("keeps English page routes unprefixed", () => {
		for (const href of internalHrefs(backendPageEn)) {
			if (!isPageRouteHref(href)) continue;
			expect(href.startsWith("/es/")).toBe(false);
			expect(href.startsWith("/en/")).toBe(false);
		}
	});

	it("provides icon slugs for every stack item in both locales", () => {
		for (const content of [backendPageEn, backendPageEs]) {
			for (const group of content.stack.groups) {
				for (const item of group.items) {
					expect(item.icon.length).toBeGreaterThan(0);
				}
			}
		}
	});
});
