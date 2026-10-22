import { flowBackgrounds } from '../data/flowBackgrounds';

/** Stable across server renders and reloads; theme does not participate in selection. */
export function chooseFlowSequence(pageKey: string, sectionKeys: readonly string[]) {
  let previous = -1;
  return sectionKeys.map((sectionKey) => {
    let hash = 2166136261;
    for (const character of `${pageKey}:${sectionKey}`) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
    let index = hash % flowBackgrounds.length;
    if (index === previous) index = (index + 1) % flowBackgrounds.length;
    previous = index;
    return flowBackgrounds[index].id;
  });
}
