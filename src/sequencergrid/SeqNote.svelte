<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let settings;

	let left, top, width, height;
	$: ({ left, top, width, height } = settings);

	function handleClick() {
		const { row, column } = settings;
		dispatch('deleteNote', {
			row,
			column,
		});
	}
</script>

<style>
	div {
		background-color: #707070;
		position: absolute;
    border-top: #c2c2c2;
    border-left: #999;
    border-bottom: #222;
    border-right: #585858;
    border-style: solid;
    border-width: 1px;
    border-radius: 1px;
	}
</style>

<div
	on:click={handleClick}
	role="button"
	style="left: {left}px; top: {top}px; width: {width - 2}px; height: {height - 2}px"
/>