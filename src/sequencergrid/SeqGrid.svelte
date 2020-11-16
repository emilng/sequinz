<script>
	import { onMount } from "svelte";
	import { Scale } from '@tonaljs/tonal';
	import SeqSettings from './SeqSettings.svelte';
	import SeqRow from './SeqRow.svelte';

	let canvas;
	let ctx;
	let width;
	let height;
	let pixelRatio;
	let columnWidth;

	let settings = {
		division: 16,
		key: 'C',
		octave: 3,
		scale: 'chromatic',
	};

	let rowHeight = 24;

	let notes = getNotes(settings);

	function getNotes({key, octave, scale}) {
		const range = Scale.rangeOf(`${key} ${scale}`);
		return range(`${key}${octave}`, `${key}${octave + 1}`);
	}

	function updateDimensions() {
		width = window.innerWidth - 96;
		height = rowHeight * notes.length;
		pixelRatio = window.devicePixelRatio;
		columnWidth = width / settings.division;
		canvas.width = width * pixelRatio;
		canvas.height = height * pixelRatio;
	}

	function drawLine(startX, startY, endX, endY) {
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
		ctx.closePath();
	}

	function drawGrid() {
		const drawWidth = width * pixelRatio;
		const drawHeight = height * pixelRatio;
		const rows = notes.length;
		const columns = settings.division;

		ctx.clearRect(0, 0, drawWidth, drawHeight);

		// draw rows
		for (let i = 0; i <= rows; i += 1) {
			const yPos = i * rowHeight * pixelRatio;
			drawLine(0, yPos, drawWidth, yPos);
		}

		// draw columns
		for (let i = 0; i <= columns; i += 1) {
			const xPos = i * columnWidth * pixelRatio;
			drawLine(xPos, 0, xPos, drawHeight);
		}

		// draw quarter divisions
		ctx.save();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#111';
		for (let i = 0; i < 4; i += 1) {
			const quarterWidth = width / 4;
			const xPos = i * quarterWidth * pixelRatio;
			drawLine(xPos, 0, xPos, drawHeight);
		}
		ctx.restore();
	}

	function updateGrid () {
		updateDimensions();
		drawGrid();
	}

	function updateSettings(event) {
		settings = event.detail;
		notes = getNotes(settings);
		updateGrid();
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#333';
		updateGrid()
	});

</script>

<style>
	.grid-container {
		margin-right: 1rem;
		white-space: nowrap;
	}

 .note-container {
 	display: inline-block;
 	vertical-align: top;
 }

 .grid-canvas {
		display: inline-block;
		width: calc(100% - 5rem);
 }

</style>

<SeqSettings on:update={updateSettings} {settings} />
<div class="grid-container">
	<div class="note-container">
		{#each notes as noteName }
			<SeqRow {noteName} division={settings.division} />
		{/each}
	</div>
	<div
		class="grid-canvas"
	>
		<canvas
			bind:this={canvas}
			style="width: {width}px; height: {height}px"
		/>
	</div>
</div>
<svelte:window on:resize|passive={updateGrid} />
