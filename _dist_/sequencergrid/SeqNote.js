import './SeqNote.css.proxy.js';
/* src/sequencergrid/SeqNote.svelte generated by Svelte v3.29.4 */
import {
	SvelteComponent,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_style
} from "../../web_modules/svelte/internal.js";

import { createEventDispatcher } from "../../web_modules/svelte.js";

function create_fragment(ctx) {
	let div;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			attr(div, "role", "button");
			set_style(div, "left", /*left*/ ctx[0] + "px");
			set_style(div, "top", /*top*/ ctx[1] + "px");
			set_style(div, "width", /*width*/ ctx[2] - 2 + "px");
			set_style(div, "height", /*height*/ ctx[3] - 2 + "px");
			attr(div, "class", "svelte-1azehqw");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(div, "click", /*handleClick*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*left*/ 1) {
				set_style(div, "left", /*left*/ ctx[0] + "px");
			}

			if (dirty & /*top*/ 2) {
				set_style(div, "top", /*top*/ ctx[1] + "px");
			}

			if (dirty & /*width*/ 4) {
				set_style(div, "width", /*width*/ ctx[2] - 2 + "px");
			}

			if (dirty & /*height*/ 8) {
				set_style(div, "height", /*height*/ ctx[3] - 2 + "px");
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let { settings } = $$props;
	let left, top, width, height;

	function handleClick() {
		const { row, column } = settings;
		dispatch("deleteNote", { row, column });
	}

	$$self.$$set = $$props => {
		if ("settings" in $$props) $$invalidate(5, settings = $$props.settings);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*settings*/ 32) {
			$: $$invalidate(0, { left, top, width, height } = settings, left, ($$invalidate(1, top), $$invalidate(5, settings)), ($$invalidate(2, width), $$invalidate(5, settings)), ($$invalidate(3, height), $$invalidate(5, settings)));
		}
	};

	return [left, top, width, height, handleClick, settings];
}

class SeqNote extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { settings: 5 });
	}
}

export default SeqNote;