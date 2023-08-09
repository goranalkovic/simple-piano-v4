import { setContext } from 'svelte';
import { writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';

export const pianoKeyCodes = [20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 220, 13, 81, 87, 69, 84, 90, 73, 79, 80, 221, 8, 46, 35, 34, 103, 104, 105, 107, 45, 36, 33, 111, 106];


export const keyLabels = {
	20: '⇪',
	65: 'A',
	83: 'S',
	68: 'D',
	70: 'F',
	71: 'G',
	72: 'H',
	74: 'J',
	75: 'K',
	76: 'L',
	186: 'Č',
	222: 'Ć',
	220: 'Ž',
	13: '↵',
	81: 'Q',
	87: 'W',
	69: 'E',
	84: 'T',
	90: 'Z',
	73: 'I',
	79: 'O',
	80: 'P',
	221: 'Đ',
	8: '⌫',
	46: 'Del',
	35: 'End',
	34: 'P↓',
	103: '<small>NUM</small><br/>7',
	104: '<small>NUM</small><br/>8',
	105: '<small>NUM</small><br/>9',
	107: '<small>NUM</small><br/>+',
	45: 'INS',
	36: '<small>HOME</small>',
	33: 'P↑',
	111: '<small>NUM</small><br/>/',
	106: '<small>NUM</small><br/>*'
};

export const keyNotes = {
	65: 55,
	83: 57,
	68: 59,
	70: 60,
	71: 62,
	72: 64,
	74: 65,
	75: 67,
	76: 69,
	186: 71,
	222: 72,
	220: 74,
	13: 76,
	81: 54,
	87: 56,
	69: 58,
	84: 61,
	90: 63,
	73: 66,
	79: 68,
	80: 70,
	221: 73,
	8: 75,
	20: 53,
	46: 77,
	35: 79,
	34: 81,
	103: 83,
	104: 84,
	105: 86,
	107: 88,
	45: 78,
	36: 80,
	33: 82,
	111: 85,
	106: 87,
};

const volume = persisted('volume', 50);
const octaveShift = persisted('octaveShift', 0);
const instruments = persisted('instruments', [
	{
		type: 'SplendidGrandPiano',
		id: 1,
	},
]);

const isLoading = writable(false);

const keyStatus = writable(pianoKeyCodes.reduce((carry, keyCode) => (
	{
		...carry,
		[keyCode]: {
			pressed: false,
			ctrl: false,
			alt: false,
			shift: false,
		},
	}
), {}));

export const initStores = () => {
	setContext('volume', volume);
	setContext('octaveShift', octaveShift);
	setContext('pressedKeys', keyStatus);
	setContext('instruments', instruments);
	setContext('isLoading', isLoading);
};