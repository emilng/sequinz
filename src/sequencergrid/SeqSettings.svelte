<script>
	import { createEventDispatcher } from 'svelte';
	import { Note, Scale, ScaleType } from '@tonaljs/tonal';

	export let settings = {
		division: 16,
		key: 'C',
		octave: 3,
		scale: 'chromatic',
	};

	const dispatch = createEventDispatcher();

	let selectedDivision = settings.division || 16;
	let selectedKey = settings.key || 'C';
	let selectedOctave = settings.octave || 3;
	let selectedScale = settings.scale || 'chromatic';

	const getDivisions = (maxDivisions) => {
		const divisions = [];
		let currentDivision = 4;
		while(currentDivision <= maxDivisions) {
			divisions.push(
				{
					value: currentDivision,
					display: `1/${currentDivision}`,
				}
			)
			currentDivision *= 2;
		}
		return divisions;
	}

	const DIVISIONS = getDivisions(64);

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

	const CHROMATIC_NOTES = Scale.get('A chromatic').notes.map((note) => {
		return {
			display: getNoteDisplay(note),
			value: note,
		};
	});

	const SCALE_NAMES = ScaleType.names().sort();

	function updateSettings() {
		dispatch('update', {
			division: selectedDivision,
			key: selectedKey,
			octave: selectedOctave,
			scale: selectedScale,
		});
	}

	function updateDivision(event) {
		selectedDivision = parseInt(event.target.value, 10);
		updateSettings();
	}

	function updateScale(event) {
    selectedScale = event.target.value;
    updateSettings();
  }

  function updateOctave(event) {
  	selectedOctave = parseInt(event.target.value, 10);
    updateSettings();
  }

  function updateKey(event) {
  	selectedKey = event.target.value;
    updateSettings();
  }
</script>

<style>
	label {
		display: block;
	}

	.settings-container {
    border-bottom: 1px solid #999;
    box-shadow: 0 1px 1px #ddd;
    margin-bottom: 0.4rem;
    padding-bottom: 0.1rem;
    padding-left: 3.2rem;
		width: 100%;
	}

	.settings-column {
		display: inline-block;
		margin-right: 1rem;
	}
</style>

<div class="settings-container">
	<div class="settings-column">
		<label for="select-division">Division</label>
	  <select id="select-division" value={selectedDivision} on:change={updateDivision} >
	    {#each DIVISIONS as division}
	      <option value={division.value}>{division.display}</option>
	    {/each}
	  </select>
	</div>
	<div class="settings-column">
		<label for="select-scale">Scale</label>
	  <select id="select-scale" value={selectedScale} on:change={updateScale} >
	    {#each SCALE_NAMES as scaleName}
	      <option value={scaleName}>{scaleName}</option>
	    {/each}
	  </select>
	</div>
	<div class="settings-column">
		<label for="select-octave">Octave</label>
		<input id="select-octave" type="number" bind:value={selectedOctave} min={0} max={8} on:change={updateOctave} />
	</div>
	<div class="settings-column">
		<label for="select-key">Key</label>
		<select id="select-key" value={selectedKey} on:change={updateKey}>
			{#each CHROMATIC_NOTES as noteObj}
				<option value={noteObj.value}>{noteObj.display}</option>
			{/each}
		</select>
	</div>
</div>