export const siteUrl = 'https://liao.gg/';
export const pageTitle = 'Kevin Liao';
export const pageDescription =
	'Kevin Liao is a software engineer from New York City building AI products with a focus on productivity.';
export const socialImage = new URL('/images/container.jpg', siteUrl).toString();
export const socialImageAlt = "Kevin Liao's Portfolio Website";

export class ProjectItem {
	public readonly name: string;
	public readonly description: string;
	public readonly image: string;
	public readonly alt: string;
	public readonly href: string;
	public readonly revealDelayMs: number;
	public readonly textDelayMs: number;

	public constructor(
		name: string,
		description: string,
		image: string,
		alt: string,
		href: string,
		revealDelayMs: number,
		textDelayMs: number
	) {
		this.name = name;
		this.description = description;
		this.image = image;
		this.alt = alt;
		this.href = href;
		this.revealDelayMs = revealDelayMs;
		this.textDelayMs = textDelayMs;
	}
}

export class ContactLink {
	public readonly label: string;
	public readonly href: string;

	public constructor(label: string, href: string) {
		this.label = label;
		this.href = href;
	}
}

export const projects = [
	new ProjectItem(
		'Nitro',
		'A simple and efficient harness for Bash. Translate natural language into terminal velocity.',
		'/images/nitro.jpg',
		'Nitro project thumbnail',
		'https://github.com/aerovato/nitro',
		500,
		60
	),
	new ProjectItem(
		'Container',
		'Ultra-lightweight sandbox for AI coding harnesses. Unleash OpenCode, Claude Code, and Codex inside isolated containers.',
		'/images/container.jpg',
		'Container project thumbnail',
		'https://github.com/aerovato/container',
		500,
		60
	),
	new ProjectItem(
		'Keyscan',
		'Local LLM-powered GitHub Gists scanner. Scanned 2,500+ gists and found 40+ API keys. Responsibly alerted owners.',
		'/images/keyscan.jpg',
		'Keyscan project thumbnail',
		'https://github.com/aerovato/keyscan',
		500,
		60
	)
];

export const contacts = [
	new ContactLink('Email', 'mailto:hello@liao.gg'),
	new ContactLink('GitHub (Personal)', 'https://github.com/kevinMEH'),
	new ContactLink('GitHub (Aerovato)', 'https://github.com/aerovato'),
	new ContactLink('Twitter (Aerovato)', 'https://twitter.com/AerovatoAI')
];

export const personSchema = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Kevin Liao',
	url: siteUrl,
	email: 'mailto:hello@liao.gg',
	jobTitle: 'Software Engineer',
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'New York City',
		addressRegion: 'NY',
		addressCountry: 'US'
	},
	sameAs: ['https://github.com/kevinMEH', 'https://github.com/aerovato', 'https://twitter.com/AerovatoAI']
};
