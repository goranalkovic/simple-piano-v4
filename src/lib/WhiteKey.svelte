<script>
	export let keyCode;

	import { keyLabels } from '$lib/stores';

	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	const pressedKeys = getContext('pressedKeys');

	import { CaretUp, CaretDown } from 'phosphor-svelte';

	$: active = $pressedKeys?.[keyCode]?.pressed ?? false;
	$: shiftUp = $pressedKeys?.[keyCode]?.shift ?? false;
	$: shiftDown = $pressedKeys?.[keyCode]?.alt ?? false;
</script>

<div
	class:bg-red-400={active}
	class:dark:bg-red-700={active}
	class="flex items-end w-12 h-48 p-0 m-0 text-center transition border-0 cursor-pointer bg-gray-50 dark:bg-gray-700 rounded-br-md rounded-bl-md"
>
	<div class="flex flex-col pb-2 mx-auto mb-0.5 select-none pointer-events-none">
		<!-- {#if $chordMode && $chordNotes[keyId]}
      <span
        transition:fade
        class="leading-none text-gray-400 transition-colors transform scale-95 dark:text-gray-500 text-xxs"
        >{@html $chordNotes[keyId]}</span
      >
    {/if} -->
		<span
			class="flex flex-col gap-0.5 text-xs leading-none text-gray-700 dark:text-gray-200 font-mono"
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
<!--
<style global lang="postcss">
	.keyboard-key.active {
		@apply scale-[99%];
		box-shadow: inset 0 -1px 1.5rem rgb(0 0 0 / 0.2);
	}

	.dark .keyboard-key.active {
		box-shadow: inset 0 -1px 1.5rem rgb(12 12 12 / 0.5);
	}

	.keyboard-key.active span:first-of-type {
		@apply text-ocean-500 dark:text-azure-400;
	}

	.keyboard-key.active span:last-of-type {
		@apply text-ocean-500 dark:text-azure-200;
	}
</style> -->
