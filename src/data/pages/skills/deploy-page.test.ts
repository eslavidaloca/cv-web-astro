import { describe, expect, it } from "vitest";
import {
	deployPageEn,
	deployPageEs,
	type DeployPageContent,
} from "./deploy-page";

function isPageRouteHref(href: string): boolean {
	return !href.endsWith(".pdf");
}

function internalHrefs(content: DeployPageContent): string[] {
	const { hero, cta } = content;
	return [
		hero.primaryCta.href,
		cta.primary.href,
		...cta.links.map((link) => link.href),
	].filter((href) => href.startsWith("/"));
}

function stackItemCount(content: DeployPageContent): number {
	return content.stack.groups.reduce((sum, group) => sum + group.items.length, 0);
}

describe("deploy page content", () => {
	it("keeps matching case ids across locales", () => {
		const enIds = deployPageEn.cases.items.map((item) => item.id);
		const esIds = deployPageEs.cases.items.map((item) => item.id);
		expect(esIds).toEqual(enIds);
		expect(enIds).toEqual(["fleet", "ops", "cv"]);
	});

	it("aligns proof stats with fleet scale figures", () => {
		expect(deployPageEn.proof.stats[0].value).toBe("80+");
		expect(deployPageEn.proof.stats[1].value).toBe("50k+");
		expect(deployPageEs.proof.stats[0].value).toBe("80+");
		expect(deployPageEs.proof.stats[1].value).toBe("50k+");
	});

	it("prefixes Spanish page routes with /es/", () => {
		for (const href of internalHrefs(deployPageEs)) {
			if (!isPageRouteHref(href)) continue;
			expect(href.startsWith("/es/")).toBe(true);
		}
	});

	it("keeps English page routes unprefixed", () => {
		for (const href of internalHrefs(deployPageEn)) {
			if (!isPageRouteHref(href)) continue;
			expect(href.startsWith("/es/")).toBe(false);
			expect(href.startsWith("/en/")).toBe(false);
		}
	});

	it("provides an icon slug or local icon for every stack item in both locales", () => {
		for (const content of [deployPageEn, deployPageEs]) {
			for (const group of content.stack.groups) {
				for (const item of group.items) {
					const hasIcon = Boolean(item.icon?.length);
					const hasLocal = Boolean(item.local?.length);
					expect(hasIcon || hasLocal).toBe(true);
					expect(hasIcon && hasLocal).toBe(false);
				}
			}
		}
	});

	it("keeps the same stack item count across locales", () => {
		expect(stackItemCount(deployPageEs)).toBe(stackItemCount(deployPageEn));
		expect(stackItemCount(deployPageEn)).toBeGreaterThan(0);
	});

	it("sequences terminal lines with monotonic delays ending in done", () => {
		for (const content of [deployPageEn, deployPageEs]) {
			const lines = content.terminal.lines;
			expect(lines[lines.length - 1].kind).toBe("done");
			for (let i = 1; i < lines.length; i++) {
				expect(lines[i].delay).toBeGreaterThanOrEqual(lines[i - 1].delay);
			}
		}
	});

	it("shares the same deploy command prelude across locales", () => {
		const enCommands = deployPageEn.terminal.lines.filter((line) => line.kind === "command");
		const esCommands = deployPageEs.terminal.lines.filter((line) => line.kind === "command");
		expect(esCommands.map((line) => line.delay)).toEqual(
			enCommands.map((line) => line.delay),
		);
		expect(enCommands.map((line) => line.delay)).toEqual([0, 1700]);
		expect(enCommands.map((line) => line.text)).toEqual([
			"> gitlab-runner exec deploy",
			"> docker build -t ecr/site:2026.08.23",
		]);
	});
});
