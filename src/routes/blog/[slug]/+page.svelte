<script lang="ts">
  import { formatPostDate } from "$lib/blog";
  import { siteUrl } from "$lib/site";
  import type { PageData } from "./$types";

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

<main
  class="mx-auto min-h-screen w-[calc(100%-2.5rem)] max-w-200 py-12 sm:py-20"
>
  <a
    href="/blog"
    class="text-fg-tertiary hover:text-fg font-mono text-xs sm:text-sm"
    >← Writing</a
  >
  <article class="mt-10">
    <div
      class="text-fg-tertiary flex flex-col gap-1 font-mono text-xs sm:text-sm"
    >
      <time datetime={data.metadata.date}
        >{formatPostDate(data.metadata.date)}</time
      >
      {#if data.metadata.updated}
        <span
          >Updated <time datetime={data.metadata.updated}
            >{formatPostDate(data.metadata.updated)}</time
          ></span
        >
      {/if}
    </div>
    <div
      class="blog-content text-fg-secondary mt-4 text-base leading-relaxed sm:text-lg"
    >
      <data.content />
    </div>
  </article>
</main>
