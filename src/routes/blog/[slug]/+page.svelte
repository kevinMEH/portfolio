<script lang="ts">
	import { formatPostDate } from '$lib/blog';
	import { siteUrl } from '$lib/site';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.metadata.title} | Kevin Liao</title>
	<meta name="description" content={data.metadata.description} />
	<link rel="canonical" href={`${siteUrl}blog/${data.slug}`} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.metadata.title} />
	<meta property="og:description" content={data.metadata.description} />
</svelte:head>

<main class="mx-auto min-h-screen w-[calc(100%-2.5rem)] max-w-200 py-12 sm:py-20">
	<a href="/blog" class="font-mono text-xs text-fg-tertiary hover:text-fg sm:text-sm">← Writing</a>
	<article class="mt-10">
		<time datetime={data.metadata.date} class="font-mono text-xs text-fg-tertiary sm:text-sm">{formatPostDate(data.metadata.date)}</time>
		<div class="blog-content mt-4 text-base leading-relaxed text-fg-secondary sm:text-lg">
			<data.content />
		</div>
	</article>
</main>
