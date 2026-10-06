import { posts } from "$lib/blog";
import { siteUrl } from "$lib/site";
import type { RequestHandler } from "./$types";

export const prerender = true;

const escapeXml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: RequestHandler = () => {
  const items = posts.map(post => {
    const url = escapeXml(new URL(`/blog/${post.slug}`, siteUrl).href);

    return `<item>
			<title>${escapeXml(post.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
			<description>${escapeXml(post.description)}</description>
		</item>`;
  });
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Writings by Kevin Liao</title>
		<link>${escapeXml(new URL("/blog", siteUrl).href)}</link>
		<description>From chain of thought to written word.</description>
		<language>en</language>
		<atom:link href="${escapeXml(new URL("/blog/rss.xml", siteUrl).href)}" rel="self" type="application/rss+xml" />
		${items.join("\n")}
	</channel>
</rss>`;

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
