**Originally effective:** August 5, 2026

**Current version effective:** August 31, 2026

**Last updated:** August 31, 2026

This Privacy Policy explains how the Bitperfect Player Android app (the "App") and this
website handle data. The data controller is the individual or legal entity identified as the
developer in the App's live Google Play listing ("we", "us"). That listing contains the
controller's verified legal and geographic contact details. Privacy contact:
support@bit-perfect.com.

The [Terms of Use](/terms) separately govern the subscription, trial, billing, cancellation,
refunds, licence, and limits of the service.

---

## 1. Summary

- The music-library database, playback history, playlists, favorites, settings, and AI audio
  processing remain on your device. Limited search terms leave the device only when an
  online lookup described below is used.
- Production crash and reliability reporting is enabled by default and can be turned off in
  Settings → About → "Crash debug info."
- Network-source credentials are encrypted in App storage using Android Keystore-backed
  encryption. Whether key material is hardware-backed depends on the device. The App does
  not intentionally route those credentials to us; they are used to contact the source you
  configure. Section 2.1 explains the residual risk of accidental diagnostic inclusion.
- AI inference runs on your device. Licence verification and protected AI-model downloads
  use the network but do not send your audio or audio-derived model inputs or outputs.
- We do not run ads, sell personal data, use advertising identifiers, or use diagnostic
  session and breadcrumb data for advertising, listening profiles, or general product-
  behavior analytics.
- No registration account, name, email, or password is required. The App does create a
  persistent **pseudonymous installation identifier** for entitlement and abuse prevention.

## 2. Data handled by the App and website

### 2.1 Crash, reliability, and manual bug-report data

The current Google Play production build uses **Sentry** for crash and reliability
reporting. Reporting starts enabled by default and may send:

- errors, stack traces, native crash information, and limited performance information;
- App version, build type, installer source, session information, and recent in-App
  breadcrumbs;
- manufacturer, model, Android version, memory, screen configuration, and CPU-load data;
- a diagnostic snapshot limited to audio-output and App-configuration fields; and
- ordinary network-request data, including an IP address visible to Sentry and network
  providers.

We do not intentionally attach your name, email, advertising ID, Android location data, a
screenshot, network credential, or pseudonymous subscription identifier to a Sentry event.
Breadcrumbs and logs can contain screen names, actions, errors, URLs, server or connected-
device labels, media metadata, file names, or paths generated during operation. We attempt
to remove common Android storage paths, but automated redaction cannot guarantee removal of
every user-entered or device-generated sensitive string.

If you choose \"Send bug report\", the App sends a compressed attachment to Sentry. It can
include two rotating App-log files, a current system-log snapshot filtered to the App
process, device and build information, and any optional description you enter. Leaving the
description blank can still send the technical attachment. Do not enter secrets in the
description.

Purpose: diagnose crashes, freezes, compatibility problems, and serious reliability faults;
protect service quality; and respond to a report you initiate. Sentry processes this data on
our behalf under its service terms. See [Sentry's Privacy Policy](https://sentry.io/privacy/).

Turn future reporting off in Settings → About → \"Crash debug info.\" Turning it off does
not delete an event already sent. Session and breadcrumb data are used for diagnosis, not
advertising, listening profiles, or general product-behavior analytics.

### 2.2 Music library and local App data

The App scans the audio locations and network sources you authorize and stores track
metadata, embedded artwork, file locations, playlists, favorites, playback history, analysis
results, and settings in its private local database or App storage. We do not operate a
cloud backup for this database and do not receive its full contents.

Clearing App data or uninstalling normally removes the private App database and local
caches. It does not delete your original music files unless you separately confirm a delete
action, and it cannot delete copies held by a store, source, cast target, Android, or another
provider. Exported files and data written to a music file or user-selected location remain
until deleted there.

Specific artist, album, track, or headphone terms can be sent to third parties when you use
the lookup features in Sections 2.6 and 2.7. That limited disclosure does not upload the
local database or playback history.

### 2.3 Network sources and credentials

If you enter a credential for a source such as FTP, SFTP, WebDAV, SMB, LMS, or another
supported server, the App encrypts it in private App storage using a key managed through
Android Keystore. Android does not guarantee hardware-backed key storage on every device.
The App does not intentionally route the credential to us; it sends it to the server or
device you configure using the selected protocol. A credential could nevertheless appear
in user-entered support text or an unexpected diagnostic string, subject to the warnings
and controls in Sections 2.1 and 2.10.

Protocol and server security are your choice. Plain FTP and some server configurations may
transmit credentials, metadata, or content without transport encryption. Use an encrypted
protocol and a trusted network where available. A server, VPN, router, DNS provider, or
network operator can process connection data under its own terms.

### 2.4 On-device AI and protected model delivery

The App performs AI audio inference on the device. It does not send audio, audio-derived
model inputs, or model outputs to us or to a service provider for AI inference.

This does not mean model delivery is offline. To authorize a protected model download, the
App uses the subscription, integrity, verification, and content-delivery services described
in Section 2.9. Those requests contain licence and technical security data, not audio. The
model file itself is downloaded to App storage and may be deleted by clearing App data,
uninstalling, or Android storage management.

### 2.5 Casting, receiving, and online streams

For a local-source cast, the App sends the target track metadata and a temporary
local-network media URL so the target can fetch the audio. If you cast an online radio,
plugin, or other remote stream, the target may receive the remote stream URL and contact
that source directly. A receiving mode lets another device send a media URL or stream to the
App.

We do not route cast audio or metadata through a Bitperfect-operated media relay. Your cast
target, remote source, plugin, router, VPN, and network provider may process IP addresses,
metadata, media URLs, and request data under their own policies.

### 2.6 Artist photos and album-art searches

Artist-photo fetching is enabled by default. When enabled, the App sends a normalized artist
name to **Wikidata**, **Wikimedia Commons**, and, if needed, **Deezer** to request an image.
You can turn automatic artist-image fetching off in Settings.

Album-art search occurs when you choose to update artwork. It can send the artist and album
search terms to **Apple/iTunes Search**, **Deezer**, **MusicBrainz**, and **Cover Art
Archive**. These providers receive the query plus ordinary request data such as IP address,
user-agent, and request time and process it under their own policies. We do not receive those
lookup requests and do not send them audio files or playback history.

### 2.7 Lyrics, headphone profiles, radio, and user-selected online content

When you request online lyrics, the App can send track title, artist, album, duration, or a
search phrase to **LRCLIB**. When you browse or apply an online headphone correction profile,
the App contacts **AutoEq** and can send the selected headphone, measurement, and target
parameters. When you play an internet-radio station, plugin stream, or URL you select, the
App or cast target contacts that source and necessarily discloses ordinary network data.

These are user-requested feature connections. The external provider, not us, controls its
response, logs, retention, and own data use. Do not put personal or secret information into
a public catalog search field.

### 2.8 Plugins are separate apps

A plugin is separately installed software with its own developer, permissions, terms, and
privacy practices. The App limits the plugin interface and does not carry raw audio across
that interface, but a plugin can return metadata, artwork URLs, or stream URLs and can
contact its own provider. This policy does not cover a third-party plugin's independent data
handling. Review it before installation.

### 2.9 Subscription verification, installation integrity, and model access

No registration account is required, but the App creates a cryptographic installation key
in Android Keystore and derives a persistent pseudonymous identifier from its public key.
The identifier is not your name, email, advertising ID, or Google password, but it can link
verification and subscription events from the same App installation and is therefore treated
as personal data where applicable.

The following data may be processed to verify access, prevent fraud and replay, and authorize
protected model downloads:

- the pseudonymous installation identifier, installation public key, and a per-request
  cryptographic signature;
- App package name, one-time nonce or request hash, request time, and requested model file;
- a Google Play Integrity token and the resulting App, licence, account, and device-integrity
  verdicts;
- Google Play purchase and entitlement information, including product, status, expiry, and
  renewal state; and
- IP address, user-agent, request identifiers, timing, rate-limit events, and other ordinary
  security and network logs visible to the involved providers.

**Google Play** processes the purchase. **RevenueCat** processes the pseudonymous identifier
and purchase-entitlement history for subscription management. **Google Play Integrity** and
our verification service hosted on **Google Cloud** evaluate App, licence, and device
integrity. **Cloudflare** authorizes and delivers protected model files. Their current
privacy notices are available at [Google](https://policies.google.com/privacy),
[RevenueCat](https://www.revenuecat.com/privacy/), and
[Cloudflare](https://www.cloudflare.com/privacypolicy/).

The verification service stores a hash of a successfully used integrity token with a
10-minute expiry marker to prevent replay; infrastructure deletion can occur asynchronously.
A model-access token expires within 15 minutes and no later than the entitlement that
justified it. Positive server-side entitlement results are cached for no more than 60
seconds. The signed on-device entitlement cache can support offline use for no more than 14
days after successful verification. Security and request logs are retained according to the
minimum period reasonably needed for abuse prevention, incident investigation, service
operation, and legal obligations; provider security logs may follow the provider's own
retention policy.

### 2.10 Website visits and support email

This is a static website delivered through **GitHub Pages**. We do not place first-party
advertising or analytics scripts, tracking pixels, forms, or cookies on it. GitHub and
network providers necessarily receive the requested URL, IP address, browser and device
headers, request time, and security logs to deliver and protect the site. See the
[GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

If you email support, we and our email provider process your address, message, attachments,
and related headers to answer, investigate, prevent abuse, keep a support record, and meet
legal obligations. Email is not a secure channel for passwords, payment-card data, private
keys, or network credentials; do not send them.

### 2.11 Data we do not use for monetization

The App does not request Android's location permission or intentionally read GPS or
operating-system location data. IP addresses visible to network providers can still reveal
an approximate region. The App does not request contacts, calendar, biometric data, or an
advertising identifier. It does not run ads, sell personal data, or share personal data for
another party's targeted advertising or marketing. We do not build a listening profile for
advertising.

This section is not a claim that no data ever leaves the device. The operational and
user-requested flows are disclosed in Sections 2.1 through 2.10.

## 3. Android permissions and access

Permissions and system capabilities depend on Android version and the feature used:

| Permission or capability | Purpose |
|---|---|
| Internet, network state, Wi-Fi state, and Wi-Fi multicast | Remote services in Section 2, network sources, LAN discovery, casting, streams, verification, and downloads. |
| Audio/media files or legacy storage | Find, read, play, edit, or delete audio only within the access Android grants and actions you select. |
| Notifications | Show playback controls and required foreground-operation status. |
| Foreground service | Keep active playback, connected-device work, casting, and visible model or analysis work running as Android permits. |
| Bluetooth connect | Read information about a connected Bluetooth audio route and codec for the fidelity display. |
| Wake lock | Reduce playback interruption while audio is active. |
| Battery-optimization exemption | Optional system request intended to reduce background interruption during active playback. |
| USB device access | Communicate with a USB audio device after the Android USB permission prompt. |

Declining a permission disables or limits the feature that needs it. Because the whole App
also requires a verified subscription, declining a permission does not create a free or
reduced tier.

## 4. Purposes and legal bases

Where GDPR, UK GDPR, or similar law applies, we rely on the following legal bases:

| Processing | Purpose | Legal basis |
|---|---|---|
| Subscription purchase status, restoration, and ordinary model delivery | Provide the paid App access and download the user requests | Performance of the subscription contract |
| Installation identity, integrity verdicts, replay prevention, rate limits, and security logs | Prevent fraud, protect licensed assets, users, providers, and infrastructure | Legitimate interests in security, abuse prevention, and enforcing the licence; legal obligation where applicable |
| Crash and reliability reporting | Diagnose failures and maintain a reliable, compatible product | Legitimate interests in reliability and security; you can object by turning reporting off |
| Automatic artist-photo lookup | Display expected library artwork without uploading the library database | Legitimate interests in product functionality and presentation; you can object by turning artist-image fetching off |
| Manual artwork, lyrics, headphone profiles, casting, network sources, streams, and downloads | Perform the feature or connection you select | Performance of the subscription contract or steps you request |
| Support email | Answer and document your request and prevent support abuse | Performance of the subscription contract where the request concerns access or support; otherwise legitimate interests in support and defence of claims |
| Required records, lawful requests, disputes, and enforcement | Comply with law and establish, exercise, or defend claims | Legal obligation or legitimate interests in legal claims, depending on the record |

We do not use consent as a basis where the processing is necessary to perform the
subscription. Withdrawing consent affects future consent-based processing, not processing
that was lawful before withdrawal.

## 5. Retention

- Local App data remains until you delete it, clear App storage, or uninstall, subject to any
  file or export you intentionally save elsewhere.
- Sentry diagnostic events are retained for up to 90 days under the current project
  configuration. We may configure a shorter period. Sentry may retain separate service and
  security logs under its own policy. A verified deletion request can shorten retention
  unless a lawful exception applies.
- The pseudonymous subscription customer and purchase-entitlement record remains while
  needed to provide or restore the subscription and until a verified deletion request is
  completed, except for transaction, fraud, accounting, dispute, or store-reconciliation
  records that law or a live claim requires us or a provider to retain.
- Short-lived verification records and caches use the fixed periods in Section 2.9.
- Support correspondence remains until the issue and reasonable follow-up are complete, and
  longer only where needed for abuse prevention, legal compliance, or an existing or
  reasonably anticipated claim.
- External catalogs, sources, hosting, network, and independent service providers apply
  their own retention policies to data they receive directly.

Where no fixed period applies, deletion is tied to the end of the stated purpose, the
verified request process, resolution of a security or legal matter, and expiry of mandatory
record-keeping.

## 6. Automated access decisions

Licence and integrity checks are automated security controls selected by us. They use the
entitlement, installation proof, App recognition, account licensing, device-integrity,
freshness, replay, and rate-limit signals described above to return licensed, rejected,
rate-limited, or temporarily unavailable. The result can lock the App or refuse a protected
model download.

These checks are not used for advertising or listening-profile scoring. If you believe a
valid purchase was rejected, contact support@bit-perfect.com with the time, App version,
device model, and non-secret error shown by the App. A person can review the available
entitlement and verification outcome, help correct an account or installation mismatch,
request a restore through Google Play, and investigate a false rejection. We cannot grant
access without a verifiable active entitlement and security result, but this does not limit
any right applicable law gives you concerning a solely automated decision or paid access.

## 7. Your rights and choices

Depending on applicable law, you may have rights to access, correct, delete, restrict, or
port personal data, object to processing based on legitimate interests, withdraw consent,
and complain to a data-protection authority. You may complain to the supervisory authority
where you live or work or where you believe an infringement occurred.

Most library and listening data is only on your device. Use App controls, revoke Android
permissions, clear App data, delete exported data at its location, or uninstall to control
it. Turn off future crash reporting in Settings.

For server-side pseudonymous records, diagnostics, or support email, contact
support@bit-perfect.com. Include enough non-secret detail to locate the record. We may need
to verify that a request relates to your installation or correspondence. Because the App has
no name-based account and intentionally avoids directly identifying you, we may be unable to
link a person to a particular pseudonymous or crash record; we will explain that result and
any lawful retention or refusal. Store transaction records must be requested from Google
Play where it controls them.

We respond within the period required by applicable law. Exercising a privacy right does not
cancel a Google Play subscription; cancel it separately in Google Play.

## 8. International processing and service providers

The providers named in Section 2 can process data in the European Economic Area, the United
States, and other countries where they or their subprocessors operate. Those countries may
have different privacy laws. Where GDPR or UK GDPR restricts a transfer to a provider, the
transfer is covered, as applicable, by an adequacy decision or by standard contractual
clauses incorporated into the provider's accepted data-processing terms, together with
supplementary security measures where required. You may contact us for information about
the mechanism relevant to a particular provider.

Third-party catalogs, servers, plugins, radio providers, cast targets, and URLs you choose
can receive data directly from your device and act under their own privacy terms; we do not
control their processing.

## 9. Security

We use reasonable technical and organizational measures appropriate to the limited data we
handle, including Android Keystore-backed credential encryption, signed installation proofs,
short-lived model-access tokens, replay protection, rate limits, access controls, and TLS for
requests to services we operate.

No storage or transmission method is completely secure. We cannot guarantee a third-party
server, plugin, device, network, protocol, email provider, or user configuration. Plain or
misconfigured network protocols can expose data despite local credential encryption.

## 10. Children's privacy

The App is not directed to children under 13 or the higher minimum age applicable to the
service in their country. We do not knowingly request a child's name or contact details. If
you believe a child sent personal data in a diagnostic report or support message, contact us
so we can assess and delete it where required.

## 11. Changes to this Policy

We may update this Policy when the App, website, providers, or legal requirements change.
The "Last updated" date identifies the current version. Material changes will receive any
additional notice or consent required by applicable law or platform policy before the new
purpose or consent-based processing applies.

Continued use is not treated as consent where law requires an affirmative choice. A policy
update does not retroactively make an incompatible earlier use of data lawful.

## 12. Contact

Privacy questions and rights requests: **support@bit-perfect.com**.

For the controller's verified legal and geographic details, see the developer-contact
section of the App's live Google Play listing. For subscription terms, see the
[Terms of Use](/terms).
