<script>
	export let labels;
</script>

<style>
	.labels-column {
	 	display: inline-block;
	 	vertical-align: top;
	}

	.label-row {
		height: 1.5rem;
	}

	.label {
    display: inline-block;
    padding-top: 0.3rem;
    text-align: right;
    vertical-align: top;
    width: 3rem;
	}
</style>

<div class="labels-column">
	{#each labels as label }
		<div class="label-row">
			<div class="label">{label}</div>
		</div>
	{/each}
</div>