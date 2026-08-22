export type StackItem = {
	title: string;
	/** Simple Icons slug */
	icon: string;
};

export type Metric = {
	value: string;
	label: string;
	detail: string;
	span: "hero" | "wide" | "default";
};

export type CaseStudy = {
	id: string;
	title: string;
	body: string;
	highlight: string;
	layout: "split" | "feature" | "stack";
};

export type CraftDemo = {
	id: "islands" | "focus" | "glass";
	title: string;
	body: string;
};

export type FrontendPageContent = {
	hero: {
		headline: string;
		headlineAccent: string;
		subtext: string;
		primaryCta: { label: string; href: string };
		secondaryCta: { label: string; href: string };
	};
	metrics: Metric[];
	stack: {
		headline: string;
		subtext: string;
		groups: { name: string; items: StackItem[] }[];
	};
	cases: {
		headline: string;
		items: CaseStudy[];
	};
	craft: {
		headline: string;
		subtext: string;
		demos: CraftDemo[];
		hydratedLabel: string;
		staticLabel: string;
		toggleOn: string;
		toggleOff: string;
	};
	cta: {
		headline: string;
		body: string;
		primary: { label: string; href: string };
		links: { label: string; href: string }[];
	};
};

const stackGroups: FrontendPageContent["stack"]["groups"] = [
	{
		name: "Frameworks",
		items: [
			{ title: "Astro", icon: "astro" },
			{ title: "React", icon: "react" },
			{ title: "Angular", icon: "angular" },
			{ title: "Svelte", icon: "svelte" },
		],
	},
	{
		name: "Language",
		items: [
			{ title: "TypeScript", icon: "typescript" },
			{ title: "JavaScript", icon: "javascript" },
		],
	},
	{
		name: "Styling",
		items: [
			{ title: "Tailwind", icon: "tailwindcss" },
			{ title: "SCSS", icon: "sass" },
			{ title: "Bootstrap", icon: "bootstrap" },
			{ title: "CSS3", icon: "css" },
			{ title: "HTML5", icon: "html5" },
		],
	},
];

export const frontendPageEn: FrontendPageContent = {
	hero: {
		headline: "Frontend that stays",
		headlineAccent: "fast under load",
		subtext:
			"5+ years shipping accessible Angular, React, Svelte, and Astro apps for high-traffic teams.",
		primaryCta: { label: "See my work", href: "/work" },
		secondaryCta: {
			label: "GitHub",
			href: "https://github.com/eslavidaloca",
		},
	},
	metrics: [
		{
			value: "75%",
			label: "Faster loads",
			detail: "Peak page-load improvement across optimized platforms",
			span: "hero",
		},
		{
			value: "12s → 3s",
			label: "Load time cut",
			detail: "Caching plus query reduction from 700 to 120 per request",
			span: "wide",
		},
		{
			value: "80+",
			label: "Gov sites live",
			detail: "Collectively 50,000+ daily visits with reliability in mind",
			span: "default",
		},
		{
			value: "6+",
			label: "Projects on one template",
			detail: "Shared frontend library accelerating team velocity",
			span: "default",
		},
	],
	stack: {
		headline: "The tools I reach for",
		subtext:
			"Modern frameworks, typed JavaScript, and styling systems that scale across teams.",
		groups: stackGroups,
	},
	cases: {
		headline: "Frontend work that moved the needle",
		items: [
			{
				id: "template",
				title: "One template, six-plus projects",
				body: "I architected a standardized frontend project template and reusable component library now adopted across 6+ active government projects, so teams ship UI that looks and behaves the same.",
				highlight: "Shared architecture, faster onboarding",
				layout: "split",
			},
			{
				id: "perf",
				title: "Twelve seconds down to three",
				body: "On a high-traffic admin platform I cut load time from 12s to 3s with request caching and by collapsing database queries from 700 to 120 per request. Same product, dramatically less wait.",
				highlight: "Up to 75% faster page loads",
				layout: "feature",
			},
			{
				id: "hub",
				title: "Applications Hub for officials",
				body: "I designed and built a unified portal where directors manage tasks, get real-time notifications, and process permit approvals in one interface, sitting beside 80+ informative sites under one DevOps umbrella.",
				highlight: "One interface for multi-site ops",
				layout: "stack",
			},
		],
	},
	craft: {
		headline: "Craft you can feel on this page",
		subtext:
			"Astro islands, motion that respects reduced preference, and focus states you can tab through.",
		hydratedLabel: "Island hydrated",
		staticLabel: "Static HTML only",
		toggleOn: "Hydrate island",
		toggleOff: "Unload island",
		demos: [
			{
				id: "islands",
				title: "Island hydration",
				body: "Static HTML first. Interactive bits hydrate only when needed.",
			},
			{
				id: "focus",
				title: "Keyboard-first UI",
				body: "Tab through these controls. Focus rings stay visible and intentional.",
			},
			{
				id: "glass",
				title: "Theme-aware surface",
				body: "Frosted panel approximation that keeps contrast in light and dark.",
			},
		],
	},
	cta: {
		headline: "Want the full picture?",
		body: "Download the CV for the complete timeline, or browse the work section for live project context.",
		primary: {
			label: "Download CV",
			href: "/eslavi-cv-english.pdf",
		},
		links: [
			{ label: "LinkedIn", href: "https://www.linkedin.com/in/eslavi/" },
		],
	},
};

export const frontendPageEs: FrontendPageContent = {
	hero: {
		headline: "Frontend que se mantiene",
		headlineAccent: "rápido bajo carga",
		subtext:
			"Más de 5 años entregando apps accesibles en Angular, React, Svelte y Astro para equipos de alto tráfico.",
		primaryCta: { label: "Ver mi trabajo", href: "/es/work" },
		secondaryCta: {
			label: "GitHub",
			href: "https://github.com/eslavidaloca",
		},
	},
	metrics: [
		{
			value: "75%",
			label: "Cargas más rápidas",
			detail: "Mejora pico de tiempo de carga en plataformas optimizadas",
			span: "hero",
		},
		{
			value: "12s → 3s",
			label: "Tiempo de carga",
			detail: "Caché y reducción de consultas de 700 a 120 por petición",
			span: "wide",
		},
		{
			value: "80+",
			label: "Sitios gubernamentales",
			detail: "Más de 50,000 visitas diarias con enfoque en confiabilidad",
			span: "default",
		},
		{
			value: "6+",
			label: "Proyectos con una plantilla",
			detail: "Biblioteca frontend compartida que acelera al equipo",
			span: "default",
		},
	],
	stack: {
		headline: "Las herramientas que uso",
		subtext:
			"Frameworks modernos, JavaScript tipado y sistemas de estilos que escalan en equipos.",
		groups: [
			{
				name: "Frameworks",
				items: stackGroups[0].items,
			},
			{
				name: "Lenguaje",
				items: stackGroups[1].items,
			},
			{
				name: "Estilos",
				items: stackGroups[2].items,
			},
		],
	},
	cases: {
		headline: "Trabajo frontend que movió la aguja",
		items: [
			{
				id: "template",
				title: "Una plantilla, más de seis proyectos",
				body: "Arquitecté una plantilla frontend estandarizada y una biblioteca de componentes reutilizable adoptada en más de 6 proyectos gubernamentales activos, para que los equipos entreguen UI consistente.",
				highlight: "Arquitectura compartida, onboarding más rápido",
				layout: "split",
			},
			{
				id: "perf",
				title: "De doce segundos a tres",
				body: "En una plataforma administrativa de alto tráfico bajé el tiempo de carga de 12s a 3s con caché de peticiones y al reducir consultas de 700 a 120 por request. Mismo producto, mucho menos espera.",
				highlight: "Hasta 75% más rápido",
				layout: "feature",
			},
			{
				id: "hub",
				title: "Hub de aplicaciones para funcionarios",
				body: "Diseñé y construí un portal unificado donde directores gestionan tareas, reciben notificaciones en tiempo real y procesan permisos en una sola interfaz, junto a más de 80 sitios informativos bajo un mismo DevOps.",
				highlight: "Una interfaz para operaciones multi-sitio",
				layout: "stack",
			},
		],
	},
	craft: {
		headline: "Oficio que se siente en esta página",
		subtext:
			"Islas de Astro, motion que respeta preferencias reducidas, y estados de foco que puedes recorrer con teclado.",
		hydratedLabel: "Isla hidratada",
		staticLabel: "Solo HTML estático",
		toggleOn: "Hidratar isla",
		toggleOff: "Descargar isla",
		demos: [
			{
				id: "islands",
				title: "Hidratación por islas",
				body: "HTML estático primero. Lo interactivo se hidrata solo cuando hace falta.",
			},
			{
				id: "focus",
				title: "UI con teclado primero",
				body: "Recorre estos controles con Tab. Los anillos de foco se ven y son intencionales.",
			},
			{
				id: "glass",
				title: "Superficie según tema",
				body: "Aproximación de panel esmerilado que mantiene contraste en claro y oscuro.",
			},
		],
	},
	cta: {
		headline: "¿Quieres el panorama completo?",
		body: "Descarga el CV para la línea de tiempo completa, o revisa la sección de trabajo para el contexto de proyectos.",
		primary: {
			label: "Descargar CV",
			href: "/eslavi-cv-español.pdf",
		},
		links: [
			{ label: "LinkedIn", href: "https://www.linkedin.com/in/eslavi/" },
		],
	},
};

/** Flat list for the single page marquee */
export function flatStackItems(content: FrontendPageContent): StackItem[] {
	return content.stack.groups.flatMap((g) => g.items);
}
