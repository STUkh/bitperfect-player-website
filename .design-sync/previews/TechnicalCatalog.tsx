import { useEffect, useRef } from 'react';
import { TechnicalCatalog } from '@bitperfect/website-ds';

export function Default() {
  return <TechnicalCatalog id="all-capabilities" />;
}

/* The filter tabs are the component's own behaviour: one is clicked after mount. */
export function FilteredToDsp() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    root.current?.querySelector<HTMLButtonElement>('[data-filter="dsp"]')?.click();
  }, []);
  return (
    <div ref={root}>
      <TechnicalCatalog id="all-capabilities" />
    </div>
  );
}
