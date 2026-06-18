<script lang="ts">
	import { wait } from '$lib/reveal';

	interface Props {
		minDelayMs: number;
		maxDelayMs: number;
	}

	let { minDelayMs, maxDelayMs }: Props = $props();
	let host: HTMLSpanElement;
	let text: HTMLSpanElement;
	let revealPromise: Promise<void> | null = null;

	export const reveal = (): Promise<void> => {
		if (revealPromise !== null) {
			return revealPromise;
		}

		revealPromise = runReveal();
		return revealPromise;
	};

	const runReveal = async (): Promise<void> => {
		const delayMs = Math.round(Math.random() * (Math.max(maxDelayMs, minDelayMs) - minDelayMs) + minDelayMs);

		text.textContent = 'Thinking...';
		host.dataset.revealed = 'true';

		await wait(delayMs);

		text.textContent = `Thought for ${(delayMs / 1000).toFixed(1)}s`;

		await wait(300);
	};
</script>

<div>
	<span
		bind:this={host}
		class="text-fg-tertiary hover:bg-bg-hover hover:text-fg-secondary cursor-pointer -mx-1.5 inline-block rounded-md px-1.5 py-0.75 font-mono text-sm leading-tight transition-all duration-180 ease-in-out"
		data-thinking-status
		data-min-delay-ms={minDelayMs}
		data-max-delay-ms={maxDelayMs}
	>
		<span bind:this={text} data-thinking-text>Thought for 0.4s</span>
	</span>
</div>

<style>
	:global(html[data-reveal-enabled='true'] [data-thinking-status]) {
		opacity: 0;
	}

	:global(html[data-reveal-enabled='true'] [data-thinking-status][data-revealed='true']) {
		opacity: 1;
	}
</style>
