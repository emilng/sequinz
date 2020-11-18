<script>
	import { Note, Scale } from '@tonaljs/tonal';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const getNoteDisplay = (note) => {
		const enharmonic = Note.enharmonic(note);
		if (note === enharmonic) {
			return note;
		} else if (note === 'G#' || note === 'Ab') {
			return 'G#/Ab';
		} else {
			return [note, enharmonic].sort().join('/');
		}
	};

	const keys = Scale.get('C chromatic').notes.map((note) => {
		return {
			display: getNoteDisplay(note),
			value: note,
		};
	});

	function handleClick(event) {
		dispatch('update', event.target.getAttribute('data-value'));
	}
</script>

<style>
	button {
		display: inline-block;
	}
</style>

<div>
	{#each keys as key}
		<button
			on:click={handleClick}
			data-value={key.value}
		>{key.display}</button>
	{/each}
</div>