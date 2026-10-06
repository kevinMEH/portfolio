<script lang="ts">
  import { formatPostDate } from "$lib/blog";
  import { siteUrl } from "$lib/site";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Writings by Kevin Liao</title>
  <meta name="description" content="From chain of thought to written word." />
  <link rel="canonical" href={`${siteUrl}blog`} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="Writings by Kevin Liao"
    href={`${siteUrl}blog/rss.xml`}
  />
</svelte:head>

<main
  class="mx-auto min-h-screen w-[calc(100%-2.5rem)] max-w-200 py-12 sm:py-20"
>
  <a
    href="/"
    class="text-fg-tertiary hover:text-fg font-mono text-xs sm:text-sm"
    >← Home</a
  >
  <div class="mt-10 flex items-baseline justify-between gap-4">
    <h1 class="font-serif text-3xl sm:text-4xl">Writings</h1>
    <a
      href="/blog/rss.xml"
      class="text-fg-tertiary hover:text-fg font-mono text-xs sm:text-sm"
      >RSS feed</a
    >
  </div>
  <div class="mt-10 space-y-8 sm:space-y-10">
    {#each data.posts as post (post.slug)}
      <article>
        <time
          datetime={post.date}
          class="text-fg-tertiary font-mono text-xs sm:text-sm"
          >{formatPostDate(post.date)}</time
        >
        <h2 class="mt-2 font-serif text-xl sm:text-2xl">
          <a class="hover:underline" href={`/blog/${post.slug}`}>{post.title}</a
          >
        </h2>
        <p class="text-fg-secondary mt-2 text-base leading-relaxed sm:text-lg">
          {post.description}
        </p>
      </article>
    {/each}
  </div>
</main>
