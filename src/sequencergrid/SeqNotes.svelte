<script context="module">
	export function addNote(notes, { rowHeight, columnWidth }, clickX, clickY) {
		const clickRow = Math.floor(clickY / rowHeight);
		const clickColumn = Math.floor(clickX / columnWidth);
		const noteObj = {
			left: clickColumn * columnWidth,
			top: clickRow * rowHeight,
			width: columnWidth,
			height: rowHeight,
			row: clickRow,
			column: clickColumn,
		};
		return [...notes, noteObj];
	}

	export function deleteNote(notes, { row, column }) {
		return notes.filter((note) => {
			return (note.row !== row || note.column !== column);
		});
	}

	export function updateNotes(notes, { columnWidth, rowHeight }) {
		return notes.map((note) => {
			return {
				...note,
				left: note.column * columnWidth,
				top: note.row * rowHeight,
				width: columnWidth,
			};
		});
	}
</script>

<script>
	import { createEventDispatcher } from 'svelte';
	import SeqNote from './SeqNote.svelte';

	const dispatch = createEventDispatcher();

	export let notes = [];

	function handleDeleteNote(event) {
		dispatch('deleteNote', { ...event.detail });
	}
</script>

<style>

</style>

{#each notes as noteSettings }
	<SeqNote
		on:deleteNote={handleDeleteNote}
		settings={noteSettings}
	/>
{/each}