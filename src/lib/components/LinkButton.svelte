<script lang="ts">
	import { wait } from '$lib/reveal';

	interface Props {
		href: string;
		label: string;
		variant: 'inline' | 'button';
		revealDelayMs: number;
	}

	let { href, label, variant, revealDelayMs }: Props = $props();
	let host: HTMLSpanElement;
	let revealPromise: Promise<void> | null = null;

	const isExternalLink = $derived(href.startsWith('https://') || href.startsWith('http://'));
	const style = $derived(variant === 'button' ? 'px-2 py-1' : 'mx-0.5 px-1.25 py-0.5');

	export const reveal = (): Promise<void> => {
		if (revealPromise !== null) {
			return revealPromise;
		}

		revealPromise = runReveal();
		return revealPromise;
	};

	const runReveal = async (): Promise<void> => {
		host.dataset.revealed = 'true';

		if (Number.isFinite(revealDelayMs) && revealDelayMs > 0) {
			await wait(revealDelayMs);
		}
	};
</script>

<span bind:this={host} data-progressive-link data-reveal-delay-ms={revealDelayMs}>
	<a
		href={href}
		target={isExternalLink ? '_blank' : undefined}
		rel={isExternalLink ? 'noopener noreferrer' : undefined}
		class={`bg-bg-secondary hover:bg-bg-hover text-fg-secondary hover:text-fg focus-visible:outline-fg-tertiary rounded-md ${style} font-serif text-sm leading-none italic transition-colors focus-visible:outline-2 focus-visible:outline-offset-2`}
	>
		{label}
	</a>
</span>

<style>
	:global([data-progressive-link]) {
		display: inline-block;
	}

	:global(html[data-reveal-enabled='true'] [data-progressive-link]) {
		opacity: 0;
		transition: opacity 180ms ease;
	}

	:global(html[data-reveal-enabled='true'] [data-progressive-link][data-revealed='true']) {
		opacity: 1;
	}
</style>
