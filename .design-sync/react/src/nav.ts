// Stands in for src/utils/nav in the design build (build.mjs routes the
// components' import here). Links keep the site's paths; an image path is
// handed to asset(), because in Claude Design the images live beside the
// uploaded stylesheet, not at the site root.
import { withBase as siteWithBase } from '@site/utils/nav';
import { asset } from './asset';

export * from '@site/utils/nav';

const IMAGE = /^\/?(screens|img|brand|grounds)\//;

export function withBase(path: string): string {
  return IMAGE.test(path) ? asset(path) : siteWithBase(path);
}
