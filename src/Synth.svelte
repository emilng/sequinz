<script>
	import * as Tone from 'tone'
	import { createEventDispatcher, onMount } from "svelte";
	export let chord;
	export let chordPlaying = false;
	export let highNotePlaying = false;
	export let midNotePlaying = false;

	const dispatch = createEventDispatcher();

	let audioEnabled = false;

	$: updateHighNotePlaying(highNotePlaying);
	$: updateMidNotePlaying(midNotePlaying);
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

	const highNoteSynth = new Tone.PolySynth().toDestination();
	highNoteSynth.set({
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

	const midNoteSynth = new Tone.PolySynth().toDestination();
	midNoteSynth.set({
		envelope: {
			attack: 0.01,
			release: 0.4,
		},
		filterEnvelope: {
			attack: 0.01,
			release: 0.4,
		},
		filter: {
			frequency: 0.4,
		},
		oscillator: {
			type: 'triangle',
		},
		volume: -5,
	});


	function updateChordPlaying() {
		if (audioEnabled && chordPlaying === true) {
			chordSynth.triggerAttackRelease(chord, 3.5);
		}
	}

	function updateMidNotePlaying() {
		if (audioEnabled && midNotePlaying === true) {
			const midNote = chord[getRandomInt(chord.length)];
			midNoteSynth.triggerAttackRelease(midNote, 1);
		}
		setTimeout(() => {
			dispatch('updateMidNotePlaying', false);
		}, 100);
	}

	function getRandomInt(max) {
	  return Math.floor(Math.random() * Math.floor(max));
	}

	function updateHighNotePlaying() {
		if (audioEnabled && highNotePlaying === true) {
			const noteToPlay = chord[getRandomInt(chord.length)];
			highNoteSynth.triggerAttackRelease(noteToPlay, .2);
		}
		setTimeout(() => {
			dispatch('updateHighNotePlaying', false);
		}, 100);
	}

	function handleStart() {
		audioEnabled = true;
		dispatch('updateHighNotePlaying', false);
		dispatch('updateMidNotePlaying', false);
	}

	function handleStop() {
		audioEnabled = false;
	}

	onMount(() => {
		// attach a click listener to a play button
		document.querySelector('.synth-play').addEventListener('click', async () => {
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