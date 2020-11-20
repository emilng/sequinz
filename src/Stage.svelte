<script>
	import Phaser from 'phaser';
	import { createEventDispatcher, onMount } from "svelte";

	const dispatch = createEventDispatcher();

	export let noteData;

	let canvas;
	let column = 0;

	const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 }
        },
    },
    scene: {
        create: create,
    },
	};

	function collideWorld(body, blockedUp, blockedDown, blockedLeft, blockedRight) {
		if (body.id === 'chord') {
			if (blockedDown) {
				if (column in noteData) {
					dispatch('updateChord', noteData[column]);
				}
				dispatch('updateChordPlaying', true);
			} else {
				dispatch('updateChordPlaying', false);
			}
			column += 1;
			if (column >= 32) {
				column = 0;
			}
		}
		if (body.id === 'note') {
			dispatch('updateNotePlaying', true);
		}
	}

	function createNoteCircle(circle) {
		const angle = Math.random() * Math.PI;
		const x = Math.cos(angle) * 200;
		const y = Math.sin(angle) * 200;
		circle.body.id = 'note';
    circle.body.velocity.x = x;
    circle.body.velocity.y = y;
    circle.body.bounce.x = 1;
    circle.body.bounce.y = 1;
		circle.body.collideWorldBounds = true;
		circle.body.onWorldBounds = true;
	}

	function create() {

		const c1 = this.add.circle(200, 100, 60, 0xff0000);
		const c2 = this.add.circle(300, 100, 10, 0xffffff);
		const c3 = this.add.circle(300, 100, 10, 0xffffff);
		const c4 = this.add.circle(300, 100, 10, 0xffffff);

		this.physics.add.existing(c1);
		this.physics.add.existing(c2);
		this.physics.add.existing(c3);
		this.physics.add.existing(c4);

		c1.body.id = 'chord';
    c1.body.velocity.x = 100;
    c1.body.velocity.y = 100;
    c1.body.bounce.x = 1;
    c1.body.bounce.y = 1;
		c1.body.collideWorldBounds = true;
		c1.body.onWorldBounds = true;

		createNoteCircle(c2);
		createNoteCircle(c3);
		createNoteCircle(c4);

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