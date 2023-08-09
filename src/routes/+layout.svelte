<script>
export const ssr = false;

	import '../app.postcss';

	// https://github.com/wobsoriano/svelte-sonner

	import { Toaster } from 'svelte-sonner';
	import { initStores } from '$lib/stores';
	initStores();
</script>


<Toaster />
<slot />
