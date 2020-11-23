import './App.css.proxy.js';
/* src/App.svelte generated by Svelte v3.29.4 */
import {
	SvelteComponent,
	append,
	attr,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "../web_modules/svelte/internal.js";

import Synth from "./Synth.js";
import Stage from "./Stage.js";
import SeqGrid from "./sequencergrid/SeqGrid.js";

function create_fragment(ctx) {
	let div;
	let synth;
	let t0;
	let stage;
	let t1;
	let seqgrid;
	let current;

	synth = new Synth({
			props: {
				chord: /*chord*/ ctx[1],
				chordPlaying: /*chordPlaying*/ ctx[2],
				midNotePlaying: /*midNotePlaying*/ ctx[4],
				highNotePlaying: /*highNotePlaying*/ ctx[3]
			}
		});

	synth.$on("updateChordPlaying", /*handleUpdateChordPlaying*/ ctx[7]);
	synth.$on("updateMidNotePlaying", /*handleUpdateMidNotePlaying*/ ctx[9]);
	synth.$on("updateHighNotePlaying", /*handleUpdateHighNotePlaying*/ ctx[8]);
	stage = new Stage({ props: { noteData: /*noteData*/ ctx[0] } });
	stage.$on("updateChord", /*handleUpdateChord*/ ctx[6]);
	stage.$on("updateChordPlaying", /*handleUpdateChordPlaying*/ ctx[7]);
	stage.$on("updateMidNotePlaying", /*handleUpdateMidNotePlaying*/ ctx[9]);
	stage.$on("updateHighNotePlaying", /*handleUpdateHighNotePlaying*/ ctx[8]);
	seqgrid = new SeqGrid({});
	seqgrid.$on("update", /*handleUpdateNotes*/ ctx[5]);

	return {
		c() {
			div = element("div");
			create_component(synth.$$.fragment);
			t0 = space();
			create_component(stage.$$.fragment);
			t1 = space();
			create_component(seqgrid.$$.fragment);
			attr(div, "class", "App");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(synth, div, null);
			append(div, t0);
			mount_component(stage, div, null);
			append(div, t1);
			mount_component(seqgrid, div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const synth_changes = {};
			if (dirty & /*chord*/ 2) synth_changes.chord = /*chord*/ ctx[1];
			if (dirty & /*chordPlaying*/ 4) synth_changes.chordPlaying = /*chordPlaying*/ ctx[2];
			if (dirty & /*midNotePlaying*/ 16) synth_changes.midNotePlaying = /*midNotePlaying*/ ctx[4];
			if (dirty & /*highNotePlaying*/ 8) synth_changes.highNotePlaying = /*highNotePlaying*/ ctx[3];
			synth.$set(synth_changes);
			const stage_changes = {};
			if (dirty & /*noteData*/ 1) stage_changes.noteData = /*noteData*/ ctx[0];
			stage.$set(stage_changes);
		},
		i(local) {
			if (current) return;
			transition_in(synth.$$.fragment, local);
			transition_in(stage.$$.fragment, local);
			transition_in(seqgrid.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(synth.$$.fragment, local);
			transition_out(stage.$$.fragment, local);
			transition_out(seqgrid.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(synth);
			destroy_component(stage);
			destroy_component(seqgrid);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let noteData = {};
	let chord = [];
	let chordPlaying = false;
	let highNotePlaying = false;
	let midNotePlaying = false;

	function handleUpdateNotes(event) {
		$$invalidate(0, noteData = event.detail);
	}

	function handleUpdateChord(event) {
		$$invalidate(1, chord = event.detail);
	}

	function handleUpdateChordPlaying(event) {
		$$invalidate(2, chordPlaying = event.detail);
	}

	function handleUpdateHighNotePlaying(event) {
		$$invalidate(3, highNotePlaying = event.detail);
	}

	function handleUpdateMidNotePlaying(event) {
		$$invalidate(4, midNotePlaying = event.detail);
	}

	return [
		noteData,
		chord,
		chordPlaying,
		highNotePlaying,
		midNotePlaying,
		handleUpdateNotes,
		handleUpdateChord,
		handleUpdateChordPlaying,
		handleUpdateHighNotePlaying,
		handleUpdateMidNotePlaying
	];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default App;