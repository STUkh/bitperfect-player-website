**Effective date:** August 5, 2026

**Last updated:** August 31, 2026

This Privacy Policy describes what the Bitperfect Player app ("the App") collects, why it
collects it, and what control you have over your data. The terms governing your use of the
App — including the subscription, the free trial, billing, cancellation and refunds — are a
separate document: see the [Terms of Use](/terms).

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
  stored **encrypted on this device only** (using platform hardware-backed encryption,
  such as Android Keystore or Apple Keychain) and are **never transmitted to us**.
  They go only to the server you configured them for.
- The on-device AI audio enhancer processes audio **entirely on your device**.
  No audio is ever uploaded, streamed, or transmitted anywhere for
  enhancement.
- We do not run ads and do not use any third-party analytics or advertising
  SDK beyond the crash-reporting described below.
- We do not require account creation or sign-in to use the App.

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
hardware-backed encrypted storage (such as Android Keystore or Apple Keychain)
**on your device only**. It is transmitted only to the server/device you configured it
for, using the protocol you selected, and is never sent to us or to any
third party we control.

Some network protocols the App supports (e.g. FTP, WebDAV to a server you
specify) may transmit data unencrypted over your local network, depending on
how the server you're connecting to is configured. This is a property of
the protocol and the server, not something the App adds; encrypted variants
(FTPS, HTTPS-based WebDAV) are supported where the server offers them and we
recommend using them. You are responsible for the security configuration of
any server you choose to connect the App to.

### 2.4 AI audio enhancer

The AI enhancer runs entirely on-device (using local CPU, GPU, or Neural Processing
Unit (NPU) hardware inference, depending on your device). No audio data, model input, or model
output is ever uploaded, streamed, or transmitted off your device for this
feature, under any circumstance.

### 2.5 Casting and receiving (DLNA / UPnP / Chromecast)

When you cast to a device on your local network, track metadata and a
temporary local-network media URL are sent to that device so it can fetch
and play the audio. This communication stays on your local network between
your phone and the cast target; it is not routed through us or any server we
operate.

The App can also act as a DLNA/UPnP renderer and FCast receiver, letting
other devices on your local network cast audio *to* your phone. Like
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

### 2.7 Plugins (separate apps)

The App supports an optional plugin architecture where plugins are
**separate, independently-installed applications or plugins** (e.g. streaming-source plugins)
that communicate with the App over a restricted, signature-verified IPC
channel. Plugins can return track metadata, stream URLs, or cover-art URLs to
the App. They never receive your raw audio, and audio never crosses the
IPC boundary in either direction.

**Plugins are not covered by this policy.** Each plugin is its own
application with its own developer, its own permissions, and, if it
contacts any external service (e.g. a streaming provider's API), its own
data practices. Review a plugin's own privacy policy and permissions before
installing it. We are not responsible for data practices of third-party
plugins.

### 2.8 What we do NOT collect

We do not collect, and the App does not request: your name, email address,
phone number, precise or approximate location, contacts, calendar,
photos/videos outside the music-library scan scope you grant, biometric
data, or any advertising identifier. We do not run any advertising SDK. We
do not sell personal data, and we do not share personal data with third
parties for their own marketing or advertising purposes. The only outbound
data flows to third parties are the ones disclosed elsewhere in Section 2
(crash/diagnostic reporting per 2.1, and the artist/album artwork lookups
per 2.6). Both exist to run a feature you use, not to monetize your data,
and neither third party receives it for their own marketing use as far as
their published terms describe.

### 2.9 Purchases (subscription)

The App is a subscription app, and the subscription is purchased **in-app** through the
store. The commercial terms — price, free trial, renewal, cancellation and refunds — are in
the [Terms of Use](/terms). What follows is only what happens to your data when you buy.

- **Payment is processed entirely by the store (Google Play or Apple App Store).** We never receive or store
  your card number, billing address, or payment identity. The store's own
  privacy policy governs the payment transaction.
- **Entitlement management.** To know whether your subscription is
  active, the App uses a third-party subscription-management service, based
  in the United States, which processes your purchase token and
  an anonymous app-instance identifier. This is the minimum needed to answer
  "is this install entitled?" It is not linked to your name, email, or
  listening data (the App has none of these).
- **On this device.** A signed record of your entitlement is stored locally
  so the App keeps working offline; it contains no payment details.
- **No account with us.** There is nothing to sign up for and nothing to close.
  Cancelling happens in your store account and needs nothing from us.

## 3. Permissions the App requests, and why

Permissions requested by the App depend on the platform (Android or iOS/macOS) and the features you use:

| Permission | Why |
|---|---|
| Notifications (`POST_NOTIFICATIONS`) | To show the required persistent playback-controls notification while music plays in the background (standard Android media-app requirement). |
| Audio/media files (`READ_MEDIA_AUDIO` or legacy storage) | To find and play your local music files. |
| Bluetooth (`BLUETOOTH_CONNECT`) | To detect and report the actual Bluetooth audio codec (e.g. aptX-HD, LDAC) in use for connected headphones/speakers, for the fidelity display. |
| Battery optimization exemption (`REQUEST_IGNORE_BATTERY_OPTIMIZATIONS`) | Bit-perfect USB DAC audio requires an unbroken background audio feed; if the OS suspends the App's process mid-playback to save battery, this causes audible dropouts or glitches on external DACs. This is requested once, is entirely optional, and only affects battery behavior while music is actively playing. |
| Foreground service (media playback / connected device / data sync) | Required by Android to keep audio playing and a USB/network device connection alive while the App is in the background, with a visible ongoing notification as required by the OS; also used to download the optional AI-enhancement model with visible progress. |
| Wake lock | Held only while music is actively playing, to prevent the device from sleeping mid-playback. |
| Delete media files (Android 9 and older) | To delete a track from your device when you choose to remove it, on OS versions that require this permission for that action. |
| Local network access (internet + Wi-Fi state) | To discover and connect to DLNA/UPnP/Chromecast devices and network shares (FTP/WebDAV/SMB) on your own network, and to reach crash reporting, artwork lookups, and AI-model downloads described elsewhere in this policy. |
| USB device access | To communicate directly with a connected USB DAC for bit-perfect audio output. Granted via a runtime USB-permission prompt, not a manifest permission. |

We request each permission only for the feature it supports; declining a
permission disables only that feature, not the App as a whole (with the
exception of local media playback, which needs audio-file access to
function at all).

## 4. Children's privacy

The App is not directed at children under 13 (or the equivalent minimum age
in your jurisdiction) and we do not knowingly collect personal data from
children. If you believe a child has provided us data through the App (e.g.
via a crash report), contact us at the address above and we will delete it.

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

## 6. International data transfer

Our crash-reporting provider's infrastructure for this App is hosted in the
European Union. If you are located outside the EU/EEA, using the App with
crash reporting enabled means limited diagnostic data as described in
Section 2.1 may be processed in the EU.

If you purchase the subscription, the entitlement-management provider
described in Section 2.9 is based in the United States; a purchase token and
an anonymous app-instance identifier may be processed there.

## 7. Security

We use industry-standard protections for the data we do handle: hardware-backed
encryption (such as Android Keystore or Apple Keychain) for credentials, HTTPS/TLS for any network
request we control, and no plaintext storage of secrets. No method of
storage or transmission is 100% secure, and we cannot guarantee absolute
security of data you choose to transmit to third-party servers or devices
you configure the App to connect to (Section 2.3).

## 8. Changes to this policy

We may update this policy as the App changes. Material changes will be
reflected by an updated "Last updated" date above. Your continued use of the App
following the posting of an updated policy constitutes your acceptance of it.
Where required by applicable law or platform policies, we will provide
additional notice or seek explicit consent before material changes take effect.

## 9. Contact

Questions about this policy or your data: support@bit-perfect.com

For the terms governing your use of the App and your subscription, see the
[Terms of Use](/terms).
