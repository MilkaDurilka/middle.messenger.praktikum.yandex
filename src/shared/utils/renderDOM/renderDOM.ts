import type { Block } from "../block";

export function renderDOM(query: string, block: Block): Element | null {
  const root = document.querySelector(query);
  const content = block.getContent();

  if (root && content) {
    root.appendChild(content);
    block.dispatchMounted();
    return root;
  }

  return null;
}
