// place files you want to import through the `$lib` alias in this folder.
export { initStores, pianoKeyCodes } from './stores';

/**
 * Replaces underscores with spaces, makes first letter uppercase.
 *
 * @param {String} name Name to normalize.
 * @returns {String} Normalized name.
 */
export const normalizeName = (name) => {
	const output = name.replace(/_/g, ' ');

	return output.charAt(0).toUpperCase() + output.slice(1);
};

export function arrayMove(array, from, to) {
	const newArray = array.slice();
	newArray.splice(
		to < 0 ? newArray.length + to : to,
		0,
		newArray.splice(from, 1)[0]
	);

	return newArray;
}

/**
 * Returns a random ID.
 *
 * @returns {String} Random ID.
 */
export const getRandomId = () => Math.random()
	.toString(36)
	.replace(/[^a-z]+/g, '')
	.substring(2, 10);
