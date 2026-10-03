import { posts } from '$lib/blog';

export const prerender = true;

export const load = () => ({ posts });
