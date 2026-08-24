export type StackItem = {
	title: string;
	/** Simple Icons slug, when the brand is on the CDN */
	icon?: string;
	/** astro-icon name under src/icons, used when Simple Icons has no slug */
	local?: string;
};

export type ProofStat = {
	value: string;
	label: string;
	detail: string;
};

export type DeployCase = {
	id: string;
	stage: string;
	title: string;
	body: string;
	highlight: string;
};

export type TerminalLine = {
	kind: "command" | "ok" | "done";
	text: string;
	delay: number;
};

export type DeployPageContent = {
	hero: {
		headline: string;
		headlineAccent: string;
		subtext: string;
		primaryCta: { label: string; href: string };
		secondaryCta: { label: string; href: string };
	};
	proof: {
		headline: string;
		subtext: string;
		stats: [ProofStat, ProofStat];
		imageAlt: string;
	};
	stack: {
		headline: string;
		subtext: string;
		groups: { name: string; items: StackItem[] }[];
	};
	cases: {
		headline: string;
		items: DeployCase[];
	};
	terminal: {
		lines: TerminalLine[];
	};
	cta: {
		headline: string;
		body: string;
		primary: { label: string; href: string };
		links: { label: string; href: string }[];
	};
};

const stackGroups: DeployPageContent["stack"]["groups"] = [
	{
		name: "CI/CD",
		items: [
			{ title: "GitLab Runners", icon: "gitlab" },
			{ title: "Git", icon: "git" },
			{ title: "GitHub", icon: "github" },
			{ title: "Vercel", icon: "vercel" },
		],
	},
	{
		name: "Containers",
		items: [
			{ title: "Docker", icon: "docker" },
			{ title: "Kubernetes", icon: "kubernetes" },
		],
	},
	{
		name: "AWS",
		items: [
			{ title: "EC2", local: "deploy/awsec2-icon" },
			{ title: "ECS", local: "deploy/awsecs-icon" },
			{ title: "ECR", local: "deploy/aws-icon" },
			{ title: "S3", local: "deploy/awss3-icon" },
			{ title: "RDS", local: "deploy/awsrds-icon" },
			{ title: "SDK", local: "deploy/aws-icon" },
		],
	},
	{
		name: "Ops",
		items: [
			{ title: "Linux", icon: "linux" },
			{ title: "Ubuntu", icon: "ubuntu" },
			{ title: "Bash", icon: "gnubash" },
			{ title: "Apache", icon: "apache" },
			{ title: "OpenTelemetry", icon: "opentelemetry" },
		],
	},
];

const terminalCommands: Pick<TerminalLine, "kind" | "text" | "delay">[] = [
	{ kind: "command", text: "> gitlab-runner exec deploy", delay: 0 },
	{ kind: "command", text: "> docker build -t ecr/site:2026.08.23", delay: 1700 },
];

export const deployPageEn: DeployPageContent = {
	hero: {
		headline: "Releases that keep",
		headlineAccent: "80+ sites healthy",
		subtext:
			"GitLab runners, Docker tags, and backups behind government sites that take 50,000 visits a day.",
		primaryCta: { label: "See my work", href: "/work" },
		secondaryCta: {
			label: "GitHub",
			href: "https://github.com/eslavidaloca",
		},
	},
	proof: {
		headline: "What the fleet has to survive",
		subtext:
			"Numbers from the government sites I keep shipping, not a lab cluster.",
		stats: [
			{
				value: "80+",
				label: "Sites on automated pipelines",
				detail: "GitLab Runners, Docker versioning, and nightly database backups",
			},
			{
				value: "50k+",
				label: "Daily visits those pipelines serve",
				detail: "Informative government sites that have to stay up",
			},
		],
		imageAlt:
			"Dark server room with charcoal racks and a muted emerald light along one aisle",
	},
	stack: {
		headline: "The tools I ship with",
		subtext:
			"Runners, containers, AWS, and the Linux box the jobs actually land on.",
		groups: stackGroups,
	},
	cases: {
		headline: "Pipelines I have run in production",
		items: [
			{
				id: "fleet",
				stage: "Pipeline",
				title: "CI/CD for 80+ government sites",
				body: "I automated DevOps workflows for 80+ sites with GitLab Runners, automated database backups, and structured Docker image versioning so releases did not wait on a manual hop.",
				highlight: "Runners, tags, backups",
			},
			{
				id: "ops",
				stage: "Fleet",
				title: "One console for sites and buckets",
				body: "I built an internal management platform for 80+ sites and AWS S3 buckets, plus a central Analytics view that pulled performance data into executive dashboards.",
				highlight: "Sites and S3 in one place",
			},
			{
				id: "cv",
				stage: "This site",
				title: "GitHub to Vercel, hands off",
				body: "This CV ships through an automated continuous deployment pipeline on GitHub and Vercel. Push, build, live.",
				highlight: "Deploy on every push",
			},
		],
	},
	terminal: {
		lines: [
			...terminalCommands,
			{ kind: "ok", text: "✔ Checkout", delay: 3200 },
			{ kind: "ok", text: "✔ Image tagged", delay: 3700 },
			{ kind: "ok", text: "✔ Push to ECR", delay: 4200 },
			{ kind: "ok", text: "✔ ECS service update", delay: 4700 },
			{ kind: "ok", text: "✔ Nightly backup to S3", delay: 5200 },
			{ kind: "ok", text: "✔ 80 sites healthy", delay: 5700 },
			{ kind: "done", text: "Deploy finished.", delay: 6400 },
		],
	},
	cta: {
		headline: "Want the full picture?",
		body: "Download the CV for the complete timeline, or see the services these pipelines ship.",
		primary: {
			label: "Download CV",
			href: "/eslavi-cv-english.pdf",
		},
		links: [
			{ label: "Backend", href: "/skills/backend" },
			{ label: "Frontend", href: "/skills/frontend" },
			{ label: "LinkedIn", href: "https://www.linkedin.com/in/eslavi/" },
		],
	},
};

export const deployPageEs: DeployPageContent = {
	hero: {
		headline: "Lanzamientos que mantienen",
		headlineAccent: "80+ sitios en pie",
		subtext:
			"Runners de GitLab, etiquetas Docker y respaldos detrás de sitios de gobierno con 50,000 visitas al día.",
		primaryCta: { label: "Ver mi trabajo", href: "/es/work" },
		secondaryCta: {
			label: "GitHub",
			href: "https://github.com/eslavidaloca",
		},
	},
	proof: {
		headline: "Lo que la flota tiene que aguantar",
		subtext:
			"Cifras de los sitios de gobierno que sigo publicando, no de un clúster de laboratorio.",
		stats: [
			{
				value: "80+",
				label: "Sitios en pipelines automáticos",
				detail: "GitLab Runners, versionado Docker y respaldos nocturnos de base de datos",
			},
			{
				value: "50k+",
				label: "Visitas diarias que esos pipelines sirven",
				detail: "Sitios informativos de gobierno que tienen que seguir en pie",
			},
		],
		imageAlt:
			"Sala de servidores oscura con racks de carbón y una luz esmeralda suave en un pasillo",
	},
	stack: {
		headline: "Las herramientas con las que publico",
		subtext:
			"Runners, contenedores, AWS y la caja Linux donde realmente caen los jobs.",
		groups: [
			{ name: "CI/CD", items: stackGroups[0].items },
			{ name: "Contenedores", items: stackGroups[1].items },
			{ name: "AWS", items: stackGroups[2].items },
			{ name: "Ops", items: stackGroups[3].items },
		],
	},
	cases: {
		headline: "Pipelines que he corrido en producción",
		items: [
			{
				id: "fleet",
				stage: "Pipeline",
				title: "CI/CD para más de 80 sitios de gobierno",
				body: "Automaticé flujos de DevOps para más de 80 sitios con GitLab Runners, respaldos de base de datos y versionado estructurado de imágenes Docker para que el release no esperara un paso manual.",
				highlight: "Runners, etiquetas, respaldos",
			},
			{
				id: "ops",
				stage: "Flota",
				title: "Una consola para sitios y buckets",
				body: "Construí una plataforma interna para más de 80 sitios y buckets de AWS S3, más una vista central de Analytics que juntaba datos de desempeño en tableros ejecutivos.",
				highlight: "Sitios y S3 en un solo lugar",
			},
			{
				id: "cv",
				stage: "Este sitio",
				title: "De GitHub a Vercel, sin tocar",
				body: "Este CV se publica con un pipeline de despliegue continuo en GitHub y Vercel. Push, build, en vivo.",
				highlight: "Despliegue en cada push",
			},
		],
	},
	terminal: {
		lines: [
			...terminalCommands,
			{ kind: "ok", text: "✔ Checkout", delay: 3200 },
			{ kind: "ok", text: "✔ Imagen etiquetada", delay: 3700 },
			{ kind: "ok", text: "✔ Push a ECR", delay: 4200 },
			{ kind: "ok", text: "✔ Actualización del servicio ECS", delay: 4700 },
			{ kind: "ok", text: "✔ Respaldo nocturno a S3", delay: 5200 },
			{ kind: "ok", text: "✔ 80 sitios en pie", delay: 5700 },
			{ kind: "done", text: "Despliegue terminado.", delay: 6400 },
		],
	},
	cta: {
		headline: "¿Quieres el panorama completo?",
		body: "Descarga el CV para la línea de tiempo completa, o mira los servicios que estos pipelines publican.",
		primary: {
			label: "Descargar CV",
			href: "/eslavi-cv-español.pdf",
		},
		links: [
			{ label: "Backend", href: "/es/skills/backend" },
			{ label: "Frontend", href: "/es/skills/frontend" },
			{ label: "LinkedIn", href: "https://www.linkedin.com/in/eslavi/" },
		],
	},
};
