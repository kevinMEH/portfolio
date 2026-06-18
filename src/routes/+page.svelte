<script lang="ts">
	import { onMount } from 'svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import PreferenceControls from '$lib/components/PreferenceControls.svelte';
	import ProgressiveText from '$lib/components/ProgressiveText.svelte';
	import Project from '$lib/components/Project.svelte';
	import Section from '$lib/components/Section.svelte';
	import ThinkingText from '$lib/components/ThinkingText.svelte';
	import type { AnimationPreference, ThemePreference } from '$lib/preferences';
	import {
		animationPreferenceKey,
		darkThemeColor,
		isAnimationPreference,
		isThemePreference,
		lightThemeColor,
		themePreferenceKey
	} from '$lib/preferences';
	import type { RevealApi } from '$lib/reveal';
	import { wait } from '$lib/reveal';
	import {
		contacts,
		pageDescription,
		pageTitle,
		personSchema,
		projects,
		siteUrl,
		socialImage,
		socialImageAlt
	} from '$lib/site';

	let themePreference = $state<ThemePreference>('system');
	let animationPreference = $state<AnimationPreference>('on');
	let thinking: RevealApi | undefined = $state();
	let title: HTMLHeadingElement;
	let aboutSection: RevealApi | undefined = $state();
	let projectsSection: RevealApi | undefined = $state();
	let contactSection: RevealApi | undefined = $state();
	let aboutText1: RevealApi | undefined = $state();
	let aboutText2: RevealApi | undefined = $state();
	let aboutLink1: RevealApi | undefined = $state();
	let aboutText3: RevealApi | undefined = $state();
	let aboutText4: RevealApi | undefined = $state();
	let aboutLink2: RevealApi | undefined = $state();
	let aboutText5: RevealApi | undefined = $state();
	let contactText: RevealApi | undefined = $state();
	let projectRefs = $state<Array<RevealApi | undefined>>([]);
	let contactRefs = $state<Array<RevealApi | undefined>>([]);
	let systemColorScheme: MediaQueryList;
	const personSchemaScript = `<script type="application/ld+json">${JSON.stringify(personSchema)}<\/script>`;

	const getThemePreference = (): ThemePreference => {
		const preference = window.localStorage.getItem(themePreferenceKey);
		return isThemePreference(preference) ? preference : 'system';
	};

	const getAnimationPreference = (): AnimationPreference => {
		const animationUrlPreference = new URLSearchParams(window.location.search).get('animate');

		if (animationUrlPreference === 'false') {
			return 'off';
		}

		const preference = window.localStorage.getItem(animationPreferenceKey);
		return isAnimationPreference(preference) ? preference : 'on';
	};

	const applyThemePreference = (preference: ThemePreference): void => {
		const colorScheme = preference === 'system' ? (systemColorScheme.matches ? 'dark' : 'light') : preference;
		const themeColor = colorScheme === 'dark' ? darkThemeColor : lightThemeColor;
		const themeColorMeta = document.querySelector<HTMLMetaElement>('[data-theme-color]');

		themePreference = preference;
		document.documentElement.dataset.themePreference = preference;
		document.documentElement.dataset.colorScheme = colorScheme;
		themeColorMeta?.setAttribute('content', themeColor);
	};

	const applyAnimationPreference = (preference: AnimationPreference): void => {
		animationPreference = preference;

		if (preference === 'off') {
			delete document.documentElement.dataset.revealEnabled;
		}
	};

	const handleThemeChange = (preference: ThemePreference): void => {
		window.localStorage.setItem(themePreferenceKey, preference);
		applyThemePreference(preference);
	};

	const handleAnimationChange = (preference: AnimationPreference): void => {
		window.localStorage.setItem(animationPreferenceKey, preference);
		applyAnimationPreference(preference);
	};

	const runReveal = async (): Promise<void> => {
		if (document.documentElement.dataset.revealEnabled !== 'true') {
			return;
		}

		await wait(200);
		await thinking?.reveal();

		title.dataset.revealed = 'true';
		await wait(180);

		await aboutSection?.reveal();
		await projectsSection?.reveal();
		await contactSection?.reveal();
	};

	onMount(() => {
		systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
		applyThemePreference(getThemePreference());
		applyAnimationPreference(getAnimationPreference());

		systemColorScheme.addEventListener('change', () => {
			const preference = getThemePreference();

			if (preference === 'system') {
				applyThemePreference(preference);
			}
		});

		void runReveal();
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
	<link rel="canonical" href={siteUrl} />
	<link rel="preload" href="/fonts/Rubik-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin="anonymous" />
	<link rel="preload" href="/fonts/Rubik-Italic-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin="anonymous" />
	<link rel="preload" href="/fonts/Sentient-Variable.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="author" content="Kevin Liao" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#FAF6ED" data-theme-color />
	<meta property="og:type" content="profile" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:site_name" content="Kevin Liao" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={socialImage} />
	<meta property="og:image:width" content="256" />
	<meta property="og:image:height" content="256" />
	<meta property="og:image:alt" content={socialImageAlt} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={socialImage} />
	<meta name="twitter:image:alt" content={socialImageAlt} />
	<meta name="twitter:creator" content="@AerovatoAI" />
	{@html personSchemaScript}
</svelte:head>

<main class="text-fg mx-auto flex min-h-screen w-[calc(100%-2.5rem)] max-w-150 flex-col">
	<PreferenceControls
		{themePreference}
		{animationPreference}
		onThemeChange={handleThemeChange}
		onAnimationChange={handleAnimationChange}
	/>
	<div class="grid flex-1 content-center space-y-6 pt-0 pb-20 sm:pt-4 sm:pb-40">
		<ThinkingText bind:this={thinking} minDelayMs={300} maxDelayMs={800} />

		<h1 bind:this={title} class="font-serif text-lg leading-none font-medium" data-page-title>Kevin Liao</h1>

		<Section
			bind:this={aboutSection}
			id="about-heading"
			command="Read"
			target="About.md"
			contentDelayMs={600}
			revealChildren={[aboutText1, aboutText2, aboutLink1, aboutText3, aboutText4, aboutLink2, aboutText5]}
		>
			<div class="space-y-3 text-sm leading-normal">
				<p>
					<ProgressiveText
						bind:this={aboutText1}
						text="Software engineer from New York City, building at the intersection of AI and productivity. Current focus: reliable AI systems for knowledge work."
						delayMs={60}
					/>
				</p>
				<p>
					<ProgressiveText bind:this={aboutText2} text="Running" delayMs={60} />
					<LinkButton
						bind:this={aboutLink1}
						href="https://github.com/aerovato"
						label="Aerovato Research"
						variant="inline"
						revealDelayMs={60}
					/><ProgressiveText
						bind:this={aboutText3}
						text=", an independent lab working to democratize productivity through AI. I build products that help you do more with less."
						delayMs={60}
					/>
				</p>
				<p>
					<ProgressiveText
						bind:this={aboutText4}
						text="When I'm not building, I'm on the road, finding angles for the perfect photo. See my work below or reach me via"
						delayMs={60}
					/>
					<LinkButton bind:this={aboutLink2} href="mailto:hello@liao.gg" label="email" variant="inline" revealDelayMs={60} /><ProgressiveText
						bind:this={aboutText5}
						text="."
						delayMs={60}
					/>
				</p>
			</div>
		</Section>

		<Section
			bind:this={projectsSection}
			id="projects-heading"
			command="Write"
			target="Projects.tsx"
			contentDelayMs={600}
			revealChildren={projectRefs}
		>
			<div>
				{#each projects as project, index}
					<Project bind:this={projectRefs[index]} {...project} />
				{/each}
			</div>
		</Section>

		<Section
			bind:this={contactSection}
			id="contact-heading"
			command="Fetch"
			target="Contact"
			contentDelayMs={600}
			revealChildren={[contactText, ...contactRefs]}
		>
			<div class="space-y-3">
				<p class="text-sm leading-normal">
					<ProgressiveText
						bind:this={contactText}
						text="You can contact me reliably via email. You can also find more of my work on GitHub."
						delayMs={60}
					/>
				</p>

				<div class="flex flex-wrap gap-2">
					{#each contacts as contact, index}
						<LinkButton
							bind:this={contactRefs[index]}
							href={contact.href}
							label={contact.label}
							variant="button"
							revealDelayMs={60}
						/>
					{/each}
				</div>
			</div>
		</Section>
	</div>
</main>
