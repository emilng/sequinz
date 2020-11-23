/* src/Stage.svelte generated by Svelte v3.29.4 */
import {
	SvelteComponent,
	binding_callbacks,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "../web_modules/svelte/internal.js";

import Phaser from "../web_modules/phaser.js";
import { createEventDispatcher, onMount } from "../web_modules/svelte.js";

function create_fragment(ctx) {
	let canvas_1;

	return {
		c() {
			canvas_1 = element("canvas");
		},
		m(target, anchor) {
			insert(target, canvas_1, anchor);
			/*canvas_1_binding*/ ctx[2](canvas_1);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(canvas_1);
			/*canvas_1_binding*/ ctx[2](null);
		}
	};
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

function instance($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { noteData } = $$props;
	let canvas;
	let column = 0;

	const config = {
		type: Phaser.WEBGL,
		width: 800,
		height: 400,
		physics: {
			default: "arcade",
			arcade: { gravity: { y: 100 } }
		},
		scene: { create }
	};

	function triggerMessage(message) {
		dispatch(message, true);

		setTimeout(
			() => {
				dispatch(message, false);
			},
			100
		);
	}

	function collideWorld(body, blockedUp, blockedDown, blockedLeft, blockedRight) {
		if (body.id === "chord") {
			if (blockedDown) {
				if (column in noteData) {
					dispatch("updateChord", noteData[column]);
				}

				triggerMessage("updateChordPlaying");
			}

			column += 1;

			if (column >= 32) {
				column = 0;
			}
		}

		if (body.id === "highNote") {
			triggerMessage("updateHighNotePlaying");
		}

		if (body.id === "midNote") {
			triggerMessage("updateMidNotePlaying");
		}
	}

	function create() {
		const chord = this.add.circle(200, 100, 60, 16711680);
		const midNote1 = this.add.circle(100, 100, 30, 10066329);
		const highNote1 = this.add.circle(300, 100, 10, 16777215);
		const highNote2 = this.add.circle(300, 100, 10, 16777215);
		const highNote3 = this.add.circle(300, 100, 10, 16777215);
		const createPhysicsNoteCircle = createNoteCircle.bind(this, this.physics);
		createPhysicsNoteCircle(chord, "chord", 100);
		createPhysicsNoteCircle(midNote1, "midNote", 150);
		createPhysicsNoteCircle(highNote1, "highNote", 200);
		createPhysicsNoteCircle(highNote2, "highNote", 200);
		createPhysicsNoteCircle(highNote3, "highNote", 200);
		this.physics.world.on("worldbounds", collideWorld);
	}

	onMount(() => {
		const game = new Phaser.Game({ ...config, canvas });
	});

	function canvas_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			canvas = $$value;
			$$invalidate(0, canvas);
		});
	}

	$$self.$$set = $$props => {
		if ("noteData" in $$props) $$invalidate(1, noteData = $$props.noteData);
	};

	return [canvas, noteData, canvas_1_binding];
}

class Stage extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { noteData: 1 });
	}
}

export default Stage;