import { PagerLink } from '@bitperfect/website-ds';

export function PrevAndNext() {
  return (
    <div className="bg-surface-base p-8">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6">
        <PagerLink direction="prev" href="#" label="Previous" title="AI Enhancer" />
        <PagerLink direction="next" href="#" label="Next" title="Parametric EQ" />
      </div>
    </div>
  );
}
