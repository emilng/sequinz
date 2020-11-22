// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".grid-container.svelte-rn6lng{margin-right:1rem;white-space:nowrap}.grid-canvas.svelte-rn6lng{display:inline-block;position:relative;width:calc(100% - 5rem)}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}