import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PostMetadata } from '$lib/blog';
import { posts } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

const modules = import.meta.glob<{ default: Component; metadata: PostMetadata }>('/src/posts/*.svx');

export const prerender = true;

export const entries: EntryGenerator = () => posts.map(({ slug }) => ({ slug }));

export const load: PageLoad = async ({ params }) => {
	const getPost = modules[`/src/posts/${params.slug}.svx`];

	if (!getPost) {
		error(404, 'Post not found');
	}

	const { default: content, metadata } = await getPost();
	return { content, metadata, slug: params.slug };
};
