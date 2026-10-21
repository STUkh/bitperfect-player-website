/* React 18's types predate `inert`, which React 18 itself renders as a plain
   string attribute. The mobile menu panel uses it to keep a closed panel out of
   the tab order, written `inert=""` exactly as the static HTML needs it. */
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    inert?: '' | undefined;
  }
}
