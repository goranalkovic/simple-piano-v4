<script>
	export const prerender = false;

	import { getContext, onMount } from 'svelte';

	import { pianoKeyCodes, keyNotes } from './stores';

	const pressedKeys = getContext('pressedKeys');
	const volume = getContext('volume');
	const octaveShift = getContext('octaveShift');
	const instrumentData = getContext('instruments');
	const isLoading = getContext('isLoading');

	import { SplendidGrandPiano, Soundfont, ElectricPiano, Mallet, CacheStorage } from 'smplr';

	import { toast } from 'svelte-sonner';

	let instruments = [];

	const storage = new CacheStorage();
	const context = new AudioContext();

	onMount(async () => {
		$isLoading = true;

		for (const { type, options: rawOptions = {} } of $instrumentData) {
			const options = { storage, ...rawOptions };

			if (type === 'SplendidGrandPiano') {
				const instrument = await new SplendidGrandPiano(context, options).loaded();
				instrument.output.setVolume($volume * 1.27);
				instruments = [...instruments, instrument];
			} else if (type === 'Soundfont') {
				const instrument = await new Soundfont(context, options).loaded();
				instrument.output.setVolume($volume * 1.27);
				instruments = [...instruments, instrument];
			} else if (type === 'ElectricPiano') {
				const instrument = await new ElectricPiano(context, options).loaded();
				instrument.output.setVolume($volume * 1.27);
				instruments = [...instruments, instrument];
			} else if (type === 'Mallet') {
				const instrument = await new Mallet(context, options).loaded();
				instrument.output.setVolume($volume * 1.27);
				instruments = [...instruments, instrument];
			}
		}

		$isLoading = false;
	});

	let stopNotes = {};

	const ignoredKeys = ['Meta'];

	const getAdjustedNote = (noteCode, shiftUp = false, shiftDown = false, extraShift = 0) => {
		return parseInt(noteCode, 10) + 12 * (extraShift + (shiftUp ? 1 : 0) - (shiftDown ? 1 : 0));
	};

	const onKeyDown = (event) => {
		const { key, keyCode, ctrlKey, altKey, shiftKey } = event;

		if (ignoredKeys.includes(key)) {
			return;
		}

		if (pianoKeyCodes.includes(keyCode)) {
			if ($pressedKeys[keyCode]?.pressed === true) {
				return;
			}

			instruments.forEach((instr, i) => {
				if (!Array.isArray(stopNotes[keyCode])) {
					stopNotes[keyCode] = [];
				}

				stopNotes[keyCode][i] = instr.start({
					note: getAdjustedNote(keyNotes[keyCode], shiftKey, altKey, $octaveShift)
				});
			});

			$pressedKeys[keyCode] = {
				pressed: true,
				ctrl: ctrlKey,
				alt: altKey,
				shift: shiftKey
			};
			return;
		}

		if (key === 'ArrowUp') {
			if (altKey) {
				$octaveShift = Math.min($octaveShift + 0.5, 3);
			} else {
				$octaveShift = Math.min($octaveShift + 1, 3);
			}

			toast('Octave shift +');
			return;
		}

		if (key === 'ArrowDown') {
			if (altKey) {
				$octaveShift = Math.max($octaveShift - 0.5, -3);
			} else {
				$octaveShift = Math.max($octaveShift - 1, -3);
			}

			toast('Octave shift -');
			return;
		}

		if (key === 'ArrowRight') {
			if (shiftKey) {
				$volume = Math.min($volume + 10, 100);
			} else if (altKey) {
				$volume = Math.min($volume + 5, 100);
			} else if (ctrlKey) {
				$volume = Math.min($volume + 2, 100);
			} else {
				$volume = Math.min($volume + 1, 100);
			}

			instruments.forEach((instr) => instr?.output?.setVolume($volume * 1.27));
			toast('Volume +');
			return;
		}

		if (key === 'ArrowLeft') {
			if (shiftKey) {
				$volume = Math.max($volume - 10, 0);
			} else if (altKey) {
				$volume = Math.max($volume - 5, 0);
			} else if (ctrlKey) {
				$volume = Math.max($volume - 2, 0);
			} else {
				$volume = Math.max($volume - 1, 0);
			}

			instruments.forEach((instr) => instr?.output?.setVolume($volume * 1.27));
			toast('Volume -');
			return;
		}
	};

	const onKeyUp = (event) => {
		const { keyCode, key } = event;

		if (ignoredKeys.includes(key)) {
			return;
		}

		if (!pianoKeyCodes.includes(keyCode)) {
			return;
		}

		if ($pressedKeys[keyCode]?.pressed === false) {
			return;
		}

		stopNotes[keyCode]?.forEach((stopFunc) => stopFunc?.());

		$pressedKeys[keyCode] = {
			pressed: false,
			ctrl: false,
			alt: false,
			shift: false
		};
	};
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />
