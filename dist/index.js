import { createRequire } from 'module';
import { jsx, Fragment } from 'preact/jsx-runtime';

createRequire(import.meta.url);

// src/components/styles/pseudo.scss
var pseudo_default = '@charset "UTF-8";\n.pseudocode-container {\n  margin: 1rem 0;\n  padding: 1rem;\n  background-color: var(--light);\n  border-radius: 0.5rem;\n  overflow-x: auto;\n}\n.pseudocode-container .ps-root {\n  font-size: 0.95rem;\n}\n.pseudocode-container .ps-algorithm {\n  background-color: transparent;\n  border: none;\n}\n.pseudocode-container .ps-line {\n  padding: 0.15rem 0;\n}\n.pseudocode-container .ps-keyword {\n  font-weight: 600;\n  color: var(--secondary);\n}\n.pseudocode-container .ps-funcname,\n.pseudocode-container .ps-algorithm > .ps-algorithmic {\n  color: var(--dark);\n}\n.pseudocode-container .ps-linenum {\n  color: var(--gray);\n  user-select: none;\n}\n.pseudocode-container .ps-comment {\n  color: var(--gray);\n  font-style: italic;\n}\n\npre.pseudocode-error {\n  border-left: 3px solid #ff4444;\n}\npre.pseudocode-error::before {\n  content: "\u26A0 Pseudocode rendering failed";\n  display: block;\n  color: #ff4444;\n  font-size: 0.85rem;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n}';

// src/components/scripts/pseudo.inline.ts
var pseudo_inline_default = `var a=()=>window.katex?Promise.resolve():(window.katexLoaded||(window.katexLoaded=new Promise((o,n)=>{let e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js",e.async=!0,e.onload=()=>{console.log("KaTeX loaded successfully for pseudocode rendering"),o()},e.onerror=()=>{console.error("Failed to load KaTeX from CDN"),n(new Error("KaTeX load failed"))},document.head.appendChild(e)})),window.katexLoaded),i=()=>window.pseudocode?Promise.resolve():new Promise((o,n)=>{let e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/pseudocode@latest/build/pseudocode.min.js",e.async=!0,e.onload=()=>{console.log("Pseudocode.js loaded successfully"),o()},e.onerror=()=>{console.error("Failed to load pseudocode.js from CDN"),n(new Error("Pseudocode.js load failed"))},document.head.appendChild(e)}),s=async()=>{let o=document.querySelectorAll('code[data-language="pseudo"]');if(o.length===0)return;try{await Promise.all([a(),i()])}catch(e){console.error("Failed to load required libraries for pseudocode rendering:",e);return}let n=window.pseudocode;for(let e of o){let r=e.textContent,d=e.parentElement;if(d&&r&&!d.classList.contains("pseudocode-rendered")){let t=document.createElement("div");t.classList.add("pseudocode-container");try{n.render(r,t,{indentSize:"1.2em",lineNumber:!0,lineNumberPunc:":",noEnd:!1,katex:window.katex}),d.replaceWith(t)}catch(c){console.error("Pseudocode.js failed to render:",c),console.error("Content:",r),d.classList.add("pseudocode-error")}}}};typeof document<"u"&&(document.addEventListener("nav",s),document.addEventListener("render",s));
`;
var Pseudo_default = ((_opts) => {
  const Pseudo = ({ children }) => {
    return /* @__PURE__ */ jsx(Fragment, { children });
  };
  Pseudo.css = pseudo_default;
  Pseudo.afterDOMLoaded = pseudo_inline_default;
  return Pseudo;
});

// src/index.ts
function init(options) {
}

export { Pseudo_default as Pseudo, init };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map