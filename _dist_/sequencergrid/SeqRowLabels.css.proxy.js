// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".labels-column.svelte-dmts39{display:inline-block;vertical-align:top}.label-row.svelte-dmts39{height:1.5rem}.label.svelte-dmts39{display:inline-block;padding-top:0.3rem;text-align:right;vertical-align:top;width:3rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}