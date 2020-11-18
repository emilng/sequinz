<script>
	import { Mode } from '@tonaljs/tonal';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const scales = Mode.names();

	function handleClick(event) {
		dispatch('update', event.target.innerText);
	}
</script>

<style>
	button {
		display: inline-block;
	}
</style>

<div>
	{#each scales as scale}
		<button
			on:click={handleClick}
		>{scale}</button>
	{/each}
</div>