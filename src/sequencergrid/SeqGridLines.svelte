<script>
	import { onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let settings;

	let canvas;
	let ctx;

	$: drawGrid(settings);

	function addNote(event) {
		dispatch('addNote', {
			clickX: event.offsetX,
			clickY: event.offsetY,
		});
	}

	function drawLine(startX, startY, endX, endY) {
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
		ctx.closePath();
	}

	function drawGrid(settings) {
		if (!settings || !canvas) return;
		const {
			width,
			height,
			columnWidth,
			pixelRatio,
			rows,
			columns,
			rowHeight,
		} = settings;

		canvas.width = width * pixelRatio;
		canvas.height = height * pixelRatio;
		const drawWidth = width * pixelRatio;
		const drawHeight = height * pixelRatio;

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
		for (let i = 0; i < 8; i += 1) {
			const quarterWidth = width / 8;
			const xPos = i * quarterWidth * pixelRatio;
			drawLine(xPos, 0, xPos, drawHeight);
		}
		ctx.restore();
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#333';
		dispatch('updateGrid');
	});
</script>

<style>

</style>

<canvas
	bind:this={canvas}
	on:click={addNote}
	style="width: {settings.width}px; height: {settings.height}px"
/>