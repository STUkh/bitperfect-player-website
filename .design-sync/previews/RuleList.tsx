import { RuleList, Surface } from '@bitperfect/website-ds';

const items = [
  { title: 'No account needed', body: 'Your music, library and favourites stay on your phone.' },
  { title: 'No tracking', body: 'The app has no advertising ID and collects no play history.' },
  { title: 'AI runs on your phone', body: 'After a one-time model download, no audio is uploaded.' },
];

export function Stack() {
  return (
    <Surface tone="ivory" className="p-10">
      <RuleList
        tone="ivory"
        reveal={false}
        items={items}
        className="flex max-w-[420px] flex-col"
        itemClassName="py-5 lg:py-[26px]"
        titleClassName="text-base font-semibold tracking-[-0.01em] lg:text-[17px]"
        bodyClassName="mt-1.5 text-sm leading-[1.6] text-pretty lg:text-[15px]"
      />
    </Surface>
  );
}

export function Columns() {
  return (
    <Surface tone="ivory" className="p-10">
      <RuleList
        tone="ivory"
        layout="columns"
        reveal={false}
        items={items}
        className="lg:grid-cols-3"
        itemClassName="py-5 lg:pt-[34px] lg:pb-0"
        titleClassName="text-[17px] font-semibold tracking-[-0.01em] lg:text-[19px]"
        bodyClassName="mt-1.5 text-sm leading-[1.62] text-pretty lg:mt-2.5 lg:text-[15px]"
      />
    </Surface>
  );
}
