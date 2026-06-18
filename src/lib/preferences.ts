export type ThemePreference = 'light' | 'dark' | 'system';
export type AnimationPreference = 'on' | 'off';

export const themePreferenceKey = 'theme-preference';
export const animationPreferenceKey = 'animation-preference';
export const darkThemeColor = '#17140f';
export const lightThemeColor = '#faf6ed';

export const isThemePreference = (value: string | null): value is ThemePreference => {
	return value === 'light' || value === 'dark' || value === 'system';
};

export const isAnimationPreference = (value: string | null): value is AnimationPreference => {
	return value === 'on' || value === 'off';
};
