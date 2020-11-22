/* src/sequencergrid/SeqNotes.svelte generated by Svelte v3.29.4 */
import {
	SvelteComponent,
	check_outros,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	empty,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import { createEventDispatcher } from "../../web_modules/svelte.js";
import SeqNote from "./SeqNote.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i];
	return child_ctx;
}

// (51:0) {#each notes as noteSettings }
function create_each_block(ctx) {
	let seqnote;
	let current;

	seqnote = new SeqNote({
			props: { settings: /*noteSettings*/ ctx[3] }
		});

	seqnote.$on("deleteNote", /*handleDeleteNote*/ ctx[1]);

	return {
		c() {
			create_component(seqnote.$$.fragment);
		},
		m(target, anchor) {
			mount_component(seqnote, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const seqnote_changes = {};
			if (dirty & /*notes*/ 1) seqnote_changes.settings = /*noteSettings*/ ctx[3];
			seqnote.$set(seqnote_changes);
		},
		i(local) {
			if (current) return;
			transition_in(seqnote.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(seqnote.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(seqnote, detaching);
		}
	};
}

function create_fragment(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*notes*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*notes, handleDeleteNote*/ 3) {
				each_value = /*notes*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function addNote(notes, { rowHeight, columnWidth }, clickX, clickY) {
	const clickRow = Math.floor(clickY / rowHeight);
	const clickColumn = Math.floor(clickX / columnWidth);

	const noteObj = {
		left: clickColumn * columnWidth,
		top: clickRow * rowHeight,
		width: columnWidth,
		height: rowHeight,
		row: clickRow,
		column: clickColumn
	};

	return [...notes, noteObj];
}

function deleteNote(notes, { row, column }) {
	return notes.filter(note => {
		return note.row !== row || note.column !== column;
	});
}

function updateNotes(notes, { columnWidth, rowHeight }) {
	return notes.map(note => {
		return {
			...note,
			left: note.column * columnWidth,
			top: note.row * rowHeight,
			width: columnWidth
		};
	});
}

function instance($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { notes = [] } = $$props;

	function handleDeleteNote(event) {
		dispatch("deleteNote", { ...event.detail });
	}

	$$self.$$set = $$props => {
		if ("notes" in $$props) $$invalidate(0, notes = $$props.notes);
	};

	return [notes, handleDeleteNote];
}

class SeqNotes extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { notes: 0 });
	}
}

export default SeqNotes;
export { addNote, deleteNote, updateNotes };