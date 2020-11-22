// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "div.svelte-1azehqw{background-color:#707070;position:absolute;border-top:#c2c2c2;border-left:#999;border-bottom:#222;border-right:#585858;border-style:solid;border-width:1px;border-radius:1px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}