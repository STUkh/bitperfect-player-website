# Content Management & Editor Operations Guide

Comprehensive guide for editors, marketing managers, and developers maintaining content on the Bitperfect Player website using Astro 5 Content Collections and Keystatic CMS Studio.

---

## 1. Overview & Architecture

The Bitperfect Player website employs a **decoupled Git-based CMS architecture**:

```
 ┌─────────────────────────────────────────────────────────────┐
 │                      Content Authors                        │
 └──────────────┬──────────────────────────────┬───────────────┘
                │                              │
       (Local Development)             (Remote Web CMS)
                │                              │
                ▼                              ▼
     http://localhost:4321/keystatic   https://cms.bit-perfect.com
        (Local Filesystem Mode)         (Cloudflare Pages + GitHub API)
                │                              │
                │ writes to                    │ commits to
                ▼                              ▼
      ┌──────────────────────────────────────────────┐
      │         Git Repository (src/content/)        │
      └──────────────────────┬───────────────────────┘
                             │ GitHub Action on Push
                             ▼
      ┌──────────────────────────────────────────────┐
      │           Build & Quality Pipeline           │
      │  1. npm run check (Astro & TS type audit)    │
      │  2. scripts/images.mjs (AVIF/WebP ladder)    │
      │  3. Critical CSS inlining (Beasties)         │
      │  4. scripts/seo-check.mjs (0 errors/warnings)│
      └──────────────────────┬───────────────────────┘
                             │ Deploys to
                             ▼
      ┌──────────────────────────────────────────────┐
      │          https://bit-perfect.com             │
      │  100% Static HTML/CSS · 0 KB Client Runtime JS│
      └──────────────────────────────────────────────┘
```

### Core Architecture Highlights

1. **Zero Client Runtime Leakage**: Public pages render to pure static HTML/CSS at build time. Keystatic Studio bundles are strictly isolated and never leak into production public assets (`bit-perfect.com`).
2. **Type Safety & Schema Validation**: All content is defined in structured JSON/Markdown governed by Zod schemas in `src/content.config.ts`. Any missing required field or malformed input breaks the build immediately before deployment.
3. **Automated SEO & Link Integrity**: The build pipeline executes `scripts/seo-check.mjs`, verifying canonical URLs, Open Graph tags, JSON-LD schemas, and anchor links across every generated page.
4. **Git as Single Source of Truth**: All edits result in clean, version-controlled JSON or Markdown files with a full audit log.

---

## 2. Running Keystatic Locally

To edit content on your local workstation:

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:4321/keystatic
   ```

In local mode (`KEYSTATIC_STORAGE_KIND=local`), Keystatic reads and writes directly to files in `src/content/`. Any change saved in the Studio is immediately reflected in real-time at `http://localhost:4321/`.

---

## 3. Editing Site Settings (Global Configuration)

**Keystatic Studio Path**: *Singletons* -> **Site Settings**  
**Repository File**: `src/content/settings/site.json`

The Site Settings singleton governs global product parameters, pricing plans, download links, and maintenance status.

### Configurable Fields:

| Field Label | Keystatic Field | Purpose & Behavior |
| :--- | :--- | :--- |
| **Site Name** | `name` | The official product name (`Bitperfect Player`). |
| **Tagline** | `tagline` | Primary brand tagline used across headers and footer. |
| **Google Play URL** | `playUrl` | Primary store link used by all download and CTA buttons. |
| **Direct APK URL** | `apkUrl` | Optional direct APK download URL (can be null/empty). |
| **App Store URL** | `appStoreUrl` | Optional future iOS / macOS URL. |
| **Maintenance / Holding Mode** | `holding` | Checkbox toggle (`true` / `false`). When enabled, `/` displays the minimal holding page while preserving legal routes (`/privacy`, `/terms`) and the dev preview (`/preview/home`). |
| **Contact Email** | `contactEmail` | Official support email (`support@bit-perfect.com`). |
| **Minimum Android** | `minAndroid` | Required OS version string (e.g. `Android 8.0 and up`). |
| **Minimum SDK** | `minSdk` | Minimum Android API level (`26`). |
| **Social Channels** | `socials` | Array of official social channel cards in the footer (Telegram, TikTok, Instagram, X). |
| **Navigation Links** | `nav` | Main header navigation links. |

### Pro Pricing & Subscription Configuration:

The `pro` object is now fully editable directly in Keystatic Studio:
- **`pro.trialDays`**: Number of free trial days (e.g. `14`). Set to `0` or remove to silence the trial badge and guarantee no dangling promise on the fold.
- **`pro.founderPrice`**: Founder subscription rate (e.g. `19.95`).
- **`pro.standardPrice`**: Standard annual subscription rate (e.g. `29.95`).
- **`pro.founderEndDate`**: Date string when the founder offer expires (e.g. `May 31, 2027`).
- **`pro.plans`**: Individual plan configurations (`founder` and `standard`): title, badge, price, per-month breakdown, and active dates.
- **`pro.unlocks`**: List of premium capabilities highlighted on the pricing card.
- **`pro.disclosures`**: Store policy disclosures displayed beneath the checkout button.
- **`compatibility`**: Hardware and OS requirements matrix (supported DAC classes, chipsets, sample rates).
- `pro.founderPrice`: Special launch subscription price (e.g. `19.95`).
- `pro.standardPrice`: Regular annual subscription price (e.g. `29.95`).
- `pro.founderEndDate`: Human-readable expiration date for the founder offer (e.g. `May 31, 2027`).
- `pro.founderEndDateIso`: ISO 8601 formatted date for JSON-LD structured data (`2027-05-31`).

---

## 4. Managing FAQ Items

**Keystatic Studio Path**: *Collections* -> **FAQ Items**  
**Repository Path**: `src/content/faq/*.json`

FAQs are displayed on `/faq/` and mapped to schema.org FAQPage structured data.

### FAQ Categories:
- `engine`: Symphony audio engine, bit-perfect streaming, sample rates, DSD, clocking.
- `hardware`: USB DACs, dongles, OTG cables, compatibility.
- `ai`: On-device AI Enhancer, neural processing units (NPU), offline inference.
- `dsp`: 32-band parametric EQ, crossfeed, loudness correction, limiter.
- `battery`: Power consumption, background playback, thermal management.
- `license`: Google Play billing, Founder license, family sharing, offline validation.

### Fields per FAQ Entry:
1. **FAQ ID**: Slug used as the filename (e.g. `usb-dac-exclusive-access`).
2. **Category**: Select dropdown matching one of the 6 categories above.
3. **Question** (`q`): The plain, concise question string.
4. **Answer** (`a`): Detailed answer text. Supports clean sentences adhering to `docs/writing-guide.md`.
5. **Guide URL** (`guideUrl`): Optional link to technical deep-dives (e.g. `/features/usb-dac`).
6. **Highlights** (`highlights`): Array of key phrases emphasized in the UI.
7. **Display Order** (`order`): Integer controlling sorting within its category.

---

## 5. Editing Feature Pages

**Keystatic Studio Path**: *Collections* -> **Features**  
**Repository Path**: `src/content/features/*.json`

The six core feature deep-dives (`usb-dac`, `eq`, `library`, `casting`, `dsp`, `ai-enhancer`) are detailed showcase routes built with alternating graphite/ivory bands.

### Fields per Feature:
- **Feature ID** / **Slug**: Slug identifying the route (e.g. `usb-dac` corresponds to `/features/usb-dac/`).
- **Title**: Feature headline (e.g. `Direct USB DAC driver`).
- **Tagline**: Short supporting hook.
- **Badge**: Monospace label (e.g. `Bit-perfect audio path`).
- **Accent**: Visual accent theme (default: `gold`).
- **Lede**: Lead narrative paragraph introducing the feature's technical advantage.
- **Summary**: Key technical metrics displayed in the header card (e.g. `Up to 768 kHz`, `DSD512 native`).
- **Beats**: Four to five alternating narrative sections. Each beat contains:
  - `title`: Section headline.
  - `body`: Focused paragraph.
  - `chips`: Interactive or highlighted capability tokens.
  - `stats`: Key specification numbers and units.
  - `note`: Contextual technical disclosure.
- **Specifications Table** (`specs`): Label/value pairs rendered in the technical drafting spec band.
- **Closing CTA**: Action headline and copy driving downloads.

---

## 6. Using the Page Builder (Blocks & Layouts)

Modular landing and promo pages are assembled using reusable UI blocks.

### Adding and Reordering Blocks:
In Keystatic Studio, navigate to **Pages** -> Select page (e.g. `Home` or a new page) -> **Page Blocks**.
- Click **Add item** to insert a new block.
- Use the drag handle on the left of each item to reorder blocks vertically.
- Use the toggle switch (`enabled`) to disable a block without deleting its contents.

### Available Block Types:

#### 1. Home Opening (Hero) (`homeOpening`)
The signature hero fold displaying the product statement, primary install CTA, secondary features link, and three-phone showcase lineup.
- `id`: Anchor ID (default: `home-opening`).
- `enabled`: Toggle display.

#### 2. AI Player Band (`aiPlayer`)
Highlights offline neural intelligence, real-time waveform telemetry, and privacy-first local processing.
- `id`: Anchor ID.
- `backgroundVariant`: Choice of ambient lighting backdrop (`Default / Auto`, `Daylight`, `Walnut`, `Side Light`, `Diagonal Shadow`).

#### 3. Audio Engine Band (`audioEngine`)
Technical breakdown of the Symphony Rust core, direct ALSA bypass, and zero-resampling guarantees.
- `backgroundVariant`: Choice of ambient lighting backdrop.

#### 4. Statement Band (`statement`)
High-impact brand declaration band contrasting compromised standard OS mixing with bit-perfect delivery.
- `backgroundVariant`: Choice of ambient lighting backdrop.

#### 5. Features Teaser (`featuresTeaser`)
6-card overview grid linking directly to the dedicated feature routes (`usb-dac`, `eq`, `dsp`, `ai-enhancer`, `library`, `casting`).
- Anchored with `id="features"`.

#### 6. Privacy Band (`privacy`)
Reinforces the zero-telemetry, zero-ads, and local-storage commitment.

#### 7. Pricing Section (`pricing`)
Displays the Founder annual subscription, feature checklist, 14-day trial notice, and Google Play billing disclosure. Driven directly by `src/content/settings/site.json`.

#### 8. CTA Section (`cta`)
High-contrast closing call-to-action band with store badge, minimum OS requirement, and APK download option.

#### 9. Media Split (`mediaSplit`)
Flexible 2-column content block featuring copy on one side and imagery/code on the other.
- `mediaSide`: Choose `Right` or `Left`.
- `split`: Choose `7/5` or `6/6` column ratio.
- `mediaFirst`: Enable to place visual above copy on mobile viewports.
- `content`: Rich HTML or Markdown copy.

#### 10. Spec List (`specList`)
Precision monospace technical ledger for hardware compatibility, audio formats, or latency benchmarks.
- `tone`: `Graphite` (dark) or `Ivory` (light).
- `items`: List of `{ label, value }` pairs.

#### 11. Rule List (`ruleList`)
Structured numbered principles or operational rules with title and body.
- `layout`: `Stack` or `Columns`.
- `tone`: `Graphite` or `Ivory`.

#### 12. Rich Text (`richText`)
General-purpose editorial container with full typography formatting (`prose-legal`), ideal for announcements or promotional descriptions.

---

## 7. Creating Completely New Landing / Promo Pages

The CMS automatically compiles new landing pages created in `src/content/pages/*.json` into standalone static HTML routes via `src/pages/[...slug].astro`.

### Step-by-Step:
1. Open Keystatic Studio -> **Pages** -> **Create item**.
2. **Page Title**: Enter a descriptive title (e.g. `Audiophile Summer Edition`).
   - Keystatic generates the slug automatically (e.g. `audiophile-summer-edition`).
3. **Page Description**: Enter a 70–155 character meta description for search engines and social cards.
4. **Blocks**: Add and sequence your desired blocks (e.g. `homeOpening`, `statement`, `mediaSplit`, `pricing`, `cta`).
5. Click **Save** (in local mode) or **Create commit** (in remote Cloudflare mode).

### Routing & Output:
- The page will automatically be generated at:
  ```
  https://bit-perfect.com/<slug>/
  ```
  (e.g. `https://bit-perfect.com/audiophile-summer-edition/`).
- The page is wrapped in `LandingLayout`, automatically supplying:
  - Responsive header and navigation.
  - Organization, WebSite, and SoftwareApplication JSON-LD structured schemas.
  - Canonical link tag (`https://bit-perfect.com/<slug>/`).
  - Open Graph and Twitter Card tags.
  - Critical CSS inlining and zero runtime client JavaScript.

### Reserved Slugs:
The dynamic page generator strictly protects top-level system routes. The following slugs cannot be used for custom pages:
- `home` (reserved for `/`, compiled via `src/pages/index.astro`)
- `faq` (reserved for `/faq/*`)
- `features` (reserved for `/features/*`)
- `compatibility` (reserved for `/compatibility/`)
- `terms` (reserved for `/terms/`)
- `privacy` / `policy` (reserved for legal routes)
- `delete-account` (reserved for Google Play compliance)
- `404` (reserved for error page)
- `preview` (reserved for internal design fixtures)

---

## 8. Cloudflare Pages Deployment for `cms.bit-perfect.com`

To allow distributed team members to edit content without installing Git or Node.js locally, deploy Keystatic Studio as an authenticated Cloudflare Pages project on `cms.bit-perfect.com`.

### Architecture of the CMS Domain:
- The public site (`https://bit-perfect.com`) is hosted on **GitHub Pages**, completely static, with zero CMS backend code.
- Keystatic Studio runs on **Cloudflare Pages** at `https://cms.bit-perfect.com`, where it authenticates via GitHub OAuth and writes commits directly back to the GitHub repository.

```
┌─────────────────────────┐          GitHub OAuth          ┌─────────────────────────┐
│ Editor on               │ ─────────────────────────────> │ GitHub Developer App    │
│ cms.bit-perfect.com     │ <───────────────────────────── │ Token Issued            │
└───────────┬─────────────┘                                └─────────────────────────┘
            │
            │ Commit Content Changes via GitHub API
            ▼
┌─────────────────────────────────────────────────────────────┐
│ GitHub Repo: bitperfect-player/bitperfect-player-website     │
└───────────────────────────┬─────────────────────────────────┘
                            │ Push triggers GitHub Action
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ GitHub Pages: https://bit-perfect.com (Updated Live)        │
└─────────────────────────────────────────────────────────────┘
```

---

### Step 1: Create GitHub OAuth Application

1. In GitHub, go to **Settings** -> **Developer settings** -> **OAuth Apps** -> **New OAuth App**.
2. Fill out the application details:
   - **Application name**: `Bitperfect Player CMS`
   - **Homepage URL**: `https://cms.bit-perfect.com`
   - **Authorization callback URL**: `https://cms.bit-perfect.com/api/keystatic/github/oauth/callback`
3. Click **Register application**.
4. Generate a **Client Secret** and copy both:
   - **Client ID** (e.g. `Iv1.xxxxxxxxxxxx`)
   - **Client Secret** (e.g. `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

---

### Step 2: Configure Cloudflare Pages Project

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
2. Select repository: `bitperfect-player/bitperfect-player-website`.
3. Configure Build Settings:
   - **Project Name**: `bitperfect-cms`
   - **Production Branch**: `main`
   - **Framework Preset**: `None` (or `Astro`)
   - **Build Command**: `ENABLE_KEYSTATIC=true npm run build`
   - **Build Output Directory**: `dist`
   - **Node.js Version**: `22` (set in Environment Variables as `NODE_VERSION=22`)

---

### Step 3: Set Environment Variables

In Cloudflare Pages -> **Settings** -> **Environment variables**, configure:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `ENABLE_KEYSTATIC` | `true` | Activates Keystatic integration in production build. |
| `KEYSTATIC_STORAGE_KIND` | `github` | Sets Keystatic storage driver to GitHub. |
| `KEYSTATIC_GITHUB_OWNER` | `bitperfect-player` | GitHub organization or username. |
| `KEYSTATIC_GITHUB_REPO` | `bitperfect-player-website` | GitHub repository name. |
| `KEYSTATIC_GITHUB_CLIENT_ID` | `<your-github-client-id>` | GitHub OAuth Client ID. |
| `KEYSTATIC_GITHUB_CLIENT_SECRET`| `<your-github-client-secret>`| GitHub OAuth Client Secret. |
| `KEYSTATIC_SECRET` | `<random-32-character-secret>` | Secret key used to encrypt session cookies. |
| `NODE_VERSION` | `22` | Enforces Node.js 22 runtime for build steps. |

> [!TIP]
> Generate a strong 32-character encryption secret with:
> ```bash
> openssl rand -base64 32
> ```

---

### Step 4: Configure Custom Domain

1. In Cloudflare Pages, go to **Custom domains** -> **Set up a custom domain**.
2. Enter `cms.bit-perfect.com`.
3. Cloudflare will automatically provision the DNS CNAME record and generate a TLS certificate.

---

### Step 5: Enforce Cloudflare Zero Trust (Access) Protection

To ensure the administrative interface is protected by multi-factor authentication and enterprise identity before any request reaches the application:

1. In the Cloudflare Dashboard, go to **Zero Trust** -> **Access** -> **Applications** -> **Add an application**.
2. Choose **Self-hosted**.
3. Application Configuration:
   - **Application Name**: `Bitperfect CMS Studio`
   - **Application Domain**: `cms.bit-perfect.com`
4. Access Policy Configuration:
   - **Policy Name**: `Authorized Content Editors`
   - **Action**: `Allow`
   - **Rule**: Include -> **Emails** (list team member emails) or **Email Domain** (e.g. `@bit-perfect.com`).
5. Identity Providers:
   - Enable **One-Time PIN (OTP)** or your corporate Google Workspace / GitHub identity provider.
6. Click **Save Application**.

Now, anyone visiting `https://cms.bit-perfect.com` must authenticate through Cloudflare Zero Trust before accessing the Keystatic admin panel.

---

## 9. Quality Verification & Pre-Deployment Checklist

Before merging content changes to `main` or after making local updates, run the full verification suite:

```bash
# 1. Type checking and Astro template diagnostics
npm run check

# 2. Complete static production build with image optimization and critical CSS inlining
npm run build

# 3. Comprehensive SEO, canonical, OpenGraph, JSON-LD, and internal link audit
npm run seo
```

All commands must finish with **0 errors and 0 warnings**.
