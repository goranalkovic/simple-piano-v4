<script>
	import { getContext } from 'svelte';
	const volume = getContext('volume');
	const octaveShift = getContext('octaveShift');

	import { toast } from 'svelte-sonner';


	const isLoading = getContext('isLoading');
	import { pianoKeyCodes } from '$lib/stores';
	import WhiteKey from './WhiteKey.svelte';
	import BlackKey from './BlackKey.svelte';

	const pressedKeys = getContext('pressedKeys');


</script>

<!-- {#each pianoKeyCodes as key, i}
	{key}: {$pressedKeys[key].pressed}
	{$pressedKeys[key].shift ? 'SHIFT' : ''}
	{$pressedKeys[key].alt ? 'ALT' : ''}
	{$pressedKeys[key].ctrl ? 'CTRL' : ''} <br />
{/each} -->

<a href="/edit-instruments">Edit instruments</a>

<div class:opacity-30={$isLoading} class="p-20 m-auto select-none piano-grid w-fit">
    <div class="white-keys flex gap-px w-max h-max z-[1]">
        <WhiteKey keyCode={20} />
        <WhiteKey keyCode={65} />
        <WhiteKey keyCode={83} />
        <WhiteKey keyCode={68} />
        <WhiteKey keyCode={70} />
        <WhiteKey keyCode={71} />
        <WhiteKey keyCode={72} />
        <WhiteKey keyCode={74} />
        <WhiteKey keyCode={75} />
        <WhiteKey keyCode={76} />
        <WhiteKey keyCode={186} />
        <WhiteKey keyCode={222} />
        <WhiteKey keyCode={220} />
        <WhiteKey keyCode={13} />
        <WhiteKey keyCode={46} />
        <WhiteKey keyCode={35} />
        <WhiteKey keyCode={34} />
        <WhiteKey keyCode={103} />
        <WhiteKey keyCode={104} />
        <WhiteKey keyCode={105} />
        <WhiteKey keyCode={107} />
    </div>
    <div class="black-keys mx-4 px-0.5 flex gap-px mb-auto z-[2]">
        <BlackKey keyCode={81} />
        <BlackKey keyCode={87} />
        <BlackKey keyCode={69} />
        <BlackKey dummy />
        <BlackKey keyCode={84} />
        <BlackKey keyCode={90} />
        <BlackKey dummy />
        <BlackKey keyCode={73} />
        <BlackKey keyCode={79} />
        <BlackKey keyCode={80} />
        <BlackKey dummy />
        <BlackKey keyCode={221} />
        <BlackKey keyCode={8} />
        <BlackKey dummy />
        <BlackKey keyCode={45} />
        <BlackKey keyCode={36} />
        <BlackKey keyCode={33} />
        <BlackKey dummy />
        <BlackKey keyCode={111} />
        <BlackKey keyCode={106} />
    </div>
</div>

<style global>
    .piano-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
    }

    .white-keys {
        grid-column: 1;
        grid-row: 1 / 2;
    }

    .black-keys {
        grid-column: 1;
        grid-row: 1;
    }
</style>

<div class="radial-progress" style="--value: {$volume};">
	VOL {$volume}%
	<div class="join">
		<kbd class="kbd kbd-xs">&LeftArrow; </kbd>
		<kbd class="kbd kbd-xs">&RightArrow; </kbd>
	</div>
</div>

<div class="radial-progress" style="--value: {$volume};">
	OCT {$octaveShift}
	<div class="join">
		<kbd class="kbd kbd-xs">&UpArrow; </kbd>
		<kbd class="kbd kbd-xs">&DownArrow; </kbd>
	</div>
</div>
