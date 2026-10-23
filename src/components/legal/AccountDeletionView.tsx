import { cn } from '../../utils/cn';
import { withBase } from '../../utils/nav';
import type { ClassProps } from '../_lib/class-props';

export interface AccountDeletionViewProps extends ClassProps {
  /** Target URL for the privacy policy link. Defaults to site base '/privacy'. */
  privacyHref?: string;
}

/**
 * AccountDeletionView displays the account and data deletion policy for
 * Bitperfect Player, detailing in-app deletion, email requests, and data scope.
 */
export function AccountDeletionView({
  privacyHref = withBase('/privacy'),
  className,
}: AccountDeletionViewProps) {
  return (
    <article
      className={cn(
        'mx-auto max-w-column space-y-12 lg:space-y-14 [&_p]:max-w-measure-legal',
        className,
      )}
    >
      {/* Overview */}
      <section id="overview">
        <h2 className="text-title-lg font-bold text-text-primary text-balance">
          Overview
        </h2>
        <div className="mt-4 space-y-4 text-body text-pretty text-text-secondary leading-relaxed">
          <p>
            This account and data deletion policy applies to{' '}
            <strong className="text-text-primary font-semibold">
              Bitperfect Player
            </strong>{' '}
            (package name{' '}
            <code className="font-mono text-gold bg-surface-base border border-border-subtle px-1.5 py-0.5 rounded text-small">
              com.bitperfect.player
            </code>
            ).
          </p>
          <p>
            Creating an account (via Google OAuth or email sign-in) is entirely
            optional. Bitperfect Player is designed to play your local lossless
            audio library directly to external USB DACs without requiring an
            account, sign-in, or internet connection.
          </p>
          <p>
            If you have created an account to sync equalizer presets or manage
            cloud settings, you have the right to delete your account and all
            associated data at any time.
          </p>
        </div>
      </section>

      {/* In-app account deletion */}
      <section
        id="in-app-deletion"
        className="border-t border-border-subtle pt-10 lg:pt-12"
      >
        <h2 className="text-title-lg font-bold text-text-primary text-balance">
          How to delete your account in the app (Immediate)
        </h2>
        <p className="mt-4 text-body text-pretty text-text-secondary leading-relaxed">
          If you have the app installed on your phone, you can delete
          your account and cloud data directly with immediate effect:
        </p>
        <ol className="mt-6 space-y-3.5 pl-6 list-decimal text-body text-pretty text-text-secondary leading-relaxed marker:font-bold marker:text-gold">
          <li className="pl-2">
            <strong className="text-text-primary font-semibold">
              Open Bitperfect Player.
            </strong>
          </li>
          <li className="pl-2">
            <strong className="text-text-primary font-semibold">
              Open Settings &rarr; Account.
            </strong>
          </li>
          <li className="pl-2">
            <strong className="text-text-primary font-semibold">
              Select &ldquo;Delete Account&rdquo; and confirm.
            </strong>{' '}
            All cloud records are permanently deleted immediately.
          </li>
        </ol>
      </section>

      {/* Web & Email deletion request */}
      <section
        id="email-deletion"
        className="border-t border-border-subtle pt-10 lg:pt-12"
      >
        <h2 className="text-title-lg font-bold text-text-primary text-balance">
          How to request deletion on the web / by email (No app required)
        </h2>
        <div className="mt-4 space-y-4 text-body text-pretty text-text-secondary leading-relaxed">
          <p>
            If you have uninstalled the app or don&apos;t have access to your
            device, you do not need to reinstall Bitperfect Player to delete
            your account. You can request deletion by email:
          </p>
          <div className="rounded-card border border-border-subtle bg-surface-raised/40 p-6 space-y-4">
            <p className="text-body font-semibold text-text-primary">
              Email deletion request details:
            </p>
            <ul className="space-y-3 text-body-sm text-text-secondary">
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <strong className="text-text-primary font-semibold shrink-0">
                  Recipient:
                </strong>
                <a
                  href="mailto:support@bit-perfect.com?subject=Account%20and%20Data%20Deletion%20Request"
                  className="font-mono text-gold hover:text-gold-light bg-surface-base border border-border-subtle px-1.5 py-0.5 rounded transition-colors duration-[var(--d-ui)] focus-visible:focus-ring inline-block"
                >
                  support@bit-perfect.com
                </a>
              </li>
              <li>
                <strong className="text-text-primary font-semibold">
                  Sender address:
                </strong>{' '}
                Send the email from the email address linked to your Google
                account.
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <strong className="text-text-primary font-semibold shrink-0">
                  Subject line:
                </strong>
                <code className="font-mono text-gold bg-surface-base border border-border-subtle px-1.5 py-0.5 rounded text-caption sm:text-small">
                  Account and Data Deletion Request
                </code>
              </li>
              <li>
                <strong className="text-text-primary font-semibold">
                  Turnaround time:
                </strong>{' '}
                <span>30 days.</span>{' '}
                <span className="text-text-tertiary">
                  Requests are verified and processed within 30 days.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data permanently deleted */}
      <section
        id="data-permanently-deleted"
        className="border-t border-border-subtle pt-10 lg:pt-12"
      >
        <h2 className="text-title-lg font-bold text-text-primary text-balance">
          What data is permanently deleted
        </h2>
        <p className="mt-4 text-body text-pretty text-text-secondary leading-relaxed">
          Upon processing an account deletion request (whether in-app or via
          email), the following data is permanently purged from our servers:
        </p>
        <ul className="mt-6 space-y-3 pl-6 list-disc text-body text-pretty text-text-secondary leading-relaxed marker:text-gold">
          <li className="pl-2">
            <strong className="text-text-primary font-semibold">
              OAuth ID and email address:
            </strong>{' '}
            Google OAuth account identifier, pseudonymous user IDs, profile email
            address, and authentication records.
          </li>
          <li className="pl-2">
            <strong className="text-text-primary font-semibold">
              EQ presets and app settings backups:
            </strong>{' '}
            Cloud backups of equalizer (EQ) presets and custom application
            settings.
          </li>
          <li className="pl-2">
            <strong className="text-text-primary font-semibold">
              Device records and synchronization tokens:
            </strong>{' '}
            Active registration records, session tokens, and device sync
            associations.
          </li>
        </ul>
        <div className="mt-6 rounded-card border border-border-subtle bg-surface-raised/40 p-4 sm:p-5 text-body text-pretty text-text-secondary leading-relaxed">
          <p>
            <strong className="text-text-primary font-semibold">
              Trial abuse and fraud prevention:
            </strong>{' '}
            To prevent repeated abuse of promotional trial offers, an
            irreversible record of trial eligibility is retained. This cannot be
            used to contact you and is never used for marketing.
          </p>
        </div>
      </section>

      {/* Data not stored or affected */}
      <section
        id="data-not-stored"
        className="border-t border-border-subtle pt-10 lg:pt-12"
      >
        <h2 className="text-title-lg font-bold text-text-primary text-balance">
          Data not stored or affected
        </h2>
        <div className="mt-4 space-y-4 text-body text-pretty text-text-secondary leading-relaxed">
          <p>
            Because Bitperfect Player prioritizes on-device processing and data
            minimization, please note how other data and services are handled:
          </p>
          <ul className="space-y-3 pl-6 list-disc text-body text-pretty text-text-secondary leading-relaxed marker:text-gold">
            <li className="pl-2">
              <strong className="text-text-primary font-semibold">
                Local music library (device-only):
              </strong>{' '}
              Local audio files, local music library database, and listening
              history never leave your device. These files are stored solely in
              your device&apos;s local storage and are never uploaded to or
              stored on our servers.
            </li>
            <li className="pl-2">
              <strong className="text-text-primary font-semibold">
                Google Play subscription cancellation:
              </strong>{' '}
              Deleting your account does not automatically cancel an active
              Google Play subscription. Subscriptions and recurring billing are
              managed exclusively by Google Play. Users must manage subscriptions
              in Google Play Store under{' '}
              <strong className="text-text-primary font-semibold">
                Payments &amp; subscriptions
              </strong>
              .
            </li>
          </ul>
          <p className="text-body-sm text-text-tertiary">
            Uninstalling the application or deleting your cloud account does not
            automatically stop recurring subscriptions managed by Google Play.
          </p>
        </div>
      </section>

      {/* Privacy Policy link */}
      <section
        id="privacy-policy"
        className="border-t border-border-subtle pt-10 lg:pt-12"
      >
        <h2 className="text-title-lg font-bold text-text-primary text-balance">
          Privacy policy
        </h2>
        <div className="mt-4 space-y-4 text-body text-pretty text-text-secondary leading-relaxed">
          <p>
            For more information on our data protection practices and personal
            data retention, visit our{' '}
            <a
              href={privacyHref}
              className="font-semibold text-gold underline underline-offset-2 transition-colors duration-[var(--d-ui)] hover:text-gold-light focus-visible:focus-ring"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </article>
  );
}

export default AccountDeletionView;
