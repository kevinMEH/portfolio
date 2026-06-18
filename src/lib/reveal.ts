export interface RevealApi {
	reveal: () => Promise<void>;
}

export const wait = (delayMs: number): Promise<void> => {
	return new Promise((resolve) => {
		window.setTimeout(resolve, delayMs);
	});
};
