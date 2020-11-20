<script>
	import { createEventDispatcher, onMount } from "svelte";
	import { Scale } from '@tonaljs/tonal';
	import SeqSettings from './SeqSettings.svelte';
	import SeqRowLabels from './SeqRowLabels.svelte';
	import SeqNotes, { addNote, deleteNote, updateNotes } from './SeqNotes.svelte';
	import SeqGridLines from './SeqGridLines.svelte';

	const dispatch = createEventDispatcher();

	let settings = {
		division: 32,
		key: 'C',
		octave: 3,
		scale: 'ionian',
	};

	let dimensions = {
		rowHeight: 24,
		pixelRatio: window.devicePixelRatio,
	};

	let rowLabels = getScaleNotes(settings);

	let notes = [];
	let noteData = {};

	function updateNoteData() {
		noteData = {};
		notes.forEach((noteObj) => {
			if (noteObj.column in noteData === false) {
				noteData[noteObj.column] = [];
			}
			noteData[noteObj.column].push(rowLabels[noteObj.row]);
		});
		dispatch('update', noteData);
	}

	function getScaleNotes({key, octave, scale}) {
		const range = Scale.rangeOf(`${key} ${scale}`);
		return range(`${key}${octave}`, `${key}${octave + 1}`);
	}

	function updateDimensions() {
		const width = window.innerWidth - 96;
		const height = dimensions.rowHeight * rowLabels.length;
		dimensions = {
			...dimensions,
			width,
			height,
			columnWidth: width / settings.division,
			rows: rowLabels.length,
			columns: settings.division,
		};
	}

	function updateGrid () {
		updateDimensions();
		notes = updateNotes(notes, dimensions);
	}

	function updateSettings(event) {
		settings = event.detail;
		rowLabels = getScaleNotes(settings);
		updateGrid();
		updateNoteData();
	}

	function handleAddNote(event) {
		const { clickX, clickY } = event.detail;
		notes = addNote(notes, dimensions, clickX, clickY);
		updateNoteData();
	}

	function handleDeleteNote(event) {
		notes = deleteNote(notes, event.detail);
		updateNoteData();
	}

	function getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	function handlePopulateGrid() {
		notes = [];
		for (let i = 0; i < settings.division; i += 1) {
			const startTriad = getRandomInt(4);
			const clickX = i * dimensions.columnWidth;
			for (let j = 0; j < 5; j += 2) {
				const clickY = (startTriad + j) * dimensions.rowHeight;
				notes = addNote(notes, dimensions, clickX, clickY);
			}
		}
		updateNoteData();
	}

	function handleClearPattern() {
		notes = [];
		updateNoteData();
	}

	onMount(() => {
		updateGrid()
		handlePopulateGrid()
	});

</script>

<style>
	.grid-container {
		margin-right: 1rem;
		white-space: nowrap;
	}

 .grid-canvas {
		display: inline-block;
		position: relative;
		width: calc(100% - 5rem);
 }
</style>

<SeqSettings
	on:update={updateSettings}
	on:populateGrid={handlePopulateGrid}
	on:clearPattern={handleClearPattern}
	{settings}
/>
<div class="grid-container">
	<SeqRowLabels labels={rowLabels} />
	<div class="grid-canvas">
		<SeqGridLines
			on:addNote={handleAddNote}
			settings={dimensions}
		/>
		<SeqNotes
			on:deleteNote={handleDeleteNote}
			{notes}
		/>
	</div>
</div>
<svelte:window on:resize|passive={updateGrid} />
