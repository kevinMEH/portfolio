<script lang="ts">
	import type { RevealApi } from '$lib/reveal';
	import { wait } from '$lib/reveal';
	import ProgressiveText from './ProgressiveText.svelte';

	interface Props {
		name: string;
		description: string;
		image: string;
		alt: string;
		href: string;
		revealDelayMs: number;
		textDelayMs: number;
	}

	let { name, description, image, alt, href, revealDelayMs, textDelayMs }: Props = $props();
	let host: HTMLDivElement;
	let card: HTMLAnchorElement;
	let imageElement: HTMLImageElement;
	let title: HTMLHeadingElement;
	let descriptionElement: HTMLParagraphElement;
	let text: RevealApi;
	let revealPromise: Promise<void> | null = null;

	export const reveal = (): Promise<void> => {
		if (revealPromise !== null) {
			return revealPromise;
		}

		revealPromise = runReveal();
		return revealPromise;
	};

	const runReveal = async (): Promise<void> => {
		const phaseDelayMs = Number.isFinite(revealDelayMs) ? Math.max(Math.round(revealDelayMs / 3), 0) : 0;

		card.dataset.revealed = 'true';
		await wait(phaseDelayMs);

		imageElement.dataset.revealed = 'true';
		await wait(phaseDelayMs);

		title.dataset.revealed = 'true';
		await wait(phaseDelayMs);

		descriptionElement.dataset.revealed = 'true';
		await text.reveal();

		host.dataset.revealed = 'true';
	};
</script>

<div bind:this={host} data-progressive-project data-reveal-delay-ms={revealDelayMs}>
	<a
		bind:this={card}
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		class="hover:bg-bg-hover -mx-3 flex cursor-pointer gap-3 rounded-[1.15rem] px-3 py-2.5 transition-colors"
		data-project-card
	>
		<img
			bind:this={imageElement}
			src={image}
			alt={alt}
			width="256"
			height="256"
			class="size-9 shrink-0 rounded-xl object-cover"
			loading="lazy"
			data-project-image
		/>
		<div class="pt-0.5">
			<h3 bind:this={title} class="text-sm leading-none font-medium font-serif" data-project-title>
				{name}
			</h3>
			<p bind:this={descriptionElement} class="text-fg-secondary mt-1 text-xs leading-tight" data-project-description>
				<ProgressiveText bind:this={text} text={description} delayMs={textDelayMs} />
			</p>
		</div>
	</a>
</div>

<style>
	:global([data-progressive-project]) {
		display: block;
	}

	:global(html[data-reveal-enabled='true'] [data-progressive-project] [data-project-card]),
	:global(html[data-reveal-enabled='true'] [data-progressive-project] [data-project-image]),
	:global(html[data-reveal-enabled='true'] [data-progressive-project] [data-project-description]) {
		opacity: 0;
		transition: opacity 180ms ease;
	}

	:global(html[data-reveal-enabled='true'] [data-progressive-project] [data-project-card]) {
		transition:
			opacity 180ms ease,
			background-color 150ms ease;
	}

	:global(html[data-reveal-enabled='true'] [data-progressive-project] [data-revealed='true']) {
		opacity: 1;
	}

	:global(html[data-reveal-enabled='true'] [data-progressive-project] [data-project-title]) {
		opacity: 0;
	}

	:global(html[data-reveal-enabled='true'] [data-progressive-project] [data-project-title][data-revealed='true']) {
		opacity: 1;
	}
</style>
