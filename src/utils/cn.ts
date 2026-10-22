import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * tailwind-merge only knows Tailwind's default scale. Faced with a `text-*` or
 * `shadow-*` value it has never seen, it guesses "colour". So the site's own
 * type ramp (`text-body-sm`, `text-small`, `text-micro`...) was filed as a text
 * colour, and any later colour class deleted it: the md Button lost its
 * `text-body-sm` and rendered at the inherited size, and the hero's secondary
 * action lost `text-text-secondary` to its own `text-small`.
 *
 * These lists mirror the `--text-*`, `--shadow-*`, `--tracking-*` and
 * `--container-*` tokens in the `@theme` block of src/styles/global.css. A new
 * token in any of them goes here too.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display", "display-m", "headline-xl", "headline-xl-m", "headline", "headline-m",
        "headline-sm", "headline-sm-m", "section-lg", "section", "section-m", "section-sm",
        "title-lg", "title", "title-sm", "price", "price-sm", "lede", "lede-m", "body-lg",
        "body", "body-sm", "small", "small-m", "caption", "mono", "micro", "label",
        "overline", "device-label",
      ],
      shadow: ["card", "card-hover", "elevated", "float", "key", "key-hover", "device", "device-cast"],
      tracking: [
        "eyebrow", "eyebrow-sm", "label", "kicker", "micro", "micro-sm", "mono", "mono-sm",
        "tag", "title", "title-lg",
      ],
      container: [
        "measure", "measure-lede", "measure-short", "measure-card", "measure-legal",
        "column", "page-head", "pricing",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
