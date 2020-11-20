<script>
	import * as Tone from 'tone'
	import { createEventDispatcher, onMount } from "svelte";
	export let chord;
	export let chordPlaying = false;
	export let notePlaying = false;

	const dispatch = createEventDispatcher();

	let audioEnabled = false;

	$: updateNotePlaying(notePlaying);
	$: updateChordPlaying(chordPlaying);

	const chordSynth = new Tone.PolySynth(Tone.MonoSynth).toDestination();
	chordSynth.set({
		detune: -1200,
		envelope: {
			attack: 0.3,
			release: 3,
		},
		filterEnvelope: {
			attack: 4,
			release: 3,
		},
		filter: {
			frequency: 0.1,
		},
		maxPolyphony: 3,
		oscillator: {
			type: 'pwm',
		},
		volume: -20,
	});

	const noteSynth = new Tone.PolySynth().toDestination();
	noteSynth.set({
		detune: 3600,
		envelope: {
			attack: 0.01,
			release: 0.5,
		},
		filterEnvelope: {
			attack: 0.5,
			release: 0.5,
		},
		filter: {
			frequency: 0.2,
		},
		oscillator: {
			type: 'sine',
		},
		volume: -18,
	});


	function updateChordPlaying() {
		if (audioEnabled && chordPlaying === true) {
			chordSynth.triggerAttackRelease(chord, 3.5);
		}
	}

	function getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	function updateNotePlaying() {
		if (audioEnabled && notePlaying === true) {
			const noteToPlay = chord[getRandomInt(chord.length)];
			noteSynth.triggerAttackRelease(noteToPlay, .1);
		}
		setTimeout(() => {
			dispatch('updateNotePlaying', false);
		}, 100);
	}
	function handleStart() {
		audioEnabled = true;
		dispatch('updateNotePlaying', false);
	}

	function handleStop() {
		audioEnabled = false;
	}

	onMount(() => {
		// attach a click listener to a play button
		document.querySelector('.synth-play')?.addEventListener('click', async () => {
			await Tone.start()
			console.log('audio is ready');
			audioEnabled = true;
		})
	})
</script>

<style>
	div {
		height: 1rem;
	}
</style>

<button class="synth-play" on:click={handleStart}>Play</button>
<button on:click={handleStop}>Stop</button>
<div>Synth</div>
<div>{chord}</div>