<script>
	import { getContext } from 'svelte';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
	const instrumentData = getContext('instruments');

	import {
		getSoundfontNames,
		getSoundfontKits,
		getElectricPianoNames,
		getMalletNames
	} from 'smplr';

	const soundfontInstrumentNames = getSoundfontNames();
	const soundfontNames = getSoundfontKits();
	const electricPianoInstrumentNames = getElectricPianoNames();
	const malletInstrumentNames = getMalletNames();

	import Trash from 'phosphor-svelte/lib/Trash';
	import PlusCircle from 'phosphor-svelte/lib/PlusCircle';
	import ArrowUp from 'phosphor-svelte/lib/ArrowUp';
	import ArrowDown from 'phosphor-svelte/lib/ ArrowDown';

	import { arrayMove, getRandomId, normalizeName } from '../../lib';

	// console.log({
	// 	soundfontNames,
	// 	soundfontInstrumentNames,
	// 	electricPianoInstrumentNames,
	// 	malletInstrumentNames
	// });

	let newInstrType;

	const addInstrument = () => {
		let newInstr = {
			type: newInstrType,
			id: getRandomId()
		};

		if (newInstrType === 'Soundfont') {
			newInstr.options = {
				kit: '',
				instrument: ''
			};
		} else {
			newInstr.options = {
				instrument: ''
			};
		}
		$instrumentData = [...$instrumentData, newInstr];
	};

	const removeInstrument = (i) => {
		$instrumentData = [...$instrumentData].filter((_, index) => index !== i);
	};

	const moveInstrument = (i, newIndex) => {
		$instrumentData = arrayMove([...$instrumentData], i, newIndex);
		// $instrumentData = [...$instrumentData].filter((_, index) => index !== i);
	};
</script>

<div class="m-10 space-y-10">
	<a href="/">Back</a>

	<h1 class="text-4xl font-semibold">Edit instruments</h1>

	{#each $instrumentData as instrument, i (instrument?.id ?? i)}
		<div
			class="flex flex-col gap-4 p-4 rounded-lg shadow bg-gray-200 dark:bg-gray-950 w-96"
			animate:flip={{ duration: 300 }}
			out:slide
		>
			<span class="text-xl font-medium">{instrument.type}</span>

			{#if instrument.type === 'Soundfont'}
				<select
					class="p-4 w-40 rounded-lg dark:bg-black"
					bind:value={$instrumentData[i].options.kit}
				>
					{#each soundfontNames as name}
						<option value={name}>{normalizeName(name)}</option>
					{/each}
				</select>

				<select
					class="p-4 w-40 rounded-lg dark:bg-black"
					bind:value={$instrumentData[i].options.instrument}
				>
					{#each soundfontInstrumentNames as name}
						<option value={name}>{normalizeName(name)}</option>
					{/each}
				</select>
			{:else if instrument.type === 'ElectricPiano'}
				<select
					class="p-4 w-40 rounded-lg dark:bg-black"
					bind:value={$instrumentData[i].options.instrument}
				>
					{#each electricPianoInstrumentNames as name}
						<option value={name}>{normalizeName(name)}</option>
					{/each}
				</select>
			{:else if instrument.type === 'Mallet'}
				<select
					class="p-4 w-40 rounded-lg dark:bg-black"
					bind:value={$instrumentData[i].options.instrument}
				>
					{#each malletInstrumentNames as name}
						<option value={name}>{normalizeName(name)}</option>
					{/each}
				</select>
			{/if}

			{#if i > 0}
				<button
					class="text-red-500 hover:text-current flex items-center gap-1 text-xs"
					on:dblclick={() => removeInstrument(i)}
				>
					<Trash size="24" color="currentColor" />
					(double click to remove)
				</button>
			{/if}

			<div class="flex items-center gap-4">
				<button
					class="hover:text-cyan-500 flex items-center gap-1 text-xs disabled:opacity-40 disabled:pointer-events-none"
					on:click={() => moveInstrument(i, i - 1)}
					disabled={i === 0}
				>
					<ArrowUp size="24" color="currentColor" />
				</button>

				<button
					class="hover:text-cyan-500 flex items-center gap-1 text-xs disabled:opacity-40 disabled:pointer-events-none"
					on:click={() => moveInstrument(i, i + 1)}
					disabled={i === $instrumentData.length - 1}
				>
					<ArrowDown size="24" color="currentColor" />
				</button>
			</div>
		</div>
	{/each}

	<div class="flex items-center gap-4">
		<select bind:value={newInstrType} class="p-4 w-40 rounded-lg dark:bg-black">
			<option selected value="SplendidGrandPiano">Grand piano</option>
			<option value="Soundfont">Soundfont</option>
			<option value="ElectricPiano">Electric piano</option>
			<option value="Mallet">Mallet</option>
		</select>

		<button class="hover:text-green-400" on:click={addInstrument}>
			<PlusCircle size="24" color="currentColor" />
		</button>
	</div>
</div>
