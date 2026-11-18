/**
 * FAQ Data Module
 * Sourced from src/content/faq/ with full backwards compatibility.
 */
import whatIsBitPerfect from '../content/faq/what-is-bit-perfect.json';
import directHardwareBypass from '../content/faq/direct-hardware-bypass.json';
import bitperfectLock from '../content/faq/bitperfect-lock.json';
import dyadicLosslessVolume from '../content/faq/dyadic-lossless-volume.json';
import nativeDsdAndDop from '../content/faq/native-dsd-and-dop.json';
import needExternalDac from '../content/faq/need-external-dac.json';
import usbDacSetupGuide from '../content/faq/usb-dac-setup-guide.json';
import usbPermissionDialog from '../content/faq/usb-permission-dialog.json';
import dapSupport from '../content/faq/dap-support.json';
import whyNpuAiEnhancerNotWorking from '../content/faq/why-npu-ai-enhancer-not-working.json';
import canIDisableAi from '../content/faq/can-i-disable-ai.json';
import aiOfflineOperation from '../content/faq/ai-offline-operation.json';
import aiFeaturesBreakdown from '../content/faq/ai-features-breakdown.json';
import supportedAudioFormats from '../content/faq/supported-audio-formats.json';
import equalizerModes from '../content/faq/equalizer-modes.json';
import harmonicTuningExplained from '../content/faq/harmonic-tuning-explained.json';
import crossfeedAcoustics from '../content/faq/crossfeed-acoustics.json';
import batteryDrainDac from '../content/faq/battery-drain-dac.json';
import fullRamPlayback from '../content/faq/full-ram-playback.json';
import backgroundKillingPrevention from '../content/faq/background-killing-prevention.json';
import costAndPlans from '../content/faq/cost-and-plans.json';
import deviceAllowance from '../content/faq/device-allowance.json';
import privacyAndNetworkTransfers from '../content/faq/privacy-and-network-transfers.json';
import doINeedAnAccount from '../content/faq/do-i-need-an-account.json';

export interface FAQItem {
  id: string;
  category: string;
  q: string;
  a: string;
  guideUrl?: string;
  highlights?: string[];
}

export const allFaqItems: FAQItem[] = [
  whatIsBitPerfect,
  directHardwareBypass,
  bitperfectLock,
  dyadicLosslessVolume,
  nativeDsdAndDop,
  needExternalDac,
  usbDacSetupGuide,
  usbPermissionDialog,
  dapSupport,
  whyNpuAiEnhancerNotWorking,
  canIDisableAi,
  aiOfflineOperation,
  aiFeaturesBreakdown,
  supportedAudioFormats,
  equalizerModes,
  harmonicTuningExplained,
  crossfeedAcoustics,
  batteryDrainDac,
  fullRamPlayback,
  backgroundKillingPrevention,
  costAndPlans,
  deviceAllowance,
  privacyAndNetworkTransfers,
  doINeedAnAccount,
];

export const faqItems = allFaqItems;

export function getFaqByCategory(category: string): FAQItem[] {
  if (category === 'all') return allFaqItems;
  return allFaqItems.filter((item) => item.category === category);
}

export function getFaqById(id: string): FAQItem | undefined {
  return allFaqItems.find((item) => item.id === id);
}
