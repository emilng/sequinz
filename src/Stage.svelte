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

	function triggerMessage(message) {
		dispatch(message, true);
		setTimeout(() => {
			dispatch(message, false);
		}, 100);
	}

	function collideWorld(body, blockedUp, blockedDown, blockedLeft, blockedRight) {
		if (body.id === 'chord') {
			if (blockedDown) {
				if (column in noteData) {
					dispatch('updateChord', noteData[column]);
				}
				triggerMessage('updateChordPlaying');
			}
			column += 1;
			if (column >= 32) {
				column = 0;
			}
		}
		if (body.id === 'highNote') {
			triggerMessage('updateHighNotePlaying');
		}
		if (body.id === 'midNote') {
			triggerMessage('updateMidNotePlaying');
		}
	}

	function createNoteCircle(physics, circle, id, velocity) {
		physics.add.existing(circle);
		const angle = Math.random() * Math.PI;
		const x = Math.cos(angle) * velocity;
		const y = Math.sin(angle) * velocity;
		circle.body.id = id;
    circle.body.velocity.x = x;
    circle.body.velocity.y = y;
    circle.body.bounce.x = 1;
    circle.body.bounce.y = 1;
		circle.body.collideWorldBounds = true;
		circle.body.onWorldBounds = true;
	}

	function create() {

		const chord = this.add.circle(200, 100, 60, 0xff0000);

		const midNote1 = this.add.circle(100, 100, 30, 0x999999);

		const highNote1 = this.add.circle(300, 100, 10, 0xffffff);
		const highNote2 = this.add.circle(300, 100, 10, 0xffffff);
		const highNote3 = this.add.circle(300, 100, 10, 0xffffff);

		const createPhysicsNoteCircle = createNoteCircle.bind(this, this.physics);

		createPhysicsNoteCircle(chord, 'chord', 100);
		createPhysicsNoteCircle(midNote1, 'midNote', 150);
		createPhysicsNoteCircle(highNote1, 'highNote', 200);
		createPhysicsNoteCircle(highNote2, 'highNote', 200);
		createPhysicsNoteCircle(highNote3, 'highNote', 200);

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