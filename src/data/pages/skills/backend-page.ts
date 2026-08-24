export type StackItem = {
	title: string;
	/** Simple Icons slug */
	icon: string;
};

export type CostSide = {
	value: string;
	label: string;
	detail: string;
};

export type BackendCase = {
	id: string;
	layer: string;
	title: string;
	body: string;
	highlight: string;
};

export type LabCopy = {
	headline: string;
	subtext: string;
	cacheOn: string;
	cacheOff: string;
	batchOn: string;
	batchOff: string;
	queriesLabel: string;
	hitLabel: string;
	missLabel: string;
	traceRequest: string;
	traceRequestState: string;
	traceCache: string;
	tracePostgres: string;
	skippedLabel: string;
	chartCaption: string;
	chartRaw: string;
	chartBatched: string;
	chartCached: string;
};

export type BackendPageContent = {
	hero: {
		headline: string;
		headlineAccent: string;
		subtext: string;
		primaryCta: { label: string; href: string };
		secondaryCta: { label: string; href: string };
		imageAlt: string;
	};
	cost: {
		headline: string;
		subtext: string;
		before: CostSide;
		after: CostSide;
	};
	stack: {
		headline: string;
		subtext: string;
		groups: { name: string; items: StackItem[]; span?: "full" }[];
	};
	cases: {
		headline: string;
		items: BackendCase[];
	};
	lab: LabCopy;
	cta: {
		headline: string;
		body: string;
		primary: { label: string; href: string };
		links: { label: string; href: string }[];
	};
};

const stackGroups: BackendPageContent["stack"]["groups"] = [
	{
		name: "Runtimes",
		items: [
			{ title: "Node.js", icon: "nodedotjs" },
			{ title: "Java", icon: "openjdk" },
			{ title: "Python", icon: "python" },
			{ title: "PHP", icon: "php" },
			{ title: "JavaScript", icon: "javascript" },
		],
	},
	{
		name: "Frameworks",
		items: [
			{ title: "Express", icon: "express" },
			{ title: "NestJS", icon: "nestjs" },
			{ title: "Spring Boot", icon: "springboot" },
			{ title: "Spring Batch", icon: "spring" },
			{ title: "Django", icon: "django" },
			{ title: "Wagtail", icon: "wagtail" },
			{ title: "Laravel", icon: "laravel" },
		],
	},
	{
		name: "Data",
		span: "full",
		items: [
			{ title: "PostgreSQL", icon: "postgresql" },
			{ title: "MySQL", icon: "mysql" },
			{ title: "Redis", icon: "redis" },
		],
	},
];

export const backendPageEn: BackendPageContent = {
	hero: {
		headline: "Backend that makes",
		headlineAccent: "each request cheaper",
		subtext:
			"APIs, caches, and databases behind 80+ government sites and the platforms that run them.",
		primaryCta: { label: "See my work", href: "/work" },
		secondaryCta: {
			label: "GitHub",
			href: "https://github.com/eslavidaloca",
		},
		imageAlt:
			"Dark data-center aisle with charcoal racks and a muted emerald light along one row",
	},
	cost: {
		headline: "What a request used to cost",
		subtext:
			"On a live admin platform I cut the database work per request, then cached what did not need to hit Postgres again.",
		before: {
			value: "700",
			label: "Queries per request",
			detail: "12s to first paint, before caching and query collapse",
		},
		after: {
			value: "120",
			label: "Queries per request",
			detail: "3s to first paint. Same product, less wait",
		},
	},
	stack: {
		headline: "The layers I ship on",
		subtext:
			"Runtimes and frameworks I use in production, plus the stores that hold the data.",
		groups: stackGroups,
	},
	cases: {
		headline: "Systems that had to keep running",
		items: [
			{
				id: "oficios",
				layer: "API",
				title: "Official mail, tracked end to end",
				body: "I am building a core administrative platform to digitize and track official government communications for department directors, unifying inter-departmental workflows instead of scattered inboxes.",
				highlight: "One path for oficios",
			},
			{
				id: "ibm",
				layer: "Workflow",
				title: "Payroll that could not stall",
				body: "At IBM I led development and maintenance of a payment processing module inside a 10-module enterprise system for accountant payroll. I fixed bugs that blocked the end-to-end payment flow so payroll could finish.",
				highlight: "Critical path in 10 modules",
			},
			{
				id: "cfe",
				layer: "Data",
				title: "Stock and leave in one app",
				body: "For CFE I built a management app across facilities: real-time inventory with inter-warehouse product requests, plus an employee portal for vacation requests with automated approval workflows.",
				highlight: "Inventory and approvals live",
			},
		],
	},
	lab: {
		headline: "Feel the query cut",
		subtext:
			"Toggle cache and batching. Counts come from a real platform: 700 queries per request down to 120.",
		cacheOn: "Redis cache on",
		cacheOff: "Redis cache off",
		batchOn: "Optimized queries",
		batchOff: "Unoptimized queries",
		queriesLabel: "Queries to Postgres",
		hitLabel: "Cache hit",
		missLabel: "Cache miss",
		traceRequest: "Request",
		traceRequestState: "received",
		traceCache: "Cache",
		tracePostgres: "Postgres",
		skippedLabel: "skipped",
		chartCaption: "Queries per request",
		chartRaw: "Before",
		chartBatched: "Now (optimized)",
		chartCached: "Cached",
	},
	cta: {
		headline: "Want the full picture?",
		body: "Download the CV for the complete timeline, or see how I ship these services.",
		primary: {
			label: "Download CV",
			href: "/eslavi-cv-english.pdf",
		},
		links: [
			{ label: "Frontend", href: "/skills/frontend" },
			{ label: "Deploying", href: "/skills/deploy" },
			{ label: "LinkedIn", href: "https://www.linkedin.com/in/eslavi/" },
		],
	},
};

export const backendPageEs: BackendPageContent = {
	hero: {
		headline: "Backend que hace",
		headlineAccent: "cada petición más barata",
		subtext:
			"APIs, cachés y bases de datos detrás de más de 80 sitios gubernamentales y las plataformas que los operan.",
		primaryCta: { label: "Ver mi trabajo", href: "/es/work" },
		secondaryCta: {
			label: "GitHub",
			href: "https://github.com/eslavidaloca",
		},
		imageAlt:
			"Pasillo oscuro de centro de datos con racks de carbón y una luz esmeralda suave en una fila",
	},
	cost: {
		headline: "Lo que costaba cada petición",
		subtext:
			"En una plataforma administrativa real recorté el trabajo de base de datos por petición y luego cacheé lo que no tenía que volver a Postgres.",
		before: {
			value: "700",
			label: "Consultas por petición",
			detail: "12s hasta el primer pintado, antes de caché y colapso de consultas",
		},
		after: {
			value: "120",
			label: "Consultas por petición",
			detail: "3s hasta el primer pintado, mismo producto, menos espera",
		},
	},
	stack: {
		headline: "Las capas con las que entrego",
		subtext:
			"Runtimes y frameworks que uso en producción, más los almacenes que guardan los datos.",
		groups: [
			{ name: "Runtimes", items: stackGroups[0].items },
			{ name: "Frameworks", items: stackGroups[1].items },
			{ name: "Datos", span: "full", items: stackGroups[2].items },
		],
	},
	cases: {
		headline: "Sistemas que tenían que seguir en pie",
		items: [
			{
				id: "oficios",
				layer: "API",
				title: "Oficios rastreados de punta a punta",
				body: "Estoy construyendo una plataforma administrativa para digitalizar y rastrear comunicaciones oficiales de directores, unificando flujos entre departamentos en lugar de bandejas sueltas.",
				highlight: "Un camino para oficios",
			},
			{
				id: "ibm",
				layer: "Flujo",
				title: "Nómina que no podía detenerse",
				body: "En IBM lideré el desarrollo y mantenimiento de un módulo de pagos dentro de un sistema empresarial de 10 módulos para distribución de nómina. Corregí errores que bloqueaban el flujo de punta a punta para que la nómina terminara.",
				highlight: "Ruta crítica en 10 módulos",
			},
			{
				id: "cfe",
				layer: "Datos",
				title: "Inventario y vacaciones en una app",
				body: "Para CFE construí una app de gestión en varias instalaciones: inventario en tiempo real con solicitudes entre almacenes, más un portal de vacaciones con flujos de aprobación automáticos.",
				highlight: "Inventario y aprobaciones en vivo",
			},
		],
	},
	lab: {
		headline: "Siente el recorte de consultas",
		subtext:
			"Activa caché y agrupación. Los conteos vienen de una plataforma real: 700 consultas por petición bajaron a 120.",
		cacheOn: "Caché Redis activa",
		cacheOff: "Caché Redis apagada",
		batchOn: "Consultas agrupadas",
		batchOff: "Consultas sueltas",
		queriesLabel: "Consultas a Postgres",
		hitLabel: "Acierto de caché",
		missLabel: "Fallo de caché",
		traceRequest: "Petición",
		traceRequestState: "entra",
		traceCache: "Caché",
		tracePostgres: "Postgres",
		skippedLabel: "omitido",
		chartCaption: "Consultas por petición",
		chartRaw: "Sueltas",
		chartBatched: "Agrupadas",
		chartCached: "Caché",
	},
	cta: {
		headline: "¿Quieres el panorama completo?",
		body: "Descarga el CV para la línea de tiempo completa, o mira cómo publico estos servicios.",
		primary: {
			label: "Descargar CV",
			href: "/eslavi-cv-español.pdf",
		},
		links: [
			{ label: "Frontend", href: "/es/skills/frontend" },
			{ label: "Desplegar", href: "/es/skills/deploy" },
			{ label: "LinkedIn", href: "https://www.linkedin.com/in/eslavi/" },
		],
	},
};
