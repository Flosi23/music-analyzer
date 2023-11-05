export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 */
export function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.ceil(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Reorders the elements in the array into a random sequence.
 */
export function shuffle<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
