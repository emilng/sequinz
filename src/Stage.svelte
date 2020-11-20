<script>
	import Phaser from 'phaser';
	import { onMount } from "svelte";

	export let noteData;

	let canvas;

	const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        },
    },
    scene: {
        create: create,
    },
	};

	function collideWorld(event) {
		console.log(noteData);
	}

	function create() {

		const c1 = this.add.circle(200, 100, 80, 0xff0000);

		this.physics.add.existing(c1);

		c1.body.id = 'adgsdsag';
    c1.body.velocity.x = 100;
    c1.body.velocity.y = 100;
    c1.body.bounce.x = 1;
    c1.body.bounce.y = 1;
		c1.body.collideWorldBounds = true;
		c1.body.onWorldBounds = true;

		this.physics.world.on('worldbounds', collideWorld);

	}

	onMount(() => {
		const game = new Phaser.Game({ ...config, canvas });
	})
</script>

<style>

</style>

<canvas
	bind:this={canvas}
/>