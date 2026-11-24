**Effective date:** August 5, 2026

**Last updated:** November 24, 2026

This Privacy Policy describes what the Bitperfect Player app ("the App") collects, why it
collects it, and what control you have over your data. The terms governing your use of the
App (including the subscription, the free trial, billing, cancellation and refunds) are a
separate document: see the [Terms of Use](/terms/).

Contact: support@bit-perfect.com

---

## 1. Summary (non-binding: the full sections below govern)

- The App is a local/network music player. Your music library, playback
  history, and settings stay on your device.
- We use a third-party crash-reporting service to receive technical
  diagnostic reports when the App crashes or hits an internal error. This is
  **on by default** and can be turned off at any time in Settings → About →
  "Crash debug info."
- Network-source credentials (FTP/WebDAV/SMB/DLNA logins you enter) are
  stored **encrypted on this device only** (using platform-native, hardware-backed
  encryption) and are **never transmitted to us**. They go only to the server you
  configured them for.
- The on-device AI audio enhancer processes audio **entirely on your device**.
  No audio is ever uploaded, streamed, or transmitted anywhere for
  enhancement.
- We do not run ads and do not use any third-party analytics or advertising
  SDK beyond the crash-reporting described below.
- Artwork, song lyrics and headphone correction profiles are fetched from
  public, third-party providers as you use those features. These are
  retrievals into your device, not uploads of your library.
- You sign in with a Google account, or with your email address and a one-time code
  sent to it, before you first use the App. We keep a pseudonymous account record and
  the contact email address of your account, so that your subscription, free trial and
  promotional access work on all your devices, and a backup of your App settings and EQ
  presets. We do not store your name. We use your email address only for account and
  service messages. Section 2.11 describes what we store and how to delete your account.
- An active subscription registers your App installations: five with the base
  subscription, or 10, 15, or 20 with active device-capacity packs. A secure device
  registry hosted in the European Union holds pseudonymous device verification
  records (including device label, registration and verification dates, and
  authorization status). An authorized installation can see sibling device labels
  and last-verification dates to manage old installations.
- Promotional links and referral codes are stored locally on your device;
  when you tap Apply, the App sends the code, a pseudonymous installation identifier,
  and a signature to our verification server (verify.bit-perfect.com, operated on
  Cloudflare) to validate the code and prevent abuse. No advertising identifiers are
  used, and promotional data is never sold or used for advertising.

## 2. What we collect and why

### 2.1 Crash and diagnostic data

When crash reporting is enabled (default: on), we automatically receive a
diagnostic event (when the App crashes, when it encounters an internal
error it flags for reporting, or when you manually send a bug report via
Settings → About → "Send bug report") containing some or all of:

- Stack traces and error messages (from the application logic, UI, and audio/network engine).
- Device information: manufacturer, model, OS version, available memory,
  screen configuration.
- App information: version, build type, session length up to the crash.
- Breadcrumbs: a short trail of recent in-app navigation/events leading up
  to the crash. File paths and similar potentially sensitive strings are
  scrubbed or anonymized where feasible before they are sent.
- Your device's IP address, which our crash-reporting provider may log as
  part of standard network request handling. We do not use IP address for
  identification or tracking purposes ourselves.
- If you use the in-app "Send bug report" feature, the report includes the
  App's own recent diagnostic logs and a snapshot of the device's system log
  filtered to this App's process, with file paths scrubbed, so we can
  reproduce the issue, not just the optional text field. If you choose to
  describe the issue in the provided text field, that description is sent to
  our crash-reporting provider attached to the same event. The description
  field is optional: leaving it blank still sends the logs.
- If you choose "Send feedback & continue" before cancelling a subscription,
  we send your selected reason and optional, bounded comment to our crash-reporting
  provider as user-initiated feedback. We do not add your account, purchase,
  installation, or device identifier to this feedback. Choosing "Continue
  without feedback" sends no survey feedback and opens cancellation in the
  store.

We consider stack traces, breadcrumbs, device identifiers, and IP address to
be personal data under GDPR/UK GDPR and similar frameworks, and we treat them
that way even though no name, email, or account identifier is attached.

**Data processor:** a third-party crash-reporting service, with
infrastructure for this App hosted in the European Union, acts as our data
processor for this data.

**Retention:** diagnostic events are retained per our crash-reporting plan's
data retention setting (typically on the order of 90 days), after which they
are automatically deleted by the provider.

**Turning it off:** Settings → About → "Crash debug info" toggle. Turning
this off stops all future diagnostic events from being sent. It does not
retroactively delete events already sent (see Section 5 for how to request
deletion).

**We do not** currently collect any other analytics, usage statistics,
telemetry, or behavioral tracking of any kind. If that changes in a future
version, this policy will be updated first and, where required by law or
platform policy, we will ask for your consent before the change takes effect.

### 2.2 Music library data

Your music library (track metadata: title, artist, album, genre, embedded
artwork, file paths, playback history, favorites, playlists) is scanned
from your device's storage and/or the network sources you configure, and is
stored **only in a local database on your device**. It is never transmitted
to us. Uninstalling the App or clearing its data deletes this information.

### 2.3 Network-source credentials

If you add a network source (FTP, WebDAV, SMB, or a DLNA/UPnP device) and
provide a username/password, that credential is stored using platform-native,
hardware-backed encrypted storage **on your device only**. It is transmitted
only to the server/device you configured it for, using the protocol you selected,
and is never sent to us or to any third party we control.

Some network protocols the App supports (e.g. FTP, WebDAV to a server you
specify) may transmit data unencrypted over your local network, depending on
how the server you're connecting to is configured. This is a property of
the protocol and the server, not something the App adds; encrypted variants
(FTPS, HTTPS-based WebDAV) are supported where the server offers them and we
recommend using them. You are responsible for the security configuration of
any server you choose to connect the App to.

### 2.4 AI audio enhancer

The AI enhancer runs entirely on-device using local hardware processing.
No audio data, model input, or model output is ever uploaded, streamed, or
transmitted off your device for this feature, under any circumstance.

### 2.5 Casting and receiving (DLNA / UPnP)

When you cast to a device on your local network, track metadata and a
temporary local-network media URL are sent to that device so it can fetch
and play the audio. This communication stays on your local network between
your phone and the cast target; it is not routed through us or any server we
operate.

The App can also act as a DLNA/UPnP renderer and FCast receiver, letting
other devices on your local network cast audio _to_ your phone. Like
outbound casting, this traffic stays on your local network and is not
routed through us.

### 2.6 Artist and album artwork lookups

By default, the App looks up artist and album artwork for the tracks in
your library from public, third-party artwork/metadata catalogs. This is a
retrieval, not a collection: the App is pulling public images into your
device, not sending your library or any personal data out. The only
information involved is the artist/album name being looked up and your
device's IP address, which any standard HTTP request inherently includes and
which we do not receive, log, or retain ourselves. This lookup is **on by
default** and can be turned off in Settings (library/appearance settings,
artist-image fetching). No other information about you or your library is
sent as part of this lookup.

### 2.7 Lyrics and headphone correction profiles

The App can show song lyrics for what you are playing, and can apply a
correction profile for your headphone model. Both are retrieved from public,
third-party lyrics and headphone-profile providers, and both are tied to a
feature you use: lyrics are looked up for the track in front of you, and a
headphone profile is looked up when you search the catalog for your model.
Neither is a sweep of your library.

Like the artwork lookup in 2.6, this is a retrieval, not a collection. The
only information involved is the thing being looked up (a track's title,
artist and album, or a headphone model name) and your device's IP address,
which any standard HTTP request inherently includes and which we do not
receive, log, or retain ourselves. No account, identifier, playback history
or audio of yours is sent with the request, and a downloaded profile is
cached on your device so the same lookup is not repeated.

These providers are independent services with their own data practices. We
do not control them, and we receive nothing back about you from them.

### 2.8 Plugins (separate apps)

The App supports an optional plugin architecture where plugins are
**separate, independently-installed applications or plugins** (e.g. streaming-source plugins)
that communicate with the App over a restricted, signature-verified interface.
Plugins can return track metadata, stream URLs, or cover-art URLs to
the App. They never receive your raw audio, and audio never crosses
this boundary in either direction.

**Plugins are not covered by this policy.** Each plugin is its own
application with its own developer, its own permissions, and, if it
contacts any external service (e.g. a streaming provider's API), its own
data practices. Review a plugin's own privacy policy and permissions before
installing it. We are not responsible for data practices of third-party
plugins.

### 2.9 What we do NOT collect

We do not collect, and the App does not request: your name, phone number, precise or
approximate location, contacts, calendar,
photos/videos outside the music-library scan scope you grant, biometric
data, or any advertising identifier. We do not run any advertising SDK. We
do not sell personal data, and we do not share personal data with third
parties for their own marketing or advertising purposes. The outbound data
flows are the feature and service flows disclosed in this Section 2: crash reporting
in 2.1, artwork lookups in 2.6, the lyrics and headphone-profile lookups in 2.7,
subscription verification and protected-component delivery in 2.10, sign-in emails and
the contact address in 2.11, and promotional code verification in 2.12. Your email address
is the one contact detail we store; Section 2.11 states how. They exist to operate features you use, not to monetize your data,
and no recipient receives the data for its own advertising as far as its published
terms describe.

### 2.10 Purchases, installation verification, and device registration

The App is a subscription app, and the subscription is purchased **in-app** through the
store. The commercial terms (price, free trial, renewal, cancellation, refunds, and
device limits) are in the [Terms of Use](/terms/). What follows is what happens
to your data when the App verifies that access.

- **Payment is processed entirely by the store.** We never receive or store your card
  number, billing address, or payment identity. The store's own privacy policy governs
  the payment transaction.
- **Subscription management (RevenueCat).** RevenueCat, Inc., a subscription-management
  service based in the United States, reports whether your subscription is active, in a
  trial, or due to renew. It receives the store's purchase record and a random identifier
  generated for your installation, which is not derived from your device's hardware or
  advertising identifiers, and the pseudonymous account identifier described in Section
  2.11. It receives no name, contact details or music library data. See RevenueCat's
  [privacy policy](https://www.revenuecat.com/privacy).
- **Installation verification and version checks.** The platform's integrity service checks that the
  installed App and device meet release security requirements. Our verification service
  receives the verification result, app client version, and device details needed to confirm
  authorization and ensure minimum version compatibility. If an installed client is outdated
  or deprecated, access or license verification may be refused until the latest version is
  installed from the app store. We do not receive your store account name, password, card details,
  or advertising ID.
- **Device registry.** To enforce the personal device limit (five installations with the
  base subscription, or 10, 15, or 20 with active device-capacity packs) and let you
  remove old installations, a secure device registry hosted in the European Union
  maintains pseudonymous records for your subscription. These records include device
  labels (such as manufacturer and model), registration dates, last-verification dates,
  authorization expiry, and a temporary deactivation marker when an installation is
  removed. These values contain no personal identity, store credentials, payment details,
  or music library data. An authorized device can view registered device labels and
  last-verification dates to manage old installations and remove them when needed. The
  service never stores your payment data, store account credentials, library content, or
  listening history.
- **Location and retention.** The device registry is hosted in the European Union. Active
  records are scheduled for automatic deletion after authorization expires. Removing an
  installation makes it inactive immediately and retains a deactivation marker for up to
  90 days to prevent unauthorized re-registration. An authorization already held offline
  on that device can remain usable for no longer than 14 days as explained in the Terms.
- **On the device.** A signed authorization record is stored locally so the App keeps
  working offline; it contains no payment details.
- **Your subscription follows your account.** A subscription bought on one device is
  available on your other devices after you sign in with the same Google account, within
  the device limit above. Cancelling happens in your store account. Deleting your account
  does not cancel a subscription.

### 2.11 Your account

You sign in before you first use the App, in one of two ways:

- **Google.** Sign in with a Google account.
- **Email address.** Enter your email address. The App sends a 6-digit sign-in code to it,
  and you enter the code in the App. Email sign-in is not offered on Android TV.

Installations that already had access before sign-in was introduced keep working without it.
On a device without Google Play services, the App shows a short code, and you sign in with it
on another device.

At Google sign-in, the App sends the sign-in token from Google to our verification service.
At email sign-in, the App sends your address to our verification service, and the code is sent
to your address by email through Cloudflare Email Service. We check the token or the code and keep:

- **A pseudonymous account identifier.** This is a one-way keyed hash of the identifier Google
  gives your account, or, for email sign-in, of your email address. We do not store your name.
- **A contact email address.** When Google reports your Google address as verified, or when you
  confirm an email sign-in, we store that address with your account. We use it only for account
  and service messages: sign-in codes, and notices about your account and subscription. We do not
  send newsletters or marketing, we do not sell the address, and we do not share it except with
  our processor, Cloudflare. Our service does not write the address to its logs. The App shows it to you
  so that you can see which account is signed in.
- **Sign-in identifier hashes.** A one-way keyed hash of your normalized email address, and a
  one-way keyed hash of your Google account identifier. A matching hash links an email sign-in and
  a Google sign-in to the same account. A Google address links only when Google verifies it and it
  is a Gmail or Google Workspace address.
- **Sign-in codes.** An email sign-in code is valid for 10 minutes. We store only a keyed hash of
  the code. We delete the code after it is used or when it expires.
- **Abuse-protection counters.** To limit the sign-in codes sent and the wrong code attempts, we
  count them per email address and per device, and under abuse pressure also per network address.
  The counters hold keyed hashes of these values, for the current UTC day only.
- **The link between your account and your installations,** so that your subscription,
  free trial or promotional access works on each installation where you sign in.
- **A backup of your settings.** While you are signed in, the App backs up its settings and
  your EQ presets, with the name of the device that made the backup, so that another
  installation can restore them. Before a restore replaces your settings, the App keeps a
  copy of them on the device. Your music files, library, playback history and favourites
  are never part of a backup.
- **Free-trial records.** If you start a free trial, we keep a one-way keyed hash of your
  account identifier and of a device identifier that the system gives the App, with the
  trial end date, so that a free trial is used once per account and once per device.

**Retention.** Installation links and the settings backup are deleted automatically 400
days after their last use. The device trial record is deleted after 400 days. The account
trial record, and the pseudonymous account identifier on a promotional voucher you
redeemed, are kept to prevent repeated trials and repeated voucher use. Your contact email
address is deleted when the account has no installations left (checked by a daily cleanup)
and when you delete your account. The sign-in identifier hashes are kept until you delete
your account. Sign-in codes are deleted after use or when they expire. Abuse-protection
counters are kept for the current UTC day only.

**Deleting your account.** In the App: Settings → Account → Delete account, or on the
subscription screen: Sign out → Delete account. Without the App: on our
[account deletion page](/delete-account/). Deletion removes your installation links, your
settings backup, your contact email address, your sign-in identifier hashes, and the
free-trial and promotional access of your account. It does not cancel a store subscription.
The trial records described above stay, so a free trial cannot be claimed twice.

We do not sell account data or use it for advertising.

### 2.12 Promotional codes and referral links

When you open a promotional link or install the App from a referral link, the App reads the campaign code from the link or from the Google Play Install Referrer. The App does not send anything when you open a link or install it: the campaign code is stored locally on your device as a pending promotional code until you decide to use it.

When you tap Apply in the promotional offer sheet, the App sends the campaign code, a pseudonymous installation identifier (a randomly generated key pair unique to your installation, not tied to your hardware or advertising ID), and a cryptographic signature to our verification server (`verify.bit-perfect.com`, operated on Cloudflare) to check the validity of the code and prevent abuse.

- **Data processed:** We keep campaign codes and, for single-use vouchers, a cryptographic hash of the voucher code together with your pseudonymous installation identifier, your pseudonymous account identifier (Section 2.11) and the redemption timestamp to enforce one-time use and prevent abuse. A single-use voucher needs a signed-in account.
- **No advertising use, not sold, not shared:** We do not use promotional data for advertising or tracking, we never sell it, and we do not share it with third parties except our service providers who operate the redemption flow: Cloudflare (hosting and edge verification), RevenueCat (for granting subscription access or entitlements where applicable), and Google Play (for applying promotional discounts to in-app purchases).
- **Retention:** Promotional campaign records and voucher redemption records are retained for the active life of the campaign plus the period needed for fraud prevention, abuse detection, and accounting.

## 3. Permissions the App requests, and why

Permissions requested by the App depend on the platform and the features you use:

| Permission                                                              | Why                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Notifications (`POST_NOTIFICATIONS`)                                    | To show the required persistent playback-controls notification while music plays in the background (standard Android media-app requirement).                                                                                                                                                                         |
| Audio/media files (`READ_MEDIA_AUDIO` or legacy storage)                | To find and play your local music files.                                                                                                                                                                                                                                                                             |
| Bluetooth (`BLUETOOTH_CONNECT`)                                         | To detect and report the actual Bluetooth audio codec in use for connected headphones and speakers, for the fidelity display.                                                                                                                                                                                        |
| Battery optimization exemption (`REQUEST_IGNORE_BATTERY_OPTIMIZATIONS`) | Bit-perfect USB DAC audio requires an unbroken background audio feed; if the OS suspends the App's process mid-playback to save battery, this causes audible dropouts or glitches on external DACs. This is requested once, is entirely optional, and only affects battery behavior while music is actively playing. |
| Foreground service (media playback / connected device / data sync)      | Required by Android to keep audio playing and a USB/network device connection alive while the App is in the background, with a visible ongoing notification as required by the OS; also used to download the optional AI-enhancement model with visible progress.                                                    |
| Wake lock                                                               | Held only while music is actively playing, to prevent the device from sleeping mid-playback.                                                                                                                                                                                                                         |
| Delete media files (Android 9 and older)                                | To delete a track from your device when you choose to remove it, on OS versions that require this permission for that action.                                                                                                                                                                                        |
| Local network access (internet + Wi-Fi state)                           | To discover and connect to DLNA/UPnP and other cast-enabled devices, and network shares (FTP/WebDAV/SMB), on your own network, and to reach crash reporting, artwork, lyrics and headphone-profile lookups, AI-model downloads, and promotional code verification described elsewhere in this policy.                                                                             |
| USB device access                                                       | To communicate directly with a connected USB DAC for bit-perfect audio output. Granted via a runtime USB-permission prompt, not a manifest permission.                                                                                                                                                               |

We request each permission only for the feature it supports; declining a
permission disables only that feature, not the App as a whole (with the
exception of local media playback, which needs audio-file access to
function at all).

## 4. Children's privacy

The App is a general-audience music player suitable for all age groups.
However, the App is not specifically directed at children, and we do not
knowingly collect personal information from children under 13 (or the
applicable minimum age of digital consent in your jurisdiction). If you
believe a child has provided us personal data through the App, please
contact us at support@bit-perfect.com and we will promptly delete it.

## 5. Your rights and choices

Depending on where you live, you may have rights to access, correct, delete,
restrict, or port data we hold about you, and to object to or withdraw
consent for its processing. Because most App data lives only on your device
and is never sent to us, most of these rights are exercised simply by using
the in-app controls (deleting your library, revoking permissions,
uninstalling the App) or by turning off crash reporting.

For diagnostic data already sent to our crash-reporting provider, contact us
at the address above with enough detail to identify the relevant event(s)
(approximate date/time, device model, what you were doing) and we will
submit a deletion request to that provider on your behalf, or direct you to
its own data-subject-request process.

You can delete your account and its data at any time, as described in Section 2.11.

Registered installations can be reviewed from the App's subscription screen. You can
remove an old installation there. To request access to or deletion of registry data when
you cannot use a registered device, contact support@bit-perfect.com. Because the registry
uses pseudonymous identifiers rather than a name or email, we may need verification
from an authorized device or other information sufficient to verify the request
without exposing another subscriber's records.

## 6. International data transfer

Our crash-reporting provider's infrastructure for this App is hosted in the
European Union. If you are located outside the EU/EEA, using the App with
crash reporting enabled means limited diagnostic data as described in
Section 2.1 may be processed in the EU.

If you purchase the subscription or redeem a promotional offer, RevenueCat, the
subscription-management provider described in Section 2.10, is based in the United
States; the purchase or entitlement record, the installation identifier and your
pseudonymous account identifier (Section 2.11) may be processed there. The verification service, device registry, account records, settings backups and
promotional code verification described in Sections 2.10 to 2.12 are operated on Cloudflare and hosted in the
European Union. Sign-in emails are sent through Cloudflare Email Service, which processes your email address to deliver them.

## 7. Security

We use industry-standard protections for the data we handle: platform-native,
hardware-backed encryption for credentials, HTTPS/TLS for network communications,
access controls for the device registry, and secure key management. No method of
storage or transmission is 100% secure, and we cannot guarantee absolute security
of data you choose to transmit to third-party servers or devices you configure the
App to connect to (Section 2.3).

## 8. Changes to this policy

We may update this policy as the App changes. Material changes will be
reflected by an updated "Last updated" date above. Your continued use of the App
following the posting of an updated policy constitutes your acceptance of it.
Where required by applicable law or platform policies, we will provide
additional notice or seek explicit consent before material changes take effect.

## 9. Contact

Questions about this policy or your data: support@bit-perfect.com

For the terms governing your use of the App and your subscription, see the
[Terms of Use](/terms/).