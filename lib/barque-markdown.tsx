import React from "react";

/**
 * Minimal inline-markdown renderer for Ra-written prose. Converts
 * **bold** and *italic* to <strong>/<em>. Trusted content — briefs come
 * from our own repo — so no sanitisation beyond what React does.
 *
 * Handles: **bold**, *italic* (not nested, not crossing line breaks).
 * Everything else (links, code spans, block markdown) is out of scope
 * — extend here if Ra starts writing them.
 */
export function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  // Split on **bold** first; italic pattern runs on the non-bold fragments
  // so we don't incorrectly match the inner asterisks of **...**.
  const boldParts = text.split(/(\*\*[^*\n]+?\*\*)/g);

  return boldParts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Apply italic pattern to the non-bold fragment
    const italicParts = part.split(/(\*[^*\n]+?\*)/g);
    return (
      <React.Fragment key={i}>
        {italicParts.map((piece, j) => {
          if (piece.startsWith("*") && piece.endsWith("*")) {
            return (
              <em key={j} className="italic">
                {piece.slice(1, -1)}
              </em>
            );
          }
          return <React.Fragment key={j}>{piece}</React.Fragment>;
        })}
      </React.Fragment>
    );
  });
}
