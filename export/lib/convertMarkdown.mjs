import { htmlToBlocks } from "@sanity/block-tools";
import { JSDOM } from "jsdom";
import markdownit from "markdown-it";
const md = markdownit();

export function convertMarkdown(markdown, blockContentType){
  return htmlToBlocks(md.render(markdown), blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: [
      // Add a custom rule for handling images
      {
        deserialize(el, next, block) {
          if (el.tagName && el.tagName === "IMG") {
            return block({
              _type: "image",
              _sanityAsset: `image@${el.src}`,
              alt: el.alt || el.src.substring(el.src.lastIndexOf('/')+1),
            });
          }
          return undefined;
        },
      },
    ],
  })
}