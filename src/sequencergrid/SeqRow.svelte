<script>
	export let noteName;
	export let division;
</script>

<style>
	.row-container {
		height: 1.5rem;
	}

	.note-label {
    display: inline-block;
    padding-top: 0.3rem;
    text-align: right;
    vertical-align: top;
    width: 3rem;
	}
</style>

<div class="row-container">
	<div class="note-label">{noteName}</div>
</div>