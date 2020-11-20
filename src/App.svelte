<script>
  import Synth from './Synth.svelte';
  import Stage from './Stage.svelte';
  import SeqGrid from './sequencergrid/SeqGrid.svelte';

  let noteData = {};
  let chord = [];
  let chordPlaying = false;
  let highNotePlaying = false;
  let midNotePlaying = false;

  function handleUpdateNotes(event) {
    noteData = event.detail;
  }

  function handleUpdateChord(event) {
    chord = event.detail;
  }

  function handleUpdateChordPlaying(event) {
    chordPlaying = event.detail;
  }

  function handleUpdateHighNotePlaying(event) {
    highNotePlaying = event.detail;
  }

  function handleUpdateMidNotePlaying(event) {
    midNotePlaying = event.detail;
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
    {midNotePlaying}
    {highNotePlaying}
    on:updateMidNotePlaying={handleUpdateMidNotePlaying}
    on:updateHighNotePlaying={handleUpdateHighNotePlaying}
  />
  <Stage
    on:updateChord={handleUpdateChord}
    on:updateChordPlaying={handleUpdateChordPlaying}
    on:updateMidNotePlaying={handleUpdateMidNotePlaying}
    on:updateHighNotePlaying={handleUpdateHighNotePlaying}
    {noteData}
  />
  <SeqGrid on:update={handleUpdateNotes}/>
</div>
