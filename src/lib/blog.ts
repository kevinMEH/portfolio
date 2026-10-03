export interface PostMetadata {
	title: string;
	date: string;
	description: string;
}

export interface Post extends PostMetadata {
	slug: string;
}

export const formatPostDate = (date: string): string => {
	const [year, month, day] = date.split('-').map(Number);
	const suffix = day % 100 >= 11 && day % 100 <= 13 ? 'th' : (['th', 'st', 'nd', 'rd'][day % 10] ?? 'th');
	const monthName = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(
		new Date(Date.UTC(year, month - 1, day))
	);

	return `${monthName} ${day}${suffix}, ${year}`;
};

const metadata = import.meta.glob<PostMetadata>('/src/posts/*.svx', { eager: true, import: 'metadata' });

export const posts: Post[] = Object.entries(metadata)
	.map(([path, frontmatter]) => ({ ...frontmatter, slug: path.split('/').pop()!.replace(/\.svx$/, '') }))
	.sort((first, second) => second.date.localeCompare(first.date));
