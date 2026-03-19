const setupPseudocodeRendering = () => {
  const codeBlocks = document.querySelectorAll(
    'code[data-language="pseudo"], code.language-pseudo, pre[data-language="pseudo"] code',
  );
  if (codeBlocks.length === 0) return;

  // @ts-expect-error Added globally via the transformer
  const options = window.pseudocodeConfig || {};

  // @ts-expect-error Loaded globally via Quartz
  if (!window.pseudocode || !window.katex) {
    setTimeout(setupPseudocodeRendering, 100);
    return;
  }

  for (const block of codeBlocks) {
    let content = "";
    const lineSpans = block.querySelectorAll("span[data-line]");

    if (lineSpans.length > 0) {
      content = Array.from(lineSpans)
        .map((span) => span.textContent)
        .join("\n");
    } else {
      content = block.textContent || "";
    }

    // Fix: We want to replace the <pre> block (which contains the code),
    // but NOT the <figure> wrapper if it exists (which Quartz uses for layout/captions).
    // If no <pre> exists (unlikely for block code), fallback to the code block itself.
    const targetNode = block.closest("pre") || block;

    if (targetNode && content && !targetNode.classList.contains("pseudocode-rendered")) {
      const container = document.createElement("div");
      container.classList.add("pseudocode-container");

      try {
        // @ts-expect-error Loaded globally
        window.pseudocode.render(content, container, {
          ...options,
          // @ts-expect-error Loaded globally
          katex: window.katex,
        });

        container.classList.add("pseudocode-rendered");
        targetNode.replaceWith(container);
      } catch (e) {
        console.error("Pseudocode.js failed to render:", e);
        targetNode.classList.add("pseudocode-rendered", "pseudocode-error");
      }
    }
  }
};

if (typeof document !== "undefined") {
  setupPseudocodeRendering();
  document.addEventListener("nav", setupPseudocodeRendering);
}

export default "";
