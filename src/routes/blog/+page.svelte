<script lang="ts">
	import { formatPostDate } from '$lib/blog';
	import { siteUrl } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | Kevin Liao</title>
	<meta name="description" content="Writing by Kevin Liao." />
	<link rel="canonical" href={`${siteUrl}blog`} />
</svelte:head>

<main class="mx-auto min-h-screen w-[calc(100%-2.5rem)] max-w-200 py-12 sm:py-20">
	<a href="/" class="font-mono text-xs text-fg-tertiary hover:text-fg sm:text-sm">← Home</a>
	<h1 class="mt-10 font-serif text-3xl sm:text-4xl">Writing</h1>
	<div class="mt-10 space-y-8 sm:space-y-10">
		{#each data.posts as post (post.slug)}
			<article>
				<time datetime={post.date} class="font-mono text-xs text-fg-tertiary sm:text-sm">{formatPostDate(post.date)}</time>
				<h2 class="mt-2 font-serif text-xl sm:text-2xl"><a class="hover:underline" href={`/blog/${post.slug}`}>{post.title}</a></h2>
				<p class="mt-2 text-base leading-relaxed text-fg-secondary sm:text-lg">{post.description}</p>
			</article>
		{/each}
	</div>
</main>
