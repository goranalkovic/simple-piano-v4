<script>
	export let dummy = false;
	export let keyCode = null;

	import { keyLabels } from '$lib/stores';

	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	const pressedKeys = getContext('pressedKeys');

	import CaretUp from "phosphor-svelte/lib/CaretUp";
	import CaretDown from "phosphor-svelte/lib/CaretDown";

	$: active = $pressedKeys?.[keyCode]?.pressed ?? false;
	$: shiftUp = $pressedKeys?.[keyCode]?.shift ?? false;
	$: shiftDown = $pressedKeys?.[keyCode]?.alt ?? false;
</script>

{#if dummy}
	<div
		class="invisible w-12 h-0 p-0 m-0 border border-transparent pointer-events-none select-none"
		aria-hidden="true"
	>
		&nbsp;
	</div>
{:else}
	<div
		class="flex items-end w-12 p-0 m-0 text-center transition-colors border border-t-0 border-white bg-slate-300 h-28 dark:border-gray-800 dark:bg-gray-950 rounded-br-md rounded-bl-md"
		class:!bg-cyan-300={active}
		class:dark:!bg-cyan-900={active}
	>
		<div class="flex flex-col pb-2 mx-auto mb-0.5 select-none pointer-events-none">
			<!-- {#if $chordMode && $chordNotes[keyId]}
        <span
          transition:fade
          class="leading-none text-gray-400 transition-colors transform scale-95 chord-label dark:text-gray-500 text-xxs">{@html $chordNotes[keyId]}</span>
      {/if} -->
			<span
				class="text-xs leading-none text-slate-950 dark:text-gray-200 flex flex-col gap-3 font-mono"
			>
				{#if active}
					<div class="flex gap-0.5">
						{#if shiftUp}
							<CaretUp size="16" color="currentColor" />
						{/if}
						{#if shiftDown}
							<CaretDown size="16" color="currentColor" />
						{/if}
					</div>

					<div
						transition:fade
						class="w-3 h-3 bg-cyan-800 dark:bg-cyan-500 rounded-full shadow-xl shadow-cyan-600 dark:shadow-cyan-300"
					/>
				{/if}
				<span>{@html keyLabels[keyCode]}</span>
			</span>
		</div>
	</div>
{/if}
