<script>
  import Synth from './Synth.svelte';
  import Stage from './Stage.svelte';
  import SeqGrid from './sequencergrid/SeqGrid.svelte';

  let noteData = {};
  let chord = [];
  let chordPlaying = false;
  let notePlaying = false;

  function handleUpdateNotes(event) {
    noteData = event.detail;
  }

  function handleUpdateChord(event) {
    chord = event.detail;
  }

  function handleUpdateChordPlaying(event) {
    chordPlaying = event.detail;
  }

  function handleUpdateNotePlaying(event) {
    notePlaying = event.detail;
  }
</script>

<style>
  :global(body) {
    background-color: #bbb;
    box-sizing: border-box;
    color: #111;
    font-family: sans-serif;
    font-weight: 400;
    margin: 0;
  }
</style>

<div class="App">
  <Synth
    {chord}
    {chordPlaying}
    {notePlaying}
    on:updateNotePlaying={handleUpdateNotePlaying}
  />
  <Stage
    on:updateChord={handleUpdateChord}
    on:updateChordPlaying={handleUpdateChordPlaying}
    on:updateNotePlaying={handleUpdateNotePlaying}
    {noteData}
  />
  <SeqGrid on:update={handleUpdateNotes}/>
</div>
