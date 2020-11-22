// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".settings-container.svelte-aeczi0{border-bottom:1px solid #999;box-shadow:0 1px 0px #ddd;padding-bottom:0.1rem;width:calc(100% - 3rem);margin:0 1rem 0.4rem 1rem}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}