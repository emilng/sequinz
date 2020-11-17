<script>
	import { onMount } from "svelte";
	import { Scale } from '@tonaljs/tonal';
	import SeqSettings from './SeqSettings.svelte';
	import SeqRow from './SeqRow.svelte';
	import SeqNote from './SeqNote.svelte';
	import SeqGridLines from './SeqGridLines.svelte';

	let settings = {
		division: 16,
		key: 'C',
		octave: 3,
		scale: 'chromatic',
	};

	let dimensions = {
		maxDivisions: 64,
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
			indexColumnWidth: width / dimensions.maxDivisions,
			rows: scaleNotes.length,
			columns: settings.division,
		};
	}

	function updateGrid () {
		updateDimensions();
		updateNotes();
	}

	function updateSettings(event) {
		settings = event.detail;
		scaleNotes = getScaleNotes(settings);
		updateGrid();
	}

	function updateNotes() {
		const { indexColumnWidth, rowHeight } = dimensions;
		notes = notes.map((note) => {
			return {
				...note,
				left: note.column * indexColumnWidth,
				top: note.row * rowHeight,
				width: note.columnWidth * indexColumnWidth,
			};
		});
	}

	function addNote(event) {
		const { clickX, clickY } = event.detail;
		const { rowHeight, columnWidth, maxDivisions } = dimensions;
		const clickRow = Math.floor(clickY / rowHeight);
		const snapColumn = Math.floor(clickX / columnWidth);
		const indexColumn = (snapColumn / settings.division) * maxDivisions;
		const noteObj = {
			left: snapColumn * columnWidth,
			top: clickRow * rowHeight,
			width: columnWidth,
			height: rowHeight,
			row: clickRow,
			column: indexColumn,
			columnWidth: maxDivisions / settings.division,
		};
		notes = [...notes, noteObj];
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
			on:addNote={addNote}
			settings={dimensions}
		/>
		{#each notes as noteSettings }
			<SeqNote settings={noteSettings} />
		{/each}
	</div>
</div>
<svelte:window on:resize|passive={updateGrid} />
