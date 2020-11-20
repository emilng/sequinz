<script>
  import Synth from './Synth.svelte';
  import Stage from './Stage.svelte';
  import SeqGrid from './sequencergrid/SeqGrid.svelte';

  let noteData = [];

  function handleUpdateNotes(event) {
    noteData = event.detail;
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
  <Synth />
  <Stage {noteData} />
  <SeqGrid on:update={handleUpdateNotes}/>
</div>
