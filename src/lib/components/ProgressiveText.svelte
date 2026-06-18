<script lang="ts">
	import { wait } from '$lib/reveal';

	interface Props {
		text: string;
		delayMs: number;
	}

	let { text, delayMs }: Props = $props();
	let host: HTMLSpanElement;
	let visible: HTMLSpanElement;
	let hidden: HTMLSpanElement;
	let revealPromise: Promise<void> | null = null;

	export const reveal = (): Promise<void> => {
		if (revealPromise !== null) {
			return revealPromise;
		}

		revealPromise = runReveal();
		return revealPromise;
	};

	const runReveal = async (): Promise<void> => {
		const words = hidden.textContent?.trim().split(/\s+/) ?? [];
		let revealedWordCount = 0;

		if (words.length === 0 || !Number.isFinite(delayMs)) {
			host.dataset.revealed = 'true';
			return;
		}

		while (revealedWordCount < words.length) {
			const batchSize = Math.floor(Math.random() * 3) + 5;
			revealedWordCount = Math.min(revealedWordCount + batchSize, words.length);
			const revealedWords = words.slice(0, revealedWordCount);
			const hiddenWords = words.slice(revealedWordCount);

			visible.textContent = `${revealedWords.join(' ')}${hiddenWords.length > 0 ? ' ' : ''}`;
			hidden.textContent = hiddenWords.join(' ');

			if (hiddenWords.length > 0) {
				await wait(delayMs);
			}
		}

		host.dataset.revealed = 'true';
	};
</script>

<span bind:this={host} data-progressive-text data-delay-ms={delayMs}>
	<span bind:this={visible} data-progressive-text-visible></span><span bind:this={hidden} data-progressive-text-hidden>{text}</span>
</span>

<style>
	:global(html[data-reveal-enabled='true'] [data-progressive-text] [data-progressive-text-hidden]) {
		visibility: hidden;
	}
</style>
