import type { ReactNode } from 'react';
import { clsx as cx } from 'clsx';
import Band from '../sections/Band';
import Button from '../primitives/Button';
import RuleList from '../sections/RuleList';
import { toneText, type Tone } from '../sections/bands';
import { site } from '../../data/site';
import { withBase } from '../../utils/nav';
import type { ClassProps } from '../_lib/class-props';

export interface AccountDeletionViewProps extends ClassProps {
  /** Target of the privacy policy link. Defaults to the site's `/privacy/`. */
  privacyHref?: string;
}

const MAIL_SUBJECT = 'Account and Data Deletion Request';
const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;

/** One way to delete the account: a lacquered card in its own tone, the dark one or the white one. */
function WayCard(props: { tone: Tone; kicker: string; title: string; lede: string; children: ReactNode }) {
  const { tone, kicker, title, lede, children } = props;
  const text = toneText[tone];
  return (
    <article
      className={cx(
        'lacquer flex flex-col rounded-card p-7 sm:p-9 lg:p-10',
        tone === 'ivory' && 'lacquer-ivory [--focus-ring-color:var(--color-band-gold-ink)]',
      )}
    >
      <span className={cx('mono-spec text-eyebrow font-medium tracking-label uppercase', text.accent)}>{kicker}</span>
      <h2 className={cx('mt-3 text-title-lg font-bold tracking-title text-balance', text.title)}>{title}</h2>
      <p className={cx('mt-3 text-body text-pretty', text.body)}>{lede}</p>
      <div className="mt-8 flex flex-1 flex-col">{children}</div>
    </article>
  );
}

/** A numbered step of the in-app path. */
function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4 border-t border-border-subtle py-4 last:border-b">
      <span className="mono-spec grid size-7 shrink-0 place-items-center rounded-full border border-gold/50 text-small font-semibold text-gold tabular-nums">
        {n}
      </span>
      <span className="pt-0.5 text-body font-semibold text-text-primary">{children}</span>
    </li>
  );
}

/**
 * The account deletion page under its PageHeader: the two ways to delete (in the app,
 * on a dark lacquer card; by email, on a white one, for anyone without the app),
 * then on an ivory band what goes and what is not touched.
 */
export function AccountDeletionView({ privacyHref = withBase('/privacy'), className }: AccountDeletionViewProps) {
  const ivory = toneText.ivory;
  return (
    <div className={className}>
      <Band space="compact" aria-label="Two ways to delete your account">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <WayCard
            tone="graphite"
            kicker="In the app · Immediate"
            title="Delete it in the app"
            lede="Your account and its backups are erased the moment you confirm."
          >
            <ol className="flex flex-col">
              <Step n={1}>Open Bitperfect Player</Step>
              <Step n={2}>Go to Settings → Account</Step>
              <Step n={3}>Tap Delete Account and confirm</Step>
            </ol>
          </WayCard>

          <WayCard
            tone="ivory"
            kicker="By email · No app needed"
            title="Ask us by email"
            lede="Uninstalled the app or lost the phone? Email us from the address you signed in with. We delete everything within 30 days."
          >
            <dl className={cx('grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t pt-5 text-body-sm', ivory.rule)}>
              <dt className={ivory.body}>To</dt>
              <dd className={cx('font-semibold break-all', ivory.title)}>{site.contactEmail}</dd>
              <dt className={ivory.body}>Subject</dt>
              <dd className={cx('font-semibold', ivory.title)}>{MAIL_SUBJECT}</dd>
            </dl>
            <Button href={mailto} className="mt-8 self-start lg:mt-auto">
              Write the email
            </Button>
          </WayCard>
        </div>
      </Band>

      <Band tone="ivory" ground="ground-halftone" className="border-t border-border-subtle">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="deleted-heading">
            <h2 id="deleted-heading" className={cx('text-section-sm font-bold text-balance', ivory.title)}>
              What we delete
            </h2>
            <RuleList
              tone="ivory"
              className="mt-6"
              itemClassName="py-5"
              titleClassName="text-body font-semibold tracking-title"
              bodyClassName="mt-1 text-small text-pretty"
              items={[
                { title: 'Your sign-in', body: 'Your account ID, email address and login records.' },
                { title: 'Your backups', body: 'Saved settings and EQ presets.' },
                { title: 'Your devices', body: 'Linked devices and sign-in sessions.' },
              ]}
            />
            <p className={cx('mt-5 text-small text-pretty', ivory.body)}>
              We keep one record that a free trial was used, so it cannot be claimed twice. It can't be used to
              contact you and is never used for marketing.
            </p>
          </section>

          <section aria-labelledby="kept-heading">
            <h2 id="kept-heading" className={cx('text-section-sm font-bold text-balance', ivory.title)}>
              What stays as it is
            </h2>
            <RuleList
              tone="ivory"
              className="mt-6"
              itemClassName="py-5"
              titleClassName="text-body font-semibold tracking-title"
              bodyClassName="mt-1 text-small text-pretty"
              items={[
                {
                  title: 'Your music',
                  body: 'Files, library and listening history live only on your phone. They never reach our servers.',
                },
                {
                  title: 'Your subscription',
                  body: 'Deleting the account does not cancel it. Cancel in Google Play under Payments & subscriptions.',
                },
              ]}
            />
            <p className={cx('mt-5 text-small text-pretty', ivory.body)}>
              More on what we store and why is in the{' '}
              <a
                href={privacyHref}
                className={cx('font-semibold underline underline-offset-2 focus-visible:focus-ring', ivory.accent)}
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>
        </div>
      </Band>
    </div>
  );
}

export default AccountDeletionView;
