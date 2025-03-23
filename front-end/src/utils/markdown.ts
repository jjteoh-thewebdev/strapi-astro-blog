import { marked } from "marked";

/**
 * Convert md content to html
 * @param content
 * @param insertAsEmbedded - remain the formatting, insert like a fragment to element like div
 * @returns
 */
export const markdownify = (content: string, insertAsEmbedded = true) => {
  return insertAsEmbedded ? marked.parse(content) : marked.parseInline(content);
};
