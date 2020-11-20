<script>
	import { createEventDispatcher } from 'svelte';
	import SeqScaleSettings from './SeqScaleSettings.svelte';
	import SeqKeySettings from './SeqKeySettings.svelte';

	const dispatch = createEventDispatcher();

	export let settings = {
		division: 32,
		key: 'C',
		octave: 3,
		scale: 'ionian',
	};

	let key, scale;
	$: ({ key, scale } = settings);

	function updateSettings() {
		dispatch('update', settings);
	}

	function updateScale(event) {
    settings = {
    	...settings,
    	scale: event.detail,
    }
    updateSettings();
  }

  function updateKey(event) {
  	settings = {
  		...settings,
  		key: event.detail,
  	}
    updateSettings();
  }

  function populateGrid(event) {
  	dispatch('populateGrid');
  }

  function clearPattern(event) {
  	dispatch('clearPattern');
  }
</script>

<style>
	label {
		display: block;
	}

	.settings-container {
		border-bottom: 1px solid #999;
    box-shadow: 0 1px 0px #ddd;
    padding-bottom: 0.1rem;
    width: calc(100% - 3rem);
    margin: 0 1rem 0.4rem 1rem;
	}

	.settings-column {
		display: inline-block;
		margin-right: 1rem;
	}
</style>

<div class="settings-container">
	<div>{key} {scale}</div>
	<SeqKeySettings
		on:update={updateKey}
	/>
	<SeqScaleSettings
		on:update={updateScale}
	/>
	<div>
		<button on:click={populateGrid} >Populate grid</button>
		<button on:click={clearPattern} >Clear pattern</button>
	</div>
</div>