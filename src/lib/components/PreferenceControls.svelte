<script lang="ts">
	import type { AnimationPreference, ThemePreference } from '$lib/preferences';

	interface Props {
		themePreference: ThemePreference;
		animationPreference: AnimationPreference;
		onThemeChange: (preference: ThemePreference) => void;
		onAnimationChange: (preference: AnimationPreference) => void;
	}

	let { themePreference, animationPreference, onThemeChange, onAnimationChange }: Props = $props();
	const className =
		'cursor-pointer rounded-md px-1.5 py-1 text-xs text-fg-secondary transition-colors hover:bg-bg-hover hover:text-fg aria-pressed:bg-bg-secondary aria-pressed:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg-tertiary';
</script>

<div class="text-fg-tertiary flex flex-col items-end gap-1 pt-4 font-mono text-xs sm:pt-8" data-preference-controls>
	<div class="flex items-center gap-1">
		<span>Theme</span>
		<button class={className} type="button" data-theme-option="light" data-preference-button aria-pressed={themePreference === 'light'} onclick={() => onThemeChange('light')}>light</button>
		<button class={className} type="button" data-theme-option="dark" data-preference-button aria-pressed={themePreference === 'dark'} onclick={() => onThemeChange('dark')}>dark</button>
		<button class={className} type="button" data-theme-option="system" data-preference-button aria-pressed={themePreference === 'system'} onclick={() => onThemeChange('system')}>system</button>
	</div>
	<div class="flex items-center gap-1">
		<span>Animation</span>
		<button class={className} type="button" data-animation-option="on" data-preference-button aria-pressed={animationPreference === 'on'} onclick={() => onAnimationChange('on')}>on</button>
		<button class={className} type="button" data-animation-option="off" data-preference-button aria-pressed={animationPreference === 'off'} onclick={() => onAnimationChange('off')}>off</button>
	</div>
</div>
