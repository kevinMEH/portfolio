
<script module lang="ts">
	type RepoSearchResponse = {
		items: Array<{
			full_name: string;
			stargazers_count: number;
		}>;
	};

	const starCountsPromise = fetch(
		`https://api.github.com/search/repositories?q=${encodeURIComponent('repo:aerovato/operator-memory repo:aerovato/magic-compact repo:aerovato/container repo:aerovato/keyscan')}&per_page=4`
	)
		.then((response) => response.json() as Promise<RepoSearchResponse>)
		.then((data) => new Map(data.items.map((repo) => [repo.full_name, repo.stargazers_count])))
		.catch(() => new Map<string, number>());

	const loadStarCount = async (repo: string): Promise<number | null> => {
		const starCounts = await starCountsPromise;
		return starCounts.get(repo) ?? null;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { RevealApi } from '$lib/reveal';
	import { wait } from '$lib/reveal';
	import ProgressiveText from './ProgressiveText.svelte';

	interface Props {
		name: string;
		description: string;
		image: string;
		alt: string;
		href: string;
		githubRepo: string | null;
		revealDelayMs: number;
		textDelayMs: number;
	}

	let { name, description, image, alt, href, githubRepo, revealDelayMs, textDelayMs }: Props = $props();
	let host: HTMLDivElement;
	let card: HTMLAnchorElement;
	let imageElement: HTMLImageElement;
	let title: HTMLHeadingElement;
	let descriptionElement: HTMLParagraphElement;
	let text: RevealApi;
	let revealPromise: Promise<void> | null = null;
	let starCount: number | null = $state(null);

	const formatStarCount = (count: number): string => {
		if (count < 1000) {
			return `${count}`;
		}

		return `${Math.round(count / 1000)}k`;
	};

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

	onMount(() => {
		if (githubRepo === null) {
			return;
		}

		void loadStarCount(githubRepo).then((count) => {
			starCount = count;
		});
	});
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
		<div class="min-w-0 flex-1 pt-0.5">
			<div bind:this={title} class="flex items-center justify-between gap-3" data-project-title>
				<h3 class="min-w-0 text-sm leading-none font-medium font-serif">{name}</h3>
				{#if githubRepo !== null}
					<div
						class="text-fg-tertiary mr-2 font-mono flex w-[5ch] shrink-0 items-center gap-1 text-xs leading-none tabular-nums"
						data-project-stars
						data-visible={starCount !== null ? 'true' : undefined}
						aria-label={starCount !== null ? `${starCount} GitHub stars` : undefined}
					>
						<svg viewBox="0 0 16 16" aria-hidden="true" class="h-3.5 w-3.5 shrink-0 fill-current">
							<path d="M8 1.2l2.01 4.07 4.49.65-3.25 3.17.77 4.47L8 11.45 3.98 13.56l.77-4.47L1.5 5.92l4.49-.65L8 1.2z" />
						</svg>
						<span class="w-[4ch] text-left">{starCount === null ? '' : formatStarCount(starCount)}</span>
					</div>
				{/if}
			</div>
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

	:global([data-progressive-project] [data-project-stars]) {
		opacity: 0;
		transition: opacity 180ms ease;
	}

	:global([data-progressive-project] [data-project-stars][data-visible='true']) {
		opacity: 1;
	}
</style>
