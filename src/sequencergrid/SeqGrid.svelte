<script>
	import { onMount } from "svelte";
	import { Scale } from '@tonaljs/tonal';
	import SeqSettings from './SeqSettings.svelte';
	import SeqRow from './SeqRow.svelte';
	import SeqNotes, { addNote, deleteNote, updateNotes } from './SeqNotes.svelte';
	import SeqNote from './SeqNote.svelte';
	import SeqGridLines from './SeqGridLines.svelte';

	let settings = {
		division: 32,
		key: 'C',
		octave: 3,
		scale: 'chromatic',
	};

	let dimensions = {
		rowHeight: 24,
		pixelRatio: window.devicePixelRatio,
	};

	let notes = [];

	let scaleNotes = getScaleNotes(settings);

	function getScaleNotes({key, octave, scale}) {
		const range = Scale.rangeOf(`${key} ${scale}`);
		return range(`${key}${octave}`, `${key}${octave + 1}`);
	}

	function updateDimensions() {
		const width = window.innerWidth - 96;
		const height = dimensions.rowHeight * scaleNotes.length;
		dimensions = {
			...dimensions,
			width,
			height,
			columnWidth: width / settings.division,
			rows: scaleNotes.length,
			columns: settings.division,
		};
	}

	function updateGrid () {
		updateDimensions();
		notes = updateNotes(notes, dimensions);
	}

	function updateSettings(event) {
		settings = event.detail;
		scaleNotes = getScaleNotes(settings);
		updateGrid();
	}

	function handleAddNote(event) {
		const { clickX, clickY } = event.detail;
		notes = addNote(notes, dimensions, clickX, clickY);
	}

	function handleDeleteNote(event) {
		notes = deleteNote(notes, event.detail);
	}

	onMount(() => {
		updateGrid()
	});

</script>

<style>
	.grid-container {
		margin-right: 1rem;
		white-space: nowrap;
	}

 .scale-note-container {
 	display: inline-block;
 	vertical-align: top;
 }

 .grid-canvas {
		display: inline-block;
		position: relative;
		width: calc(100% - 5rem);
 }
</style>

<SeqSettings on:update={updateSettings} {settings} />
<div class="grid-container">
	<div class="scale-note-container">
		{#each scaleNotes as noteName }
			<SeqRow {noteName} division={settings.division} />
		{/each}
	</div>
	<div
		class="grid-canvas"
	>
		<SeqGridLines
			on:addNote={handleAddNote}
			settings={dimensions}
		/>
		{#each notes as noteSettings }
			<SeqNote settings={noteSettings} />
		{/each}
		<SeqNotes
			on:deleteNote={handleDeleteNote}
			{notes}
		/>
	</div>
</div>
<svelte:window on:resize|passive={updateGrid} />
