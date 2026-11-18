/**
 * Single source of truth for neural chips and processor compatibility.
 *
 * Sourced directly from the app's compatibility sheet (bitperfect-player
 * `core/ui/.../component/AiCompatibilitySheet.kt`, `QUALCOMM_CHIPS` and
 * `MEDIATEK_CHIPS`).
 *
 * Execution tiers:
 * 1. Full NPU Hardware Model: dedicated on-device neural accelerator (Hexagon, MediaTek NPU).
 * 2. Lite Mode: optimized floating-point DSP kernel on 64-bit main CPU.
 * 3. Automatic Safety Fallback: instant buffer guard to prevent audio stutter.
 */

export interface ChipDeviceMap {
  readonly chip: string;
  readonly devices: string;
}

export interface NeuralChipFamily {
  readonly id: 'snapdragon' | 'dimensity';
  /** Full family display name (e.g. Qualcomm Snapdragon). */
  readonly name: string;
  /** Short identifier (e.g. Snapdragon). */
  readonly shortName: string;
  /** Underlying NPU architecture name. */
  readonly npuName: string;
  /** Newest first, keeping in lockstep with the app's compatibility sheet. */
  readonly chips: readonly string[];
  /** Popular phones powered by these chips to aid quick visitor identification. */
  readonly examples: readonly ChipDeviceMap[];
}

export const neuralChipFamilies: readonly NeuralChipFamily[] = [
  {
    id: 'snapdragon',
    name: 'Qualcomm Snapdragon',
    shortName: 'Snapdragon',
    npuName: 'Qualcomm Hexagon NPU',
    chips: [
      'Snapdragon 8 Elite Gen 5',
      'Snapdragon 8 Elite',
      'Snapdragon 8 Gen 3',
      'Snapdragon 8s Gen 3 / 8 Gen 2',
      'Snapdragon 8+ Gen 1 / 8 Gen 1',
      'Snapdragon 7+ Gen 3 / 7 Gen 3 / 7s Gen 2',
      'Snapdragon 7+ Gen 2 / 7 Gen 1',
    ],
    examples: [
      { chip: 'Snapdragon 8 Elite Gen 5', devices: 'Upcoming next-generation flagship smartphones' },
      { chip: 'Snapdragon 8 Elite', devices: 'Samsung Galaxy S25 series, OnePlus 13, Xiaomi 15, iQOO 13, Realme GT 7 Pro' },
      { chip: 'Snapdragon 8 Gen 3', devices: 'Samsung Galaxy S24 Ultra / S24+, OnePlus 12, Xiaomi 14 / 14 Pro, Sony Xperia 1 VI, ROG Phone 8' },
      { chip: 'Snapdragon 8s Gen 3 / 8 Gen 2', devices: 'Samsung Galaxy S23 Ultra / S23, OnePlus 11, Xiaomi 13, Poco F6, Motorola Edge 50 Ultra' },
      { chip: 'Snapdragon 8+ Gen 1 / 8 Gen 1', devices: 'Samsung Galaxy S22 Ultra / S22, Nothing Phone (2), OnePlus 10T, Xiaomi 12 Pro' },
      { chip: 'Snapdragon 7+ Gen 3 / 7 Gen 3 / 7s Gen 2', devices: 'OnePlus Nord 4, Realme GT 6T, Poco X6 5G, Redmi Note 13 Pro 5G' },
      { chip: 'Snapdragon 7+ Gen 2 / 7 Gen 1', devices: 'Poco F5, Xiaomi 13 Lite, Motorola Razr 40' },
    ],
  },
  {
    id: 'dimensity',
    name: 'MediaTek Dimensity',
    shortName: 'Dimensity',
    npuName: 'MediaTek APU / NPU',
    chips: [
      'Dimensity 9400 / 9400+',
      'Dimensity 9300 / 9300+ / 9350',
      'Dimensity 8400 / 8400-Ultra / 8450',
      'Dimensity 8300 / 8300-Ultra / 8350',
      'Dimensity 7300 / 7300-Energy / 7350',
    ],
    examples: [
      { chip: 'Dimensity 9400 / 9400+', devices: 'Vivo X200 Pro, Oppo Find X8 Pro, iQOO Neo 10 Pro' },
      { chip: 'Dimensity 9300 / 9300+ / 9350', devices: 'Vivo X100 Pro / X100, iQOO Neo 9 Pro, Xiaomi 14T Pro' },
      { chip: 'Dimensity 8400 / 8400-Ultra / 8450', devices: 'Poco X7 Pro, Redmi K80E' },
      { chip: 'Dimensity 8300 / 8300-Ultra / 8350', devices: 'Poco X6 Pro, Xiaomi 14T' },
      { chip: 'Dimensity 7300 / 7300-Energy / 7350', devices: 'CMF Phone 1, Nothing Phone (2a) Plus, Motorola Edge 50 Neo' },
    ],
  },
];

/** The line under the lists: what happens on every other phone. */
export const liteModeNote = 'Other phones run AI Enhancer in Lite mode on the main processor.';

/** Detailed breakdown of the three execution tiers for AI Enhancer. */
export const executionTiers = [
  {
    id: 'npu',
    tier: 'Tier 1 · Full Model',
    title: 'Hardware NPU Acceleration',
    badge: 'Hardware Neural Engine',
    description:
      'Executes the complete high-frequency harmonic restoration model directly on dedicated neural silicon (Snapdragon Hexagon or MediaTek NPU). Operates in real time with near-zero CPU load and minimal battery consumption.',
    requirements: 'Snapdragon 7/8 series or Dimensity 7300+ with unobstructed system firmware access.',
  },
  {
    id: 'cpu-lite',
    tier: 'Tier 2 · Lite Mode',
    title: 'Main Processor (CPU Fallback)',
    badge: 'Universal 64-bit CPU',
    description:
      'Optimized vector floating-point DSP kernels run harmonic restoration directly across 64-bit CPU cores when dedicated NPU silicon is unavailable (e.g. Google Tensor, Samsung Exynos, or older Snapdragon).',
    requirements: 'Modern 64-bit ARM processor. Sustains real-time playback buffers without latency.',
  },
  {
    id: 'safety',
    tier: 'Tier 3 · Signal Safety',
    title: 'Bit-Perfect Buffer Protection',
    badge: 'Zero-Stutter Guard',
    description:
      'Bitperfect Player prioritizes jitter-free playback. If system load or thermal throttling causes playback buffer headroom to drop, AI Enhancer disengages instantly to prevent audio dropouts.',
    requirements: 'Automatic safety guard. Bypasses automatically for native Hi-Res PCM (88.2–768 kHz) & DSD.',
  },
] as const;

/** Additional hardware and system requirements. */
export const systemRequirements = {
  android: {
    minVersion: 'Android 8.0 (Oreo, API 26)',
    recommendedVersion: 'Android 10+ (API 29+ for direct USB DAC host mode)',
    architecture: '64-bit ARM (ARMv8-A or newer)',
  },
  audio: {
    enhancerScope: '44.1 kHz and 48 kHz PCM (16-bit and 24-bit)',
    hiResBehavior: 'Automatically bypassed on ≥ 88.2 kHz and DSD for bit-exact passthrough',
    karaokeNotice: 'Temporarily disengages while AI Karaoke stem separation is active',
  },
  usbDac: {
    support: 'Class-compliant USB Audio Class 1 (UAC1) and Class 2 (UAC2)',
    connection: 'Direct USB-C host or USB-OTG adapter',
    mixerBypass: 'Exclusive bit-perfect hardware lock bypassing the Android audio mixer',
  },
  offlinePrivacy: {
    modelDownload: 'One-time initial download (10 to 60 MB per chip family)',
    cloudUploads: '0 bytes. All neural computation executes 100% locally on your phone',
  },
} as const;
