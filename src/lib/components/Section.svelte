<script lang="ts">
	import type { RevealApi } from '$lib/reveal';
	import type { Snippet } from 'svelte';
	import { wait } from '$lib/reveal';

	interface Props {
		id: string;
		command: string;
		target: string;
		contentDelayMs: number;
		revealChildren: Array<RevealApi | undefined>;
		children: Snippet;
	}

	let { id, command, target, contentDelayMs, revealChildren, children }: Props = $props();
	let host: HTMLDivElement;
	let heading: HTMLHeadingElement;
	let content: HTMLDivElement;
	let revealPromise: Promise<void> | null = null;

	export const reveal = (): Promise<void> => {
		if (revealPromise !== null) {
			return revealPromise;
		}

		revealPromise = runReveal();
		return revealPromise;
	};

	const runReveal = async (): Promise<void> => {
		heading.dataset.revealed = 'true';
		await wait(contentDelayMs);

		content.dataset.revealed = 'true';

		for (const child of revealChildren) {
			await child?.reveal();
		}

		host.dataset.revealed = 'true';
	};
</script>

<div bind:this={host} data-progressive-section data-content-delay-ms={contentDelayMs}>
	<section class="space-y-3" aria-labelledby={id}>
		<h2 bind:this={heading} {id} class="text-fg-tertiary font-mono text-sm leading-tight" data-section-heading>
			<span
				class="text-fg-tertiary hover:bg-bg-hover hover:text-fg-secondary cursor-pointer -mx-1.5 inline-block rounded-md px-1.5 py-0.75 transition-all duration-180 ease-in-out"
			>
				% {command} <span class="text-fg">{target}</span>
			</span>
		</h2>
		<div bind:this={content} data-section-content>
			{@render children()}
		</div>
	</section>
</div>

<style>
	:global([data-progressive-section]) {
		display: block;
	}

	:global(html[data-reveal-enabled='true'] [data-progressive-section] [data-section-heading]),
	:global(html[data-reveal-enabled='true'] [data-progressive-section] [data-section-content]) {
		opacity: 0;
		transition: opacity 180ms ease;
	}

	:global(html[data-reveal-enabled='true'] [data-progressive-section] [data-revealed='true']) {
		opacity: 1;
	}
</style>
