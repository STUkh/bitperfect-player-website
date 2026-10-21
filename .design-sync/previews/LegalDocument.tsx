import { LegalDocument } from '@bitperfect/website-ds';

/* A short excerpt of the Privacy Policy (src/PRIVACY_POLICY.md), as the
   rendered markdown arrives: `h2[id]` sections the index is built from. */
function Excerpt() {
  return (
    <>
      <p><strong>Effective date:</strong> August 5, 2026</p>
      <p><strong>Last updated:</strong> September 4, 2026</p>
      <p>
        This Privacy Policy describes what the Bitperfect Player app (“the App”) collects, why it collects it, and
        what control you have over your data. The terms governing your use of the App (including the subscription,
        the free trial, billing, cancellation and refunds) are a separate document: see the{' '}
        <a href="/terms">Terms of Use</a>.
      </p>
      <hr />
      <h2 id="1-summary-non-binding-the-full-sections-below-govern">1. Summary (non-binding: the full sections below govern)</h2>
      <ul>
        <li>The App is a local/network music player. Your music library, playback history, and settings stay on your device.</li>
        <li>
          The on-device AI audio enhancer processes audio <strong>entirely on your device</strong>. No audio is ever
          uploaded, streamed, or transmitted anywhere for enhancement.
        </li>
        <li>We do not require account creation or sign-in to use the App.</li>
      </ul>
      <h2 id="4-childrens-privacy">4. Children’s privacy</h2>
      <p>
        The App is not directed at children under 13 (or the equivalent minimum age in your jurisdiction) and we do
        not knowingly collect personal data from children. If you believe a child has provided us data through the
        App (e.g. via a crash report), contact us at the address above and we will delete it.
      </p>
      <h2 id="5-your-rights-and-choices">5. Your rights and choices</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete, restrict, or port data we hold
        about you, and to object to or withdraw consent for its processing. Because most App data lives only on your
        device and is never sent to us, most of these rights are exercised simply by using the in-app controls
        (deleting your library, revoking permissions, uninstalling the App) or by turning off crash reporting.
      </p>
    </>
  );
}

/* What `getHeadings()` returns for the excerpt: the index is built from it. */
const headings = [
  { depth: 2, slug: '1-summary-non-binding-the-full-sections-below-govern', text: '1. Summary (non-binding: the full sections below govern)' },
  { depth: 2, slug: '4-childrens-privacy', text: '4. Children’s privacy' },
  { depth: 2, slug: '5-your-rights-and-choices', text: '5. Your rights and choices' },
];

/* LegalLayout's frame: the page column, and `.prose-legal`, which styles the
   rendered markdown (headings, lists, rules) the document carries. */
function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl lg:max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="prose-legal">
        <header className="mb-10">
          <h1>Privacy Policy</h1>
        </header>
        {children}
      </article>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <Page>
      <LegalDocument headings={headings} source="src/PRIVACY_POLICY.md">
        <Excerpt />
      </LegalDocument>
    </Page>
  );
}

/* A source with a placeholder still in it shows the build-time banner. */
export function UnfilledPlaceholder() {
  return (
    <Page>
      <LegalDocument headings={headings} source="src/PRIVACY_POLICY.md" unresolved={['[LEGAL ENTITY NAME]']}>
        <Excerpt />
      </LegalDocument>
    </Page>
  );
}
